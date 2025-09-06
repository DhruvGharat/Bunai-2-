import React, { useState, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, 
  LayoutDashboard, Package, ShoppingCart, DollarSign, User, LogOut,
  Plus, Edit, Trash2, Eye, Upload, Star, MessageSquare, TrendingUp,
  Calendar, MapPin, Phone, Camera, Save, X, CheckCircle, Clock, Mail, FileText, Banknote
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel } from './ui/carousel';

type Language = 'en' | 'hi' | 'mr';

interface ArtisanDashboardProps {
  onLogout: () => void;
  language: Language;
}

const ArtisanDashboard: React.FC<ArtisanDashboardProps> = ({ onLogout, language }) => {
  // Track the current image index for each product
  const [productImageIndexes, setProductImageIndexes] = useState<{ [productId: string]: number }>({});

  const handlePrevImage = (productId: string, images: string[]) => {
    setProductImageIndexes(prev => ({
      ...prev,
      [productId]: prev[productId] > 0 ? prev[productId] - 1 : images.length - 1
    }));
  };

  const handleNextImage = (productId: string, images: string[]) => {
    setProductImageIndexes(prev => ({
      ...prev,
      [productId]: prev[productId] < images.length - 1 ? prev[productId] + 1 : 0
    }));
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  // State declarations
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [smsConfirmed, setSmsConfirmed] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit' | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  
  const [profileData, setProfileData] = useState({
    name: 'Priya Sharma',
    email: 'priya@email.com',
    contact: '+91 98765 43210',
    address: '123 Artisan Street, Jodhpur, Rajasthan',
    photo: 'https://randomuser.me/api/portraits/women/32.jpg',
    proofType: 'aadhar',
    proofNumber: 'XXXX XXXX XXXX 1234',
    bankName: 'State Bank of India',
    accountNumber: 'XXXXXX123456',
    ifsc: 'SBIN0000123',
    region: 'Rajasthan',
    language: 'Hindi',
    culturalStory: 'I have been creating traditional handwoven textiles for over 15 years, following techniques passed down through generations in my family...',
    status: 'verified' // verified/pending/rejected
  });
  
  const [productFormData, setProductFormData] = useState({
    id: '',
    name: '',
    category: 'textiles',
    price: '',
    quantity: '1',
    description: '',
    images: [] as string[],
    imageFile: null as File | null
  });
  
  const [mockProducts, setMockProducts] = useState([
  {
    id: '1',
    name: 'Handwoven Silk Saree',
    category: 'textiles',
    price: 8500,
    quantity: 5,
    description: 'Beautiful handwoven silk saree with traditional patterns',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1610030470000-98e550d6193c?w=200&h=200&fit=crop'
    ],
    status: 'approved',
    rating: 4.8,
    reviews: 23,
    sales: 15,
  },
  {
    id: '2',
    name: 'Traditional Silver Bangles',
    category: 'jewelry',
    price: 3200,
    quantity: 8,
    description: 'Elegant silver bangles with tribal motifs',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1515562141208-7a88fb7ce338?w=200&h=200&fit=crop'
    ],
    status: 'pending',
    rating: 4.9,
    reviews: 12,
    sales: 8,
  },
  {
    id: '3',
    name: 'Madhubani Painting',
    category: 'paintings',
    price: 4500,
    quantity: 3,
    description: 'Traditional Madhubani painting from Bihar',
    images: [
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1541961017775-22349e4a1262?w=200&h=200&fit=crop'
    ],
    status: 'approved',
    rating: 4.7,
    reviews: 18,
    sales: 6,
  }
]);

  const handleSaveProduct = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (viewMode === 'edit') {
      setMockProducts(prev => 
        prev.map(p => 
          p.id === productFormData.id 
            ? { 
                ...p,
                ...productFormData, 
                price: Number(productFormData.price), 
                quantity: Number(productFormData.quantity) 
              } 
            : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productFormData,
        id: Date.now().toString(),
        price: Number(productFormData.price),
        quantity: Number(productFormData.quantity),
        status: 'pending',
        rating: 0,
        reviews: 0,
        sales: 0,
        image: productFormData.images.length > 0 ? productFormData.images[0] : ''
      };
      setMockProducts(prev => [...prev, newProduct]);
    }
    
    // Reset form and close modal
    setProductFormData({
      id: '',
      name: '',
      category: 'textiles',
      price: '',
      quantity: '1',
      description: '',
      images: [],
      imageFile: null
    });
    setShowUploadForm(false);
    setViewMode(null);
  }, [viewMode, productFormData]);

  const handleViewProduct = useCallback((product: any) => {
    setSelectedProduct(product);
    setViewMode('view');
  }, []);

  const handleEditProduct = useCallback((product: any) => {
    setProductFormData({
      id: product.id,
      name: product.name,
      category: product.category || 'textiles',
      price: product.price.toString(),
      quantity: product.quantity?.toString() || '1',
      description: product.description || '',
      images: product.images || [product.image].filter(Boolean),
      imageFile: null
    });
    setViewMode('edit');
  }, []);

  const handleDeleteProduct = useCallback((productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setMockProducts(prev => prev.filter(p => p.id !== productId));
    }
  }, []);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
  const files = Array.from(e.target.files) as File[];
      if (files.length + productFormData.images.length > 5) {
        alert('You can upload a maximum of 5 images.');
        return;
      }
      const readers = files.map((file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then(imageUrls => {
        setProductFormData(prev => ({
          ...prev,
          images: [...prev.images, ...imageUrls].slice(0, 5),
          imageFile: null // Not used for multiple
        }));
      });
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setProductFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  }, []);
  // Translation object and related logic must be inside the component function
  const text = {
    en: {
      dashboard: "Dashboard",
      myProducts: "My Products",
      orders: "Orders",
      earnings: "Earnings",
      profile: "Profile",
      logout: "Logout",
      addProduct: "Add Product",
      editProduct: "Edit Product",
      productsListed: "Products Listed",
      close: "Close",
      ordersReceived: "Orders Received",
      totalEarnings: "Total Earnings",
      smsConfirmation: "SMS Confirmation",
      productName: "Product Name",
      category: "Category",
      price: "Price",
      quantity: "Quantity",
      description: "Description",
      uploadImages: "Upload Images",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      delivered: "Delivered",
      inTransit: "In Transit",
      placed: "Placed",
      weeklyEarnings: "Weekly Earnings",
      monthlyEarnings: "Monthly Earnings",
      withdrawViaUPI: "Withdraw via UPI",
      customerName: "Customer Name",
      orderDate: "Order Date",
      status: "Status",
      amount: "Amount",
      culturalStory: "Cultural Story",
      region: "Region",
      language: "Language",
      phoneNumber: "Phone Number",
      categories: {
        textiles: "Textiles",
        jewelry: "Jewelry",
        pottery: "Pottery",
        crafts: "Handicrafts",
        paintings: "Paintings"
      }
    },
    hi: {
      dashboard: "डैशबोर्ड",
      myProducts: "मेरे उत्पाद",
      orders: "ऑर्डर",
      earnings: "कमाई",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट",
      addProduct: "उत्पाद जोड़ें",
      editProduct: "उत्पाद संपादित करें",
      productsListed: "सूचीबद्ध उत्पाद",
      close: "बंद करें",
      ordersReceived: "प्राप्त ऑर्डर",
      totalEarnings: "कुल कमाई",
      smsConfirmation: "एसएमएस पुष्टि",
      productName: "उत्पाद का नाम",
      category: "श्रेणी",
      price: "कीमत",
      quantity: "मात्रा",
      description: "विवरण",
      uploadImages: "छवियां अपलोड करें",
      save: "सहेजें",
      cancel: "रद्द करें",
      edit: "संपादित करें",
      delete: "हटाएं",
      view: "देखें",
      pending: "लंबित",
      approved: "स्वीकृत",
      rejected: "अस्वीकृत",
      delivered: "डिलीवर",
      inTransit: "ट्रांजिट में",
      placed: "प्लेस किया गया",
      weeklyEarnings: "साप्ताहिक कमाई",
      monthlyEarnings: "मासिक कमाई",
      withdrawViaUPI: "यूपीआई के माध्यम से निकालें",
      customerName: "ग्राहक का नाम",
      orderDate: "ऑर्डर दिनांक",
      status: "स्थिति",
      amount: "राशि",
      culturalStory: "सांस्कृतिक कहानी",
      region: "क्षेत्र",
      language: "भाषा",
      phoneNumber: "फ़ोन नंबर",
      categories: {
        textiles: "वस्त्र",
        jewelry: "आभूषण",
        pottery: "मिट्टी के बर्तन",
        crafts: "हस्तशिल्प",
        paintings: "चित्रकारी"
      }
    },
    mr: {
      dashboard: "डॅशबोर्ड",
      myProducts: "माझी उत्पादने",
      orders: "ऑर्डर",
      earnings: "कमाई",
      profile: "प्रोफाइल",
      logout: "लॉगआउट",
      addProduct: "उत्पादन जोडा",
      editProduct: "उत्पादन संपादित करा",
      productsListed: "सूचीबद्ध उत्पादने",
      close: "बंद करा",
      ordersReceived: "प्राप्त ऑर्डर",
      totalEarnings: "एकूण कमाई",
      smsConfirmation: "एसएमएस पुष्टीकरण",
      productName: "उत्पादनाचे नाव",
      category: "श्रेणी",
      price: "किंमत",
      quantity: "प्रमाण",
      description: "वर्णन",
      uploadImages: "प्रतिमा अपलोड करा",
      save: "जतन करा",
      cancel: "रद्द करा",
      edit: "संपादित करा",
      delete: "हटवा",
      view: "पहा",
      pending: "प्रलंबित",
      approved: "मंजूर",
      rejected: "नाकारले",
      delivered: "वितरित",
      inTransit: "ट्रान्झिटमध्ये",
      placed: "ठेवले",
      weeklyEarnings: "साप्ताहिक कमाई",
      monthlyEarnings: "मासिक कमाई",
      withdrawViaUPI: "यूपीआयद्वारे काढा",
      customerName: "ग्राहकाचे नाव",
      orderDate: "ऑर्डर दिनांक",
      status: "स्थिती",
      amount: "रक्कम",
      culturalStory: "सांस्कृतिक कथा",
      region: "प्रदेश",
      language: "भाषा",
      phoneNumber: "फोन नंबर",
      categories: {
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
    { id: 'dashboard', label: currentText.dashboard, icon: LayoutDashboard },
    { id: 'products', label: currentText.myProducts, icon: Package },
    { id: 'orders', label: currentText.orders, icon: ShoppingCart },
    { id: 'earnings', label: currentText.earnings, icon: DollarSign },
    { id: 'profile', label: currentText.profile, icon: User },
  ];

  const dashboardStats = [
    { label: currentText.productsListed, value: '12', icon: Package, color: 'bg-blue-500' },
    { label: currentText.ordersReceived, value: '34', icon: ShoppingCart, color: 'bg-green-500' },
    { label: currentText.totalEarnings, value: '₹45,670', icon: DollarSign, color: 'bg-yellow-500' },
    { label: currentText.smsConfirmation, value: smsConfirmed ? 'Active' : 'Pending', icon: MessageSquare, color: smsConfirmed ? 'bg-green-500' : 'bg-orange-500' },
  ];

  // mockProducts state moved to the top of the component

  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minAmount: '',
    maxAmount: '',
    minProducts: '',
    status: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = (orders: any[]) => {
    return orders.filter(order => {
      // Filter by location (city/state)
      if (filters.location && order.customer?.address && 
          !order.customer.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Filter by amount range
      if (filters.minAmount && order.total < Number(filters.minAmount)) {
        return false;
      }
      if (filters.maxAmount && order.total > Number(filters.maxAmount)) {
        return false;
      }
      
      // Filter by minimum number of products
      if (filters.minProducts && (!order.itemCount || order.itemCount < Number(filters.minProducts))) {
        return false;
      }
      
      // Filter by status
      if (filters.status && order.status !== filters.status) {
        return false;
      }
      
      return true;
    });
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      minAmount: '',
      maxAmount: '',
      minProducts: '',
      status: ''
    });
  };

  const mockOrders = [
    {
      id: 1,
      productName: 'Handwoven Silk Saree',
      customerName: 'Rahul S.',
      price: '₹2,999',
      date: '2025-08-20',
      status: 'delivered',
      itemCount: 1,
      customer: {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 98765 12340',
        address: '502, Green Valley Apartments, Whitefield, Bengaluru - 560066',
      },
      orderDate: '2025-08-20',
      deliveryDate: '2025-08-28',
      paymentMethod: 'UPI',
      paymentStatus: 'Paid',
      items: [
        { name: 'Tribal Pottery Set', quantity: 1, price: 2499, image: '/images/pottery.jpg' },
        { name: 'Clay Diya Set', quantity: 2, price: 500, image: '/images/pottery.jpg' }
      ],
      subtotal: 2999,
      shipping: 0,
      tax: 539.82,
      total: 3538.82
    },
    {
      id: 2,
      productName: 'Traditional Silver Bangles',
      customerName: 'Ananya G.',
      price: '₹6,478',
      date: '2025-08-15',
      status: 'pending',
      itemCount: 1,
      customer: {
        name: 'Ananya Gupta',
        email: 'ananya.g@example.com',
        phone: '+91 98765 56780',
        address: '1204, Lakeview Residency, Gachibowli, Hyderabad - 500032',
      },
      orderDate: '2025-08-15',
      deliveryDate: '2025-08-30',
      paymentMethod: 'Net Banking',
      paymentStatus: 'Pending',
      items: [
        { name: 'Silver Tribal Necklace', quantity: 1, price: 5499, image: '/images/traditionaljewellery.jpg' }
      ],
      subtotal: 5499,
      shipping: 0,
      tax: 989.82,
      total: 6478.82
    },
    {
      id: 3,
      productName: 'Madhubani Painting',
      customerName: 'Amit Kumar',
      price: '₹4,500',
      date: '2025-08-25',
      status: 'inTransit',
      itemCount: 1
        ,
        customer: {
          name: 'Amit Kumar',
          email: 'amit.kumar@example.com',
          phone: '+91 98765 43210',
          address: '304, Lotus Apartments, Sector 21, Gurugram - 122016',
        },
        orderDate: '2025-08-25',
        deliveryDate: '2025-09-02',
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        items: [
          { name: 'Madhubani Painting', quantity: 1, price: 4500, image: '/images/paintings.jpg' }
        ],
        subtotal: 4500,
        shipping: 0,
        tax: 810.00,
        total: 5310.00
      }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-red-900">{currentText.dashboard}</h1>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {currentText.addProduct}
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              {stat.label === currentText.smsConfirmation && !smsConfirmed && (
                <span className="text-orange-600 text-sm">Pending</span>
              )}
            </div>
            <h3 className="text-2xl text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl text-red-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {mockOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-gray-800">{order.productName}</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800">₹{order.price}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'inTransit' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {currentText[order.status as keyof typeof currentText] || order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl text-red-900 mb-4">Performance Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Products</span>
              <span className="text-gray-800">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Rating</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-gray-800">4.8</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Sales</span>
              <span className="text-gray-800">29</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">This Month</span>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+23%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductViewModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-red-900">{selectedProduct?.name}</h2>
          <button
            onClick={() => setViewMode(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                {selectedProduct?.images && selectedProduct.images.length > 0 ? (
                  <Carousel opts={{ loop: true }}>
                    {selectedProduct.images.map((img: string, idx: number) => (
                      <div key={idx} className="flex items-center justify-center h-64">
                        <img src={img} alt={`Product ${idx + 1}`} className="max-h-full max-w-full object-cover rounded-xl" />
                      </div>
                    ))}
                  </Carousel>
                ) : selectedProduct?.image ? (
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="max-h-full max-w-full object-cover rounded-xl"
                  />
                ) : (
                  <ImageWithFallback 
                    src="" 
                    alt={selectedProduct?.name || 'Product'} 
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{selectedProduct?.name}</h3>
              <p className="text-2xl font-bold text-red-900 mt-1">₹{selectedProduct?.price}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs rounded-full ${
                selectedProduct?.stock > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {selectedProduct?.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                {selectedProduct?.category}
              </span>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600">
                {selectedProduct?.description || 'No description available.'}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-gray-900">{selectedProduct?.category || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="text-gray-900">{selectedProduct?.stock || 0} units</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Added On</p>
                  <p className="text-gray-900">
                    {selectedProduct?.createdAt 
                      ? new Date(selectedProduct.createdAt).toLocaleDateString() 
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-900">
                    {selectedProduct?.updatedAt 
                      ? new Date(selectedProduct.updatedAt).toLocaleDateString() 
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              handleEditProduct(selectedProduct);
              setViewMode('edit');
            }}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1"
          >
            <Edit className="w-4 h-4" />
            {currentText.edit}
          </button>
          <button
            onClick={() => setViewMode(null)}
            className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors"
          >
            {currentText.close}
          </button>
        </div>
      </div>
    </div>
  );

  const renderProductForm = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-red-900">
            {viewMode === 'edit' ? currentText.editProduct : currentText.addProduct}
          </h2>
          <button
            onClick={() => setViewMode(null)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentText.productName} *
              </label>
              <input
                type="text"
                name="name"
                value={productFormData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentText.category} *
              </label>
              <select
                name="category"
                value={productFormData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              >
                <option value="textiles">Textiles</option>
                <option value="jewelry">Jewelry</option>
                <option value="pottery">Pottery</option>
                <option value="paintings">Paintings</option>
                <option value="handicrafts">Handicrafts</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentText.price} (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={productFormData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentText.quantity} *
              </label>
              <input
                type="number"
                name="quantity"
                value={productFormData.quantity}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentText.description}
              </label>
              <textarea
                name="description"
                value={productFormData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {currentText.uploadImages}
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-red-300 transition-colors">
                <div className="space-y-1 text-center w-full">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-red-900 hover:text-red-800 px-4 py-2 border border-red-300">
                      <span>{currentText.uploadImages}</span>
                      <input 
                        type="file" 
                        style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                        multiple 
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={productFormData.images.length >= 5}
                      />
                    </label>
                    <p className="pl-1">(Click to select up to 5 images)</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  {productFormData.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {productFormData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {productFormData.images.length >= 5 && (
                    <p className="text-xs text-red-500 mt-2">Maximum 5 images allowed. Remove one to add another.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setViewMode(null)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {currentText.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors"
            >
              {currentText.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-red-900">{currentText.myProducts}</h1>
        <button
          onClick={() => {
            setProductFormData({
              id: '',
              name: '',
              category: 'textiles',
              price: '',
              quantity: '1',
              description: '',
              images: [],
              imageFile: null
            });
            setShowUploadForm(true);
          }}
          className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {currentText.addProduct}
        </button>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-square w-full flex items-center justify-center">
                {product.images && product.images.length > 1 ? (
                  <>
                    <button
                      type="button"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-10 hover:bg-white"
                      onClick={e => {
                        e.stopPropagation();
                        handlePrevImage(product.id, product.images);
                      }}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <ImageWithFallback
                      src={product.images[productImageIndexes[product.id] || 0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-10 hover:bg-white"
                      onClick={e => {
                        e.stopPropagation();
                        handleNextImage(product.id, product.images);
                      }}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                ) : (
                  <ImageWithFallback
                    src={product.images && product.images.length > 0 ? product.images[0] : product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg text-gray-800 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {currentText.categories[product.category as keyof typeof currentText.categories]}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl text-gray-800">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-600">Qty: {product.quantity}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span>({product.reviews} reviews)</span>
                  <span>{product.sales} sales</span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => handleViewProduct(product)}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    {currentText.view}
                  </button>
                  <button 
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    {currentText.edit}
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-50 border border-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    {currentText.delete}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-red-900">{currentText.orders}</h1>
        <div className="flex gap-2 relative">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Export
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 border rounded-lg text-sm font-medium ${showFilters ? 'bg-red-800 border-red-800' : 'bg-red-900 border-transparent hover:bg-red-800'} text-white`}
          >
            {showFilters ? 'Hide Filters' : 'Filter'}
          </button>
          
          {showFilters && (
            <div className="absolute right-0 mt-10 w-64 bg-white rounded-lg shadow-lg z-10 p-4 border border-gray-200">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="City, State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount (₹)</label>
                    <input
                      type="number"
                      name="minAmount"
                      value={filters.minAmount}
                      onChange={handleFilterChange}
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Amount (₹)</label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={filters.maxAmount}
                      onChange={handleFilterChange}
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Products</label>
                  <input
                    type="number"
                    name="minProducts"
                    value={filters.minProducts}
                    onChange={handleFilterChange}
                    placeholder="Minimum products"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inTransit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                
                <div className="flex justify-between pt-2">
                  <button
                    onClick={resetFilters}
                    className="px-3 py-1.5 text-sm text-red-700 hover:text-red-800"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
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
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-red-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                  Order
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-red-900 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applyFilters(mockOrders).map((order) => (
                <React.Fragment key={order.id}>
                  <tr 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm text-gray-500">{order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customer?.email || ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'inTransit' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {currentText[order.status as keyof typeof currentText] || order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-900 hover:text-red-700">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          {expandedOrder === order.id ? (
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          ) : (
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          )}
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order.id && order.customer && (
                    <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Details</h3>
                            <div className="space-y-2 text-sm">
                              <p className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-gray-500" />
                                {order.customer.name}
                              </p>
                              <p className="flex items-center">
                                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {order.customer.email}
                              </p>
                              <p className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                                {order.customer.phone}
                              </p>
                              <p className="flex items-start">
                                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                                <span>{order.customer.address}</span>
                              </p>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Order Summary</h3>
                            <div className="space-y-3">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden mr-3">
                                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="text-sm font-medium">₹{item.price.toLocaleString('en-IN')}</p>
                                </div>
                              ))}
                              <div className="border-t border-gray-200 pt-3 space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Subtotal</span>
                                  <span>₹{order.subtotal?.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Shipping</span>
                                  <span>Free</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Tax</span>
                                  <span>₹{order.tax?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                                  <span>Total</span>
                                  <span className="text-red-900">₹{order.total?.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Order Information</h3>
                            <div className="space-y-3 text-sm">
                              <div>
                                <p className="text-gray-500">Order Date</p>
                                <p className="font-medium">
                                  {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Delivery Date</p>
                                <p className="font-medium">
                                  {new Date(order.deliveryDate).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Payment Method</p>
                                <p className="font-medium">{order.paymentMethod}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Payment Status</p>
                                <p className={`font-medium ${
                                  order.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                                }`}>
                                  {order.paymentStatus}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const [timeRange, setTimeRange] = useState<'monthly' | 'weekly'>('monthly');

  // Simple test data
  const testData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ];

  const currentTotal = 12340; // Example total

  const renderEarnings = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{currentText.earnings}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg text-red-900 mb-2">{timeRange === 'weekly' ? currentText.weeklyEarnings : currentText.monthlyEarnings}</h3>
          <p className="text-3xl text-gray-800 mb-1">₹{currentTotal.toLocaleString('en-IN')}</p>
          <p className="text-sm text-green-600">+12% from last {timeRange === 'weekly' ? 'week' : 'month'}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg text-red-900 mb-2">Available Balance</h3>
          <p className="text-3xl text-gray-800 mb-1">₹{(currentTotal * 0.3).toLocaleString('en-IN')}</p>
          <p className="text-sm text-blue-600">30% of total earnings</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg text-red-900 mb-2">Withdraw Funds</h3>
          <p className="text-3xl text-gray-800 mb-4">₹12,340</p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition-colors">
            {currentText.withdrawViaUPI}
          </button>
        </div>
      </div>

      {/* Simple Test Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl text-red-900 mb-4">Earnings Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={testData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

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
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-yellow-700">Artist Profile</h1>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            profileData.status === 'verified' ? 'bg-green-100 text-green-800' :
            profileData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1)}
          </span>
          {!isEditingProfile && (
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-100 relative group">
            <img 
              src={profileData.photo} 
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
                    value={editedProfile.name || ''}
                    onChange={handleProfileInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email || ''}
                    onChange={handleProfileInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="tel"
                    name="contact"
                    value={editedProfile.contact || ''}
                    onChange={handleProfileInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    name="address"
                    value={editedProfile.address || ''}
                    onChange={handleProfileInputChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                  <span>{profileData.address}</span>
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
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-yellow-50 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 mb-3 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Verification Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">ID Type</p>
                {isEditingProfile ? (
                  <select
                    name="proofType"
                    value={editedProfile.proofType || profileData.proofType}
                    onChange={handleProfileInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="aadhar">Aadhar Card</option>
                    <option value="pan">PAN Card</option>
                  </select>
                ) : (
                  <p className="font-medium">
                    {profileData.proofType === 'aadhar' ? 'Aadhar Card' : 'PAN Card'}
                  </p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500">ID Number</p>
                {isEditingProfile ? (
                  <input
                    type="text"
                    name="proofNumber"
                    value={editedProfile.proofNumber || profileData.proofNumber}
                    onChange={handleProfileInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                ) : (
                  <p className="font-mono">{profileData.proofNumber}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 mb-3 flex items-center">
              <Banknote className="w-5 h-5 mr-2" />
              Bank Details
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Bank Name</p>
                {isEditingProfile ? (
                  <input
                    type="text"
                    name="bankName"
                    value={editedProfile.bankName || profileData.bankName}
                    onChange={handleProfileInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                ) : (
                  <p className="font-medium">{profileData.bankName}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Account Number</p>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      name="accountNumber"
                      value={editedProfile.accountNumber || profileData.accountNumber}
                      onChange={handleProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="font-mono">•••• •••• {profileData.accountNumber.slice(-4)}</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500">IFSC</p>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      name="ifsc"
                      value={editedProfile.ifsc || profileData.ifsc}
                      onChange={handleProfileInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="font-mono">{profileData.ifsc}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Cultural Background</h3>
          <div className="bg-yellow-50 p-4 rounded-xl">
            {isEditingProfile ? (
              <textarea
                name="culturalStory"
                value={editedProfile.culturalStory || profileData.culturalStory}
                onChange={handleProfileInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Tell us about your cultural background and artistic journey..."
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-line">{profileData.culturalStory}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Reset form when upload form is shown
  React.useEffect(() => {
    if (showUploadForm) {
      setProductFormData({
        id: '',
        name: '',
        category: 'textiles',
        price: '',
        quantity: '1',
        description: '',
        images: [],
        imageFile: null
      });
    }
  }, [showUploadForm]);

  const renderUploadForm = useCallback(() => {
    const currentText = text[language];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-red-900">{currentText.addProduct}</h2>
            <button
              onClick={() => setShowUploadForm(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">{currentText.productName}</label>
              <input
                type="text"
                value={productFormData.name}
                onChange={handleInputChange}
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter product name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">{currentText.category}</label>
                <select 
                  value={productFormData.category}
                  onChange={handleInputChange}
                  name="category"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {Object.entries(currentText.categories).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">{currentText.price}</label>
                <input
                  type="number"
                  value={productFormData.price}
                  onChange={handleInputChange}
                  name="price"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter price in ₹"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">{currentText.quantity}</label>
              <input
                type="number"
                value={productFormData.quantity}
                onChange={handleInputChange}
                name="quantity"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter available quantity"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">{currentText.description}</label>
              <textarea
                rows={4}
                value={productFormData.description}
                onChange={handleInputChange}
                name="description"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describe your product, materials used, cultural significance..."
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">{currentText.uploadImages}</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-300 transition-colors">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <label className="cursor-pointer inline-block bg-white border border-red-300 px-4 py-2 rounded-md font-medium text-red-900 hover:text-red-800">
                  <span>Click to upload images (max 5)</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    disabled={productFormData.images.length >= 5}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">Support JPG, PNG (Max 5MB each)</p>
                {productFormData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {productFormData.images.map((img, index) => (
                      <div key={index} className="relative flex flex-col items-center group">
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        {viewMode === 'edit' && productFormData.images.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold shadow hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {productFormData.images.length >= 5 && (
                  <p className="text-xs text-red-500 mt-2">Maximum 5 images allowed. Remove one to add another.</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-red-900 hover:bg-red-800 text-white py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                {currentText.save}
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl transition-colors"
              >
                {currentText.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }, [showUploadForm, language, productFormData, handleInputChange, handleSaveProduct, text]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'earnings':
        return renderEarnings();
      case 'profile':
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl text-red-900">BUNAI Artisan</h2>
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
        {renderContent()}
      </div>

      {/* Modals */}
      {showUploadForm && renderUploadForm()}
      {viewMode === 'view' && renderProductViewModal()}
      {viewMode === 'edit' && renderProductForm()}
    </div>
  );
};

export default ArtisanDashboard;