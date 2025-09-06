const dummyImages = [
  'https://placehold.co/400x400?text=Image+1',
  'https://placehold.co/400x400?text=Image+2',
  'https://placehold.co/400x400?text=Image+3',
  'https://placehold.co/400x400?text=Image+4',
  'https://placehold.co/400x400?text=Image+5'
];
// Carousel for product images
function ProductImageCarousel({ images, name }: { images: string[]; name: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const prevImg = () => setActiveIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
  const nextImg = () => setActiveIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));

  // Auto-slide every 2.5 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));
    }, 2500);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="relative w-full h-full group">
      <ImageWithFallback
        src={images[activeIdx]}
        alt={name}
        className="w-full h-full object-cover transition duration-300"
      />
      {/* Arrows visible on hover */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border-2 border-red-700 text-red-700 rounded-full p-2 shadow-lg flex z-20"
        style={{ fontSize: '2rem' }}
        onClick={prevImg}
        tabIndex={-1}
      >
        <ChevronDown style={{ transform: 'rotate(90deg)', width: '32px', height: '32px' }} />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border-2 border-red-700 text-red-700 rounded-full p-2 shadow-lg flex z-20"
        style={{ fontSize: '2rem' }}
        onClick={nextImg}
        tabIndex={-1}
      >
        <ChevronDown style={{ transform: 'rotate(-90deg)', width: '32px', height: '32px' }} />
      </button>
      {/* Dots for images */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 rounded-full ${activeIdx === idx ? 'bg-red-700' : 'bg-gray-300'}`}
            onClick={() => setActiveIdx(idx)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </div>
  );
}
// Carousel for product images

import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  Home, Grid, ShoppingCart, Package, User, LogOut, Search, Filter,
  Heart, Star, Plus, Minus, MapPin, Truck, CheckCircle, Clock,
  CreditCard, Shield, Award, ChevronDown, Eye, X, Wallet, UserPlus,
  Edit, Camera, Mail, Phone
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PaymentModal } from './PaymentModal';
import BuyerSignup from './BuyerSignup';

// Carousel for product images

type Language = 'en' | 'hi' | 'mr';

interface BuyerDashboardProps {
  onLogout: () => void;
  language: Language;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ onLogout, language }) => {
  // Modal states
  const [showCartPaymentModal, setShowCartPaymentModal] = useState(false);
  const [showBuyNowModal, setShowBuyNowModal] = useState(false);
  const [showBuyerSignup, setShowBuyerSignup] = useState(false);

  // Buy Now modal state
  const [buyNowProduct, setBuyNowProduct] = useState<any>(null);
  const [address, setAddress] = useState('123 Main St, City');

  // ... other useState and handler declarations ...

  // Multi-step Buy Now Modal (now uses PaymentModal only)
  const renderBuyNowModal = () => {
    if (!showBuyNowModal || !buyNowProduct) return null;
    return (
      <PaymentModal
        show={showBuyNowModal}
        onClose={() => setShowBuyNowModal(false)}
        amount={buyNowProduct.price}
        productName={buyNowProduct.name}
        address={address}
        onSuccess={() => {
          setShowBuyNowModal(false);
        }}
      />
    );
  };

  // State for product view modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [viewProduct, setViewProduct] = useState<any>(null);

  // State for filter dropdown
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [filterMinRating, setFilterMinRating] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleViewProduct = (product: any) => {
    setViewProduct(product);
    setShowProductModal(true);
  };
  // Star rating for review
  const [reviewRating, setReviewRating] = useState(0);
  // Modal states and handlers (must be before any render function)
  const [showTrackOrderModal, setShowTrackOrderModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [reviewText, setReviewText] = useState("");

  const handleTrackOrder = (order: any) => {
    setSelectedOrder(order);
    setShowTrackOrderModal(true);
  };

  const handleLeaveReview = (order: any) => {
  setReviewRating(0);
    setSelectedOrder(order);
    setShowReviewModal(true);
    setReviewText("");
  };

  const handleSubmitReview = () => {
  // Here you would send reviewText and reviewRating to backend
  setShowReviewModal(false);
  alert(`Thank you for your review!\nRating: ${reviewRating} stars\nReview: ${reviewText}`);
  };
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [profileData, setProfileData] = useState({
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    contact: '+91 98765 43210',
    address: '456 Buyer Street, Mumbai, Maharashtra',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinDate: 'Member since January 2023',
    totalOrders: 12,
    totalSpent: '₹24,500',
    status: 'active',
    // Bank details
    bankName: 'State Bank of India',
    accountNumber: 'XXXXXX987654',
    ifsc: 'SBIN0000123',
    accountHolderName: 'Rahul Verma',
    accountType: 'savings'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  // Sync filter modal state with main filter state when applied
  const applyFilters = () => {
    setLocation(filterLocation);
    setPriceRange([
      filterMinPrice !== '' ? Number(filterMinPrice) : 0,
      filterMaxPrice !== '' ? Number(filterMaxPrice) : 50000
    ]);
    setMinRating(filterMinRating !== '' ? Number(filterMinRating) : 0);
    setStatus(filterStatus);
    setShowFilterModal(false);
  };

  // Minimum rating filter state
  const [minRating, setMinRating] = useState(0);
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const text = {
    en: {
      home: "Home",
  // categories: "Categories", // Remove string property, keep only object below
      cart: "Cart",
      myOrders: "My Orders",
      profile: "Profile",
      logout: "Logout",
      search: "Search products...",
      filter: "Filter",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      viewDetails: "View Details",
      price: "Price",
      artist: "Artist",
      location: "Location",
      rating: "Rating",
      reviews: "Reviews",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      deliveredBy: "Delivered by",
      volunteer: "Local Volunteer",
      courier: "Courier Service",
      orderPlaced: "Order Placed",
      orderPicked: "Order Picked",
      orderDelivered: "Order Delivered",
      trackOrder: "Track Order",
      leaveReview: "Leave Review",
      platformFee: "Platform Fee",
      deliveryFee: "Delivery Fee",
      total: "Total",
      proceedToPayment: "Proceed to Payment",
      featuredProducts: "Featured Products",
      categories: {
        all: "All Categories",
        textiles: "Textiles",
        jewelry: "Jewelry",
        pottery: "Pottery",
        crafts: "Handicrafts",
        paintings: "Paintings"
      }
    },
    hi: {
      home: "होम",
  // categories: "श्रेणियां", // Remove string property, keep only object below
      cart: "कार्ट",
      myOrders: "मेरे ऑर्डर",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट",
      search: "उत्पाद खोजें...",
      filter: "फ़िल्टर",
      addToCart: "कार्ट में डालें",
      buyNow: "अभी खरीदें",
      viewDetails: "विवरण देखें",
      price: "कीमत",
      artist: "कलाकार",
      location: "स्थान",
      rating: "रेटिंग",
      reviews: "समीक्षाएं",
      inStock: "स्टॉक में",
      outOfStock: "स्टॉक में नहीं",
      deliveredBy: "द्वारा डिलीवर",
      volunteer: "स्थानीय स्वयंसेवक",
      courier: "कूरियर सेवा",
      orderPlaced: "ऑर्डर दिया गया",
      orderPicked: "ऑर्डर उठाया गया",
      orderDelivered: "ऑर्डर डिलीवर",
      trackOrder: "ऑर्डर ट्रैक करें",
      leaveReview: "समीक्षा छोड़ें",
      platformFee: "प्लेटफॉर्म फीस",
      deliveryFee: "डिलीवरी फीस",
      total: "कुल",
      proceedToPayment: "भुगतान के लिए आगे बढ़ें",
      featuredProducts: "विशेष उत्पाद",
      categories: {
        all: "सभी श्रेणियां",
        textiles: "वस्त्र",
        jewelry: "आभूषण",
        pottery: "मिट्टी के बर्तन",
        crafts: "हस्तशिल्प",
        paintings: "चित्रकारी"
      }
    },
    mr: {
      home: "होम",
  // categories: "श्रेणी", // Remove string property, keep only object below
      cart: "कार्ट",
      myOrders: "माझे ऑर्डर",
      profile: "प्रोफाइल",
      logout: "लॉगआउट",
      search: "उत्पादने शोधा...",
      filter: "फिल्टर",
      addToCart: "कार्टमध्ये घाला",
      buyNow: "आता खरेदी करा",
      viewDetails: "तपशील पहा",
      price: "किंमत",
      artist: "कलाकार",
      location: "स्थान",
      rating: "रेटिंग",
      reviews: "पुनरावलोकने",
      inStock: "स्टॉकमध्ये",
      outOfStock: "स्टॉकमध्ये नाही",
      deliveredBy: "द्वारे डिलिव्हर",
      volunteer: "स्थानिक स्वयंसेवक",
      courier: "कुरिअर सेवा",
      orderPlaced: "ऑर्डर दिला",
      orderPicked: "ऑर्डर उचलला",
      orderDelivered: "ऑर्डर डिलिव्हर",
      trackOrder: "ऑर्डर ट्रॅक करा",
      leaveReview: "पुनरावलोकन सोडा",
      platformFee: "प्लॅटफॉर्म फी",
      deliveryFee: "डिलिव्हरी फी",
      total: "एकूण",
      proceedToPayment: "पेमेंटसाठी पुढे जा",
      featuredProducts: "वैशिष्ट्यीकृत उत्पादने",
      categories: {
        all: "सर्व श्रेणी",
        textiles: "वस्त्र",
        jewelry: "दागिने",
        pottery: "मातीची भांडी",
        crafts: "हस्तकला",
        paintings: "चित्रकला"
      }
    }
  };

  const currentText = text[language];

  const menuItems = [
    { id: 'home', label: currentText.home, icon: Home },
    { id: 'cart', label: currentText.cart, icon: ShoppingCart, count: cartItems.length },
    { id: 'orders', label: currentText.myOrders, icon: Package },
    { id: 'profile', label: currentText.profile, icon: User }
  ];

  const mockProducts = [
    {
      id: 1,
      name: 'Handwoven Silk Saree',
      artist: 'Priya Sharma',
      price: 8500,
      originalPrice: 10000,
      rating: 4.8,
      reviews: 23,
      location: 'Rajasthan',
      category: 'textiles',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
  images: dummyImages,
      deliveryType: 'courier'
    },
    {
      id: 2,
      name: 'Tribal Silver Jewelry',
      artist: 'Ravi Patel',
      price: 3200,
      originalPrice: 4000,
      rating: 4.9,
      reviews: 19,
      location: 'Gujarat',
      category: 'jewelry',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
  images: dummyImages,
      deliveryType: 'volunteer'
    },
    {
      id: 3,
      name: 'Bamboo Craft Set',
      artist: 'Maya Devi',
      price: 1800,
      originalPrice: 2200,
      rating: 4.6,
      reviews: 15,
      location: 'Assam',
      category: 'crafts',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
  images: dummyImages,
      deliveryType: 'courier'
    },
    {
      id: 4,
      name: 'Traditional Pottery',
      artist: 'Suresh Kumar',
      price: 2500,
      originalPrice: 3000,
      rating: 4.7,
      reviews: 31,
      location: 'Karnataka',
      category: 'pottery',
      inStock: false,
      image: 'https://images.unsplash.com/photo-1578928948388-fa7b9c6bee5b?w=400&h=400&fit=crop',
  images: dummyImages,
      deliveryType: 'volunteer'
    },
    {
      id: 5,
      name: 'Madhubani Painting',
      artist: 'Sunita Jha',
      price: 4500,
      originalPrice: 5500,
      rating: 4.9,
      reviews: 12,
      location: 'Bihar',
      category: 'paintings',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
  images: dummyImages,
      deliveryType: 'courier'
    },
    {
      id: 6,
      name: 'Leather Handbag',
      artist: 'Rajesh Gupta',
      price: 3800,
      originalPrice: 4500,
      rating: 4.5,
      reviews: 28,
      location: 'Uttar Pradesh',
      category: 'crafts',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
  images: dummyImages,
      deliveryType: 'volunteer'
    }
  ];

  const mockOrders = [
    {
      id: 1,
      product: 'Handwoven Silk Saree',
      artist: 'Priya Sharma',
      amount: 8500,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryType: 'courier',
      trackingId: 'TRK123456',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      product: 'Tribal Silver Jewelry',
      artist: 'Ravi Patel',
      amount: 3200,
      status: 'picked',
      orderDate: '2024-01-20',
      deliveryType: 'volunteer',
      volunteerName: 'Amit Sharma',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      product: 'Bamboo Craft Set',
      artist: 'Maya Devi',
      amount: 1800,
      status: 'placed',
      orderDate: '2024-01-22',
      deliveryType: 'courier',
      trackingId: 'TRK789012',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
    }
  ];

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`${product.name} quantity updated in cart!`, { position: 'top-right' });
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`${product.name} added to cart!`, { position: 'top-right' });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: number, change: number) => {
    setCartItems(prev => {
      let removed = false;
      const updated = prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity > 0) {
            return { ...item, quantity: newQuantity };
          } else {
            removed = true;
            return null;
          }
        }
        return item;
      }).filter(Boolean);
      if (removed) {
        const removedItem = prev.find(item => item.id === id);
        if (removedItem) {
          toast.success(`${removedItem.name} removed from cart!`, { position: 'top-right' });
        }
      }
      return updated;
    });
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || product.location.toLowerCase().includes(location.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= minRating;
    const matchesStatus = !status || (status === 'inStock' ? product.inStock : !product.inStock);
    return matchesCategory && matchesSearch && matchesLocation && matchesPrice && matchesRating && matchesStatus;
  });

  const renderProductCard = (product: any) => (
    <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square w-full flex items-center justify-center group">
        {/* Always use carousel, even for single image */}
        <ProductImageCarousel
          images={Array.isArray(product.images) ? product.images : [product.image]}
          name={product.name}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              {currentText.outOfStock}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">by {product.artist}</p>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-700">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} {currentText.reviews})</span>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{product.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl text-gray-800">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Truck className="w-4 h-4" />
            {product.deliveryType === 'volunteer' ? currentText.volunteer : currentText.courier}
          </div>
        </div>
        
        {product.inStock ? (
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-xl transition-colors text-sm"
            >
              {currentText.addToCart}
            </button>
            <button
              className="flex-1 bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-xl transition-colors text-sm"
              onClick={() => {
                setBuyNowProduct(product);
                setShowBuyNowModal(true);

              }}
            >
              {currentText.buyNow}
            </button>
            <button
              onClick={() => handleViewProduct(product)}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-1"
            >
              <Eye className="w-4 h-4" /> View
            </button>
          </div>
        ) : (
          <button disabled className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-xl text-sm cursor-not-allowed">
            {currentText.outOfStock}
          </button>
        )}
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="space-y-8">
      {/* Product View Modal */}
      {showProductModal && viewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-red-900">{viewProduct.name}</h2>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-100 rounded-xl h-72 flex items-center justify-center">
                <ImageWithFallback
                  src={viewProduct.image}
                  alt={viewProduct.name}
                  className="max-h-full max-w-full object-cover rounded-xl"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">{viewProduct.name}</h3>
                <p className="text-2xl font-bold text-red-900 mt-1">₹{viewProduct.price}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${viewProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{viewProduct.inStock ? currentText.inStock : currentText.outOfStock}</span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{currentText.categories[viewProduct.category]}</span>
                </div>
                <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{viewProduct.rating}</span>
                  </div>
                  <span>({viewProduct.reviews} {currentText.reviews})</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{viewProduct.location}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Delivery Estimate:</span>
                  <span className="ml-2 text-gray-600">{viewProduct.deliveryEstimate || '2-5 days'}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Description:</span>
                  <span className="ml-2 text-gray-600">{viewProduct.description || 'No description available.'}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Category:</span>
                  <span className="ml-2 text-gray-600">{currentText.categories[viewProduct.category]}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Stock:</span>
                  <span className="ml-2 text-gray-600">{viewProduct.inStock ? 'Available' : 'Out of Stock'}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Artist:</span>
                  <span className="ml-2 text-gray-600">{viewProduct.artist}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Product ID:</span>
                  <span className="ml-2 text-gray-600">{viewProduct.id}</span>
                </div>
                <div className="mb-4">
                  <span className="font-medium text-gray-700">Buyer Reviews:</span>
                  <span className="ml-2 text-gray-600">{viewProduct.reviews} reviews, avg. {viewProduct.rating} stars</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addToCart(viewProduct)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-xl transition-colors text-sm"
                  >
                    {currentText.addToCart}
                  </button>
                  <button
                    className="flex-1 bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-xl transition-colors text-sm"
                    onClick={() => {
                      setBuyNowProduct(viewProduct);
                      setShowBuyNowModal(true);

                    }}
                  >
                    {currentText.buyNow}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-3xl p-8 text-white">
        <h1 className="text-4xl mb-4">Discover Authentic Indian Crafts</h1>
        <p className="text-xl text-red-100 mb-6">Handpicked treasures from talented artisans across India</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <Shield className="w-5 h-5" />
            <span>Authentic Products</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <Award className="w-5 h-5" />
            <span>Fair Trade</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <Truck className="w-5 h-5" />
            <span>Local Delivery</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 relative">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={currentText.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3 relative">
          <button
            className={`flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 ${showFilterModal ? 'bg-red-800 text-white' : 'bg-red-900 text-white'}`}
            onClick={() => setShowFilterModal(!showFilterModal)}
          >
            <Filter className="w-4 h-4" />
            {showFilterModal ? 'Hide Filters' : currentText.filter}
          </button>

          {showFilterModal && (
            <div className="absolute right-0 mt-12 w-72 bg-white rounded-lg shadow-lg z-10 p-4 border border-gray-200">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    {Object.entries(currentText.categories).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={filterLocation}
                    onChange={e => setFilterLocation(e.target.value)}
                    placeholder="City, State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (₹)</label>
                    <input
                      type="number"
                      value={filterMinPrice}
                      onChange={e => setFilterMinPrice(e.target.value)}
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (₹)</label>
                    <input
                      type="number"
                      value={filterMaxPrice}
                      onChange={e => setFilterMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                  <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => setFilterMinRating(String(star))}
                      >
                        <Star className={`w-6 h-6 ${Number(filterMinRating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{filterMinRating ? `${filterMinRating} / 5` : ''}</span>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <button
                    onClick={() => {
                      setFilterLocation('');
                      setFilterMinPrice('');
                      setFilterMaxPrice('');
                      setFilterMinRating('');
                      setSelectedCategory('all');
                      setShowFilterModal(false);
                    }}
                    className="px-3 py-1.5 text-sm text-red-700 hover:text-red-800"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      applyFilters();
                      setShowFilterModal(false);
                    }}
                    className="px-3 py-1.5 bg-red-900 text-white text-sm rounded-md hover:bg-red-800"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-2xl text-red-900 mb-6">{currentText.featuredProducts}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(renderProductCard)}
        </div>
      </div>
    </div>
  );

  const renderCart = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const platformFee = Math.round(subtotal * 0.05);
    const deliveryFee = 150;
    const total = subtotal + platformFee + deliveryFee;

    return (
      <div className="space-y-6">
        <h1 className="text-3xl text-red-900">{currentText.cart}</h1>
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-4">Add some beautiful crafts to your cart</p>
            <button
              onClick={() => setActiveSection('home')}
              className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600">by {item.artist}</p>
                      <p className="text-lg text-gray-800 mt-1">₹{item.price.toLocaleString()}</p>
                      <button
                        onClick={() => {
                          // Find the full product data by id
                          const fullProduct = mockProducts.find(p => p.id === item.id);
                          handleViewProduct({ ...fullProduct, ...item });
                        }}
                        className="mt-2 bg-white border border-gray-300 text-gray-700 py-1 px-3 rounded-xl transition-colors text-sm flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-8 h-8 bg-red-900 hover:bg-red-800 text-white rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg h-fit sticky top-6">
              <h2 className="text-xl text-red-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{currentText.platformFee}</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{currentText.deliveryFee}</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span>{currentText.total}</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  setShowProductModal(false);
                  setTimeout(() => {
                    setShowCartPaymentModal(true);
                  }, 200);
                }}
              >
                <CreditCard className="w-5 h-5" />
                {currentText.proceedToPayment}
              </button>
            </div>
          </div>
        )}
        {/* Cart Payment Modal always rendered at the end of cart section */}
        <PaymentModal
          show={showCartPaymentModal}
          onClose={() => setShowCartPaymentModal(false)}
          amount={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          address={address}
          productName={cartItems.length === 1 ? cartItems[0].name : undefined}
          onSuccess={() => {
            setShowCartPaymentModal(false);
            setCartItems([]);
          }}
        />
      </div>
    );
  };

  // Profile handling functions
  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditProfile = () => {
    setEditedProfile({ ...profileData });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    // In a real app, you would save to an API here
    setProfileData(prev => ({
      ...prev,
      ...editedProfile
    }));
    setIsEditingProfile(false);
    // Show success message
    toast.success('Profile updated successfully');
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-green-700">Buyer Profile</h1>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            profileData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1)}
          </span>
          {!isEditingProfile && (
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 relative group">
            <img 
              src={isEditingProfile ? (editedProfile.photo || profileData.photo) : profileData.photo} 
              alt={profileData.name}
              className="w-full h-full object-cover"
            />
            {isEditingProfile && (
              <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditedProfile(prev => ({
                          ...prev,
                          photo: reader.result as string
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            )}
          </div>
          <div className="flex-1 space-y-3">
            {isEditingProfile ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name || profileData.name}
                    onChange={handleProfileInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email || profileData.email}
                    onChange={handleProfileInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    value={editedProfile.contact || profileData.contact}
                    onChange={handleProfileInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{profileData.contact}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Package className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>{profileData.totalOrders} orders</span>
                </div>
              </>
            )}
          </div>
        </div>

        {isEditingProfile && (
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="font-medium text-green-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Address
            </h3>
            {isEditingProfile ? (
              <textarea
                name="address"
                value={editedProfile.address || profileData.address}
                onChange={handleProfileInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-700">{profileData.address}</p>
            )}
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="font-medium text-green-800 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Member Since
            </h3>
            <p className="text-gray-700">{profileData.joinDate}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-lg font-semibold">{profileData.totalSpent}</p>
            </div>
          </div>
        </div>

        {/* Bank Details Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Bank Details
          </h3>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {isEditingProfile ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      name="bankName"
                      value={editedProfile.bankName || profileData.bankName}
                      onChange={handleProfileInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={editedProfile.accountNumber || profileData.accountNumber}
                      onChange={handleProfileInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      name="ifsc"
                      value={editedProfile.ifsc || profileData.ifsc}
                      onChange={handleProfileInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                    <select
                      name="accountType"
                      value={editedProfile.accountType || profileData.accountType}
                      onChange={handleProfileInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                      <option value="salary">Salary</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder's Name</label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={editedProfile.accountHolderName || profileData.accountHolderName}
                    onChange={handleProfileInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-medium">{profileData.bankName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-mono">•••• •••• {profileData.accountNumber.slice(-4)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">IFSC Code</p>
                  <p className="font-mono">{profileData.ifsc}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="capitalize">{profileData.accountType}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Account Holder</p>
                  <p>{profileData.accountHolderName}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{currentText.myOrders}</h1>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex gap-4 mb-4">
              <ImageWithFallback
                src={order.image}
                alt={order.product}
                className="w-16 h-16 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-lg text-gray-800">{order.product}</h3>
                <p className="text-sm text-gray-600">by {order.artist}</p>
                <p className="text-sm text-gray-500">Order Date: {order.orderDate}</p>
                <p className="text-lg text-gray-800 mt-1">₹{order.amount.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'picked' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {currentText[order.status as keyof typeof currentText] || order.status}
                </span>
              </div>
            </div>

            {/* Order Progress */}
            <div className="flex items-center justify-between mb-4 px-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'placed' || order.status === 'picked' || order.status === 'delivered'
                    ? 'bg-green-500 text-white' : 'bg-gray-300'
                }`}>
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-600 mt-1">{currentText.orderPlaced}</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                order.status === 'picked' || order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'picked' || order.status === 'delivered'
                    ? 'bg-green-500 text-white' : 'bg-gray-300'
                }`}>
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-600 mt-1">{currentText.orderPicked}</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  order.status === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-300'
                }`}>
                  <Truck className="w-4 h-4" />
                </div>
                <span className="text-xs text-gray-600 mt-1">{currentText.orderDelivered}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-red-100 hover:bg-red-200 text-red-900 py-2 px-4 rounded-xl transition-colors"
                onClick={() => handleTrackOrder(order)}>
                {currentText.trackOrder}
              </button>
              {order.status === 'delivered' && (
                <button className="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 py-2 px-4 rounded-xl transition-colors"
                  onClick={() => handleLeaveReview(order)}>
                  {currentText.leaveReview}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Track Order Modal */}
      {showTrackOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl aspect-square flex flex-col justify-center">
            <h2 className="text-2xl text-red-900 mb-4">Track Order</h2>
            <div className="mb-6 flex gap-6 items-center">
              <ImageWithFallback
                src={selectedOrder.image}
                alt={selectedOrder.product}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div>
                <p className="font-semibold text-xl text-gray-800">{selectedOrder.product}</p>
                <p className="text-sm text-gray-600">by {selectedOrder.artist}</p>
                    {/* Cart Payment Modal */}
                    <PaymentModal
                      show={showCartPaymentModal}
                      onClose={() => setShowCartPaymentModal(false)}
                      amount={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                      address={address}
                      productName={cartItems.length === 1 ? cartItems[0].name : undefined}
                      onSuccess={() => {
                        setShowCartPaymentModal(false);
                        setCartItems([]);
                      }}
                    />
                <p className="text-sm text-gray-500">Order Amount: ₹{selectedOrder.amount?.toLocaleString?.() ?? selectedOrder.amount}</p>
              </div>
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-gray-500 mb-1">Ordered Date</span>
                <span className="block text-base text-gray-800">{selectedOrder.orderDate}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Delivery Date</span>
                <span className="block text-base text-gray-800">{selectedOrder.deliveryDate ? selectedOrder.deliveryDate : 'Not yet scheduled'}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Payment Method</span>
                <span className="block text-base text-gray-800">{selectedOrder.paymentMethod || 'N/A'}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Payment Status</span>
                <span className="block text-base text-gray-800">{selectedOrder.paymentStatus || 'N/A'}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-xs text-gray-500 mb-1">Delivery Address</span>
                <span className="block text-base text-gray-800">{selectedOrder.address || selectedOrder.deliveryAddress || 'Not available'}</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Order Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  selectedOrder.status === 'picked' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className={`h-3 rounded-full ${
                    selectedOrder.status === 'delivered' ? 'bg-green-500 w-full' :
                    selectedOrder.status === 'picked' ? 'bg-blue-500 w-2/3' :
                    'bg-yellow-500 w-1/3'
                  }`}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Placed</span>
                <span>Picked</span>
                <span>Delivered</span>
              </div>
            </div>
            <div className="mb-4">
              {selectedOrder.trackingId && (
                <p className="mb-2"><b>Tracking ID:</b> {selectedOrder.trackingId}</p>
              )}
              {selectedOrder.volunteerName && (
                <p className="mb-2"><b>Volunteer:</b> {selectedOrder.volunteerName}</p>
              )}
            </div>
            <button className="mt-2 w-full bg-red-900 hover:bg-red-800 text-white py-2 rounded-xl" onClick={() => setShowTrackOrderModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Buyer Signup Modal */}
      <BuyerSignup
        show={showBuyerSignup}
        onClose={() => setShowBuyerSignup(false)}
        onSuccess={() => {
          setShowBuyerSignup(false);
          toast.success('Signup successful! Welcome to BUNAI.');
        }}
      />

      {/* Leave Review Modal */}
      {showReviewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl aspect-square flex flex-col justify-center">
            <h2 className="text-2xl text-yellow-800 mb-4">Leave a Review</h2>
            <div className="mb-6 flex gap-6 items-center">
              <ImageWithFallback
                src={selectedOrder.image}
                alt={selectedOrder.product}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div>
                <p className="font-semibold text-xl text-gray-800">{selectedOrder.product}</p>
                <p className="text-sm text-gray-600">by {selectedOrder.artist}</p>
                <p className="text-sm text-gray-500">Order Amount: ₹{selectedOrder.amount?.toLocaleString?.() ?? selectedOrder.amount}</p>
                <p className="text-xs text-gray-400">Ordered on: {selectedOrder.orderDate}</p>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <div className="flex items-center gap-2 mb-2">
                {[1,2,3,4,5].map(star => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setReviewRating(star)}
                  >
                    <Star className={`w-7 h-7 ${reviewRating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">{reviewRating > 0 ? `${reviewRating} / 5` : ''}</span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                className="w-full border border-gray-300 rounded-xl p-3"
                rows={5}
                placeholder="Write your review..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl mb-2" onClick={handleSubmitReview}>Submit Review</button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl" onClick={() => setShowReviewModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return renderHome();
      case 'categories':
        return renderHome(); // Same as home but with category focus
      case 'cart':
        return renderCart();
      case 'orders':
        return renderOrders();
      case 'profile':
        return renderProfile();
      default:
        return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl text-red-900">BUNAI</h2>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
                activeSection === item.id
                  ? 'bg-red-900 text-white'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {typeof item.count !== 'undefined' && (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-white text-xs font-bold border-2 border-white">
                  {item.count}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-900 transition-all mt-8"
          >
            <LogOut className="w-5 h-5" />
            {currentText.logout}
          </button>
        </nav>
      </div>


      {/* Main Content */}
      <div className="flex-1 p-8">
  {renderBuyNowModal()}
  {renderContent()}
        {/* Product View Modal - render globally so it works from any section */}
        {showProductModal && viewProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-red-900">{viewProduct.name}</h2>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-100 rounded-xl h-72 flex items-center justify-center">
                  <ProductImageCarousel images={viewProduct.images || dummyImages} name={viewProduct.name} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{viewProduct.name}</h3>
                  <p className="text-2xl font-bold text-red-900 mt-1">₹{viewProduct.price}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${viewProduct.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{viewProduct.inStock ? currentText.inStock : currentText.outOfStock}</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{currentText.categories[viewProduct.category]}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{viewProduct.rating}</span>
                    </div>
                    <span>({viewProduct.reviews} {currentText.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{viewProduct.location}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Delivery Estimate:</span>
                    <span className="ml-2 text-gray-600">{viewProduct.deliveryEstimate || '2-5 days'}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Description:</span>
                    <span className="ml-2 text-gray-600">{viewProduct.description || 'No description available.'}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="ml-2 text-gray-600">{currentText.categories[viewProduct.category]}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Stock:</span>
                    <span className="ml-2 text-gray-600">{viewProduct.inStock ? 'Available' : 'Out of Stock'}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Artist:</span>
                    <span className="ml-2 text-gray-600">{viewProduct.artist}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Product ID:</span>
                    <span className="ml-2 text-gray-600">{viewProduct.id}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-medium text-gray-700">Buyer Reviews:</span>
                    <span className="ml-2 text-gray-600">{viewProduct.reviews} reviews, avg. {viewProduct.rating} stars</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart(viewProduct)}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-xl transition-colors text-sm"
                    >
                      {currentText.addToCart}
                    </button>
                    <button
                      className="flex-1 bg-red-900 hover:bg-red-800 text-white py-2 px-4 rounded-xl transition-colors text-sm"
                      onClick={() => {
                        setShowProductModal(false);
                        setTimeout(() => {
                          setBuyNowProduct(viewProduct);
                          setShowBuyNowModal(true);

                        }, 200);
                      }}
                    >
                      {currentText.buyNow}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                activeSection === item.id ? 'text-red-900' : 'text-gray-600'
              }`}
            >
              <div className="relative">
                <item.icon className="w-6 h-6" />
                {item.count && item.count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BuyerDashboard;