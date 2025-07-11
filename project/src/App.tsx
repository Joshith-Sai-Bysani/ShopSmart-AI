import React, { useState, useEffect } from "react";
import { ShoppingCart, Sparkles, Store, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import ProductDetailPage from "./components/ProductDetailPage";
import Cart from "./components/Cart";
import CheckoutFlow from "./components/CheckoutFlow";
import RecommendationPanel from "./components/RecommendationPanel";
import RecipeShoppingList from "./components/RecipeShoppingList";
import AISearchLoader from "./components/AISearchLoader";
import { useCart } from "./hooks/useCart";
import { products } from "./data/products";
import { Product, SearchIntent } from "./types";
import { GeminiService } from "./services/geminiService";

function App() {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [searchIntent, setSearchIntent] = useState<SearchIntent | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
  } = useCart();

  const geminiService = GeminiService.getInstance();

  useEffect(() => {
    // Show welcome screen briefly
    const timer = setTimeout(() => setShowWelcome(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Generate recommendations when cart changes
    if (cartItems.length > 0) {
      generateRecommendations();
    }
  }, [cartItems]);

  const handleSearch = async (query: string) => {
    setCurrentSearchQuery(query);
    setIsSearching(true);

    try {
      // Show loading for at least 4 seconds to display the full animation
      const searchPromise = (async () => {
        const intent = await geminiService.extractSearchIntent(query);
        setSearchIntent(intent);

        const results = searchProducts(intent);
        setSearchResults(results);

        // Generate contextual recommendations
        await generateRecommendations();
      })();

      const minLoadingTime = new Promise((resolve) =>
        setTimeout(resolve, 4000)
      );

      await Promise.all([searchPromise, minLoadingTime]);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
      setCurrentSearchQuery("");
    }
  };

  // Recipe to ingredients mapping
  const recipeIngredientsMap: Record<string, string[]> = {
    'fried rice': ['rice', 'soy-sauce', 'onions', 'egg', 'oil', 'vegetable', 'salt', 'pepper'],
    'biryani': [
      'india-gate', 'daawat', 'basmati', 'rice', // rice brands
      'chicken',
      'saffron', 'zaran',
      'spices', 'everest', 'mdh', 'masala', // spice brands
      'onions', 'yogurt', 'oil', 'salt', 'blend'
    ],
    // Add more recipes as needed
  };

  function normalize(str: string) {
    return str.toLowerCase().replace(/[-_\s]/g, '').replace(/s$/, '');
  }

  const searchProducts = (intent: SearchIntent): Product[] => {
    let filtered = products;

    // Expand ingredients for known recipes
    if (intent.type === 'recipe' && intent.keywords.length > 0) {
      const recipeName = intent.keywords.join(' ').toLowerCase();
      if (recipeIngredientsMap[recipeName]) {
        intent.ingredients = recipeIngredientsMap[recipeName];
      }
    }

    // Filter by category if specified
    if (intent.category) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === intent.category?.toLowerCase()
      );
    }

    // For recipe: skip keyword/tag filtering, only use ingredients
    if (intent.type !== 'recipe' && intent.keywords.length > 0) {
      filtered = filtered.filter((product) => {
        const searchText = `${product.name} ${
          product.description
        } ${product.tags?.join(" ")} ${product.dataAiHint}`.toLowerCase();
        return intent.keywords.some((keyword) =>
          searchText.includes(keyword.toLowerCase())
        );
      });
    }

    // Filter by ingredients for recipes
    if (intent.ingredients && intent.ingredients.length > 0) {
      filtered = filtered.filter((product) =>
        intent.ingredients!.some((ingredient) => {
          const normIngredient = normalize(ingredient);
          return (
            product.tags?.some((tag) => normalize(tag) === normIngredient) ||
            normalize(product.name).includes(normIngredient)
          );
        })
      );
    }

    // For recipe: only keep the best rice, move others to search results
    if (intent.type === 'recipe') {
      const riceProducts = filtered.filter(product =>
        product.tags?.some(tag => normalize(tag) === 'rice')
      );
      if (riceProducts.length > 1) {
        let bestRice;
        // For fried rice, always prefer Basmati Rice if available
        if (intent.keywords.join(' ').toLowerCase() === 'fried rice') {
          bestRice = riceProducts.find(r => normalize(r.name).includes('basmatirice')) || riceProducts[0];
        } else {
          bestRice = riceProducts.reduce((prev, curr) =>
            (curr.sentiment.positive > prev.sentiment.positive ? curr : prev)
          );
        }
        filtered = filtered.filter(product =>
          !riceProducts.includes(product) || product.id === bestRice.id
        );
        filtered._otherRiceOptions = riceProducts.filter(r => r.id !== bestRice.id);
      }
    }

    // Filter by skin type
    if (intent.skinType) {
      filtered = filtered.filter((product) =>
        product.tags?.includes(`${intent.skinType}-skin`)
      );
    }

    // Filter by budget
    if (intent.budget) {
      filtered = filtered.filter((product) => product.price <= intent.budget!);
    }

    // Sort by relevance (sentiment score and price)
    return filtered.sort((a, b) => {
      const aScore = a.sentiment.positive - a.sentiment.negative;
      const bScore = b.sentiment.positive - b.sentiment.negative;
      return bScore - aScore;
    });
  };

  const generateRecommendations = async () => {
    try {
      let recommended: Product[] = [];
      if (searchResults.length > 0) {
        // Recommend from current search results
        recommended = searchResults.slice(0, 4);
      } else {
        // Fallback to original logic
        recommended = products.filter((product) => {
          if (cartItems.some((item) => item.product.id === product.id))
            return false;
          const cartCategories = cartItems.map((item) => item.product.category);
          if (
            cartCategories.length > 0 &&
            cartCategories.includes(product.category)
          ) {
            return true;
          }
          const sentimentScore =
            product.sentiment.positive - product.sentiment.negative;
          return sentimentScore > 70;
        }).slice(0, 4);
      }
      setRecommendations(recommended);
    } catch (error) {
      console.error("Recommendation error:", error);
    }
  };

  const handleAddAllToCart = () => {
    if (searchIntent?.type === "recipe" && searchResults.length > 0) {
      searchResults.forEach((product) => addToCart(product, 1));
    }
  };

  const handleOrderComplete = () => {
    clearCart();
    setSearchResults([]);
    setSearchIntent(null);
    setRecommendations([]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
  };

  const handleBuyNow = (product: Product, quantity: number = 1) => {
    // Add product to cart
    addToCart(product, quantity);
    // Close product detail page
    setSelectedProduct(null);
    // Open checkout directly
    openCheckout();
  };

  // Helper: filter products matching the search intent
  const isRelevantProduct = (product: Product) => {
    if (!searchIntent) return false;
    // Category match if specified
    if (searchIntent.category && product.category.toLowerCase() !== searchIntent.category.toLowerCase()) {
      return false;
    }
    // Keyword match if specified
    if (searchIntent.keywords.length > 0) {
      const searchText = `${product.name} ${product.description} ${product.tags?.join(" ")} ${product.dataAiHint}`.toLowerCase();
      return searchIntent.keywords.some((keyword) => searchText.includes(keyword.toLowerCase()));
    }
    return true;
  };

  let topProduct: Product | null = null;
  let remainingProducts: Product[] = [];

  if (searchResults.length > 0) {
    const relevantProducts = searchResults.filter(isRelevantProduct);
    if (relevantProducts.length > 0) {
      topProduct = relevantProducts.reduce((prev, curr) =>
        (curr.sentiment.positive > prev.sentiment.positive ? curr : prev)
      );
      remainingProducts = relevantProducts.filter(p => p.id !== topProduct!.id);
    }
  }

  // Fallback: if no remainingProducts, fill with up to 4 other products from the same category
  if (topProduct && remainingProducts.length === 0) {
    remainingProducts = products.filter(p =>
      p.category === topProduct.category && p.id !== topProduct.id && !searchResults.some(s => s.id === p.id)
    ).slice(0, 4);
  }

  // For recipe shopping list, extract other rice options if present
  let recipeOtherRiceOptions: Product[] = [];
  let recipeShoppingList: Product[] = searchResults;
  if (searchIntent?.type === 'recipe' && (searchResults as any)._otherRiceOptions) {
    recipeOtherRiceOptions = (searchResults as any)._otherRiceOptions;
    recipeShoppingList = searchResults.filter(
      p => !recipeOtherRiceOptions.some(r => r.id === p.id)
    );
  }

  // Show AI Search Loading
  if (isSearching) {
    return <AISearchLoader query={currentSearchQuery} />;
  }

  if (showWelcome) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="text-center text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">ShopSmart AI</h1>
          <p className="text-xl opacity-90">
            Your Intelligent Shopping Assistant
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // Show Product Detail Page
  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onClose={handleCloseProductDetail}
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
      />
    );
  }

  let biryaniRecommendedRice: Product | null = null;
  let biryaniOtherRiceBrands: Product[] = [];
  if (searchIntent?.type === 'recipe' && searchIntent.keywords.join(' ').toLowerCase() === 'biryani') {
    const riceBrands = recipeShoppingList.filter(p =>
      p.tags?.some(tag => ['india-gate', 'daawat', 'basmati', 'rice'].includes(tag))
    );
    if (riceBrands.length > 0) {
      biryaniRecommendedRice = riceBrands.reduce((prev, curr) =>
        (curr.sentiment.positive > prev.sentiment.positive ? curr : prev)
      );
      biryaniOtherRiceBrands = riceBrands.filter(r => r.id !== biryaniRecommendedRice!.id);
    }
  }

  // Helper: get recommended products for homepage based on cart
  function getHomepageRecommendations(cartItems: Product[], allProducts: Product[]): Product[] {
    if (cartItems.length === 0) return [];
    // Get unique categories from cart
    const cartCategories = Array.from(new Set(cartItems.map(item => item.category)));
    // For each category, recommend up to 4 other products from that category not in cart
    let recommendations: Product[] = [];
    cartCategories.forEach(category => {
      const others = allProducts.filter(p =>
        p.category === category && !cartItems.some(ci => ci.id === p.id)
      ).slice(0, 4);
      recommendations = recommendations.concat(others);
    });
    return recommendations;
  }

  const cartProductList = cartItems.map(item => item.product);
  const homepageRecommendations = getHomepageRecommendations(cartProductList, products);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-sm border-b sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Store className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  ShopSmart AI
                </h1>
                <p className="text-xs text-gray-500">
                  Intelligent Shopping Assistant
                </p>
              </div>
            </motion.div>

            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What can I help you find today?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ask me anything - from recipes to skincare, I'll find exactly what
            you need
          </p>

          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </motion.div>

        {/* Recipe Shopping List */}
        <AnimatePresence>
          {searchIntent?.type === "recipe" && recipeShoppingList.length > 0 && (
            <div>
              {/* Biryani special UI */}
              {searchIntent.keywords.join(' ').toLowerCase() === 'biryani' && biryaniRecommendedRice && (
                <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 mb-4 flex items-center gap-4 rounded-lg">
                  <Star className="text-yellow-500 w-6 h-6" />
                  <img src={biryaniRecommendedRice.image} alt={biryaniRecommendedRice.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold text-yellow-900">Most Recommended: {biryaniRecommendedRice.name}</h4>
                    <p className="text-yellow-800">{biryaniRecommendedRice.description}</p>
                  </div>
                  <button className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors" onClick={() => addToCart(biryaniRecommendedRice!)}>
                    Add to Cart
                  </button>
                </div>
              )}
              {/* Other rice brands */}
              {searchIntent.keywords.join(' ').toLowerCase() === 'biryani' && biryaniOtherRiceBrands.length > 0 && (
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {biryaniOtherRiceBrands.map(product => (
                    <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-4">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                      <Star className="text-yellow-400 w-5 h-5" title="Recommended" />
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* The rest of the ingredients */}
              <RecipeShoppingList
                recipeName={searchIntent.keywords.join(" ")}
                ingredients={recipeShoppingList.filter(p =>
                  searchIntent.keywords.join(' ').toLowerCase() !== 'biryani' ||
                  !(p.tags?.some(tag => ['india-gate', 'daawat', 'basmati', 'rice'].includes(tag)))
                )}
                onAddToCart={addToCart}
                onAddAllToCart={handleAddAllToCart}
              />
            </div>
          )}
        </AnimatePresence>


        {/* Search Results */}
        <AnimatePresence>
          {(topProduct || (searchIntent?.type === 'recipe' && recipeOtherRiceOptions.length > 0)) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Search Results
                  </h3>
                  <p className="text-gray-600">
                    Found {topProduct ? 1 : 0 + recipeOtherRiceOptions.length} product{(topProduct ? 1 : 0 + recipeOtherRiceOptions.length) !== 1 ? 's' : ''}
                  </p>
                </div>
                {searchIntent && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">
                      {searchIntent.type} Search
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topProduct && (
                  <ProductCard
                    key={topProduct.id}
                    product={topProduct}
                    onAddToCart={addToCart}
                    onProductClick={handleProductClick}
                  />
                )}
                {searchIntent?.type === 'recipe' && recipeOtherRiceOptions.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* Recommendations */}
        <RecommendationPanel
          recommendations={remainingProducts}
          onAddToCart={addToCart}
          onProductClick={handleProductClick}
        />

        {/* Featured Products (when no search) */}
        {searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {homepageRecommendations.length > 0 ? 'Recommended for You' : 'Featured Products'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(homepageRecommendations.length > 0 ? homepageRecommendations : products.slice(0, 8)).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <Cart
            items={cartItems}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => {
              setIsCartOpen(false);
              openCheckout();
            }}
            totalPrice={getTotalPrice()}
          />
        )}
      </AnimatePresence>

      {/* Checkout Flow */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutFlow
            isOpen={isCheckoutOpen}
            onClose={closeCheckout}
            items={cartItems}
            totalPrice={getTotalPrice()}
            onOrderComplete={handleOrderComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
