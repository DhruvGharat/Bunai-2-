import React, { useState } from 'react';
import { 
  Truck, Package, DollarSign, User, LogOut, Star, CreditCard,
  CheckCircle
} from 'lucide-react';
import { translations, Language } from './constants/translations';
import OrderCard from './volunteer/OrderCard';

interface VolunteerDashboardProps {
  onLogout: () => void;
  language: Language;
}

const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({ onLogout, language }) => {
  const [activeSection, setActiveSection] = useState('available');
  const [acceptedOrders, setAcceptedOrders] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    city: '',
    vehicleType: '',
    vehicleNumber: '',
    permanentAddress: '',
    currentAddress: '',
    skills: '',
    languages: '',
    profilePhoto: null as File | null,
    aadhaarFile: null as File | null,
    motivation: '',
    agree: false,
  });

  const t = translations[language];

  const menuItems = [
    { id: 'available', label: t.availableOrders, icon: Truck },
    { id: 'deliveries', label: t.myDeliveries, icon: Package },
    { id: 'earnings', label: t.earnings, icon: DollarSign },
    { id: 'profile', label: t.profile, icon: User },
  ];

  const stats = [
    { label: t.ordersCompleted, value: '47', icon: CheckCircle, color: 'bg-green-500' },
    { label: t.totalEarnings, value: '₹12,340', icon: DollarSign, color: 'bg-blue-500' },
    { label: t.averageRating, value: '4.8', icon: Star, color: 'bg-yellow-500' },
  ];

  const mockAvailableOrders = [
    {
      id: 1,
      productName: 'Handwoven Silk Saree',
      customerName: 'Sunita Rao',
      customerPhone: '+91 98765 43210',
      pickupAddress: 'Artisan Workshop, Sector 15, Pune',
      dropoffAddress: '123 MG Road, Koregaon Park, Pune',
      distance: '8.5 km',
      deliveryFee: 150,
      amount: 8500,
      status: 'available',
      productImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      productName: 'Traditional Pottery Set',
      customerName: 'Rajesh Kumar',
      customerPhone: '+91 87654 32109',
      pickupAddress: 'Clay Studio, FC Road, Pune',
      dropoffAddress: '456 Baner Road, Baner, Pune',
      distance: '12.2 km',
      deliveryFee: 180,
      amount: 2500,
      status: 'available',
      productImage: 'https://images.unsplash.com/photo-1578928948388-fa7b9c6bee5b?w=100&h=100&fit=crop'
    }
  ];

  const mockMyDeliveries = [
    {
      id: 3,
      productName: 'Bamboo Craft Set',
      customerName: 'Priya Sharma',
      customerPhone: '+91 76543 21098',
      pickupAddress: 'Craft Corner, JM Road, Pune',
      dropoffAddress: '789 Aundh Road, Aundh, Pune',
      distance: '6.8 km',
      deliveryFee: 120,
      amount: 1800,
      status: 'picked',
      productImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      productName: 'Silver Jewelry',
      customerName: 'Amit Desai',
      customerPhone: '+91 65432 10987',
      pickupAddress: 'Silver Studio, Camp, Pune',
      dropoffAddress: '321 SB Road, Shivaji Nagar, Pune',
      distance: '4.2 km',
      deliveryFee: 100,
      amount: 3200,
      status: 'accepted',
      productImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop'
    }
  ];

  const handleAcceptOrder = (orderId: number) => {
    setAcceptedOrders(prev => [...prev, orderId]);
  };

  const handleMarkPicked = (orderId: number) => {
    console.log('Order picked:', orderId);
  };

  const handleMarkDelivered = (orderId: number) => {
    console.log('Order delivered:', orderId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // reset form
    setProfileData({
      name: '',
      phone: '',
      email: '',
      dob: '',
      city: '',
      vehicleType: '',
      vehicleNumber: '',
      permanentAddress: '',
      currentAddress: '',
      skills: '',
      languages: '',
      profilePhoto: null,
      aadhaarFile: null,
      motivation: '',
      agree: false,
    });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const renderAvailableOrders = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{t.availableOrders}</h1>
      <div className="space-y-4">
        {mockAvailableOrders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            language={language}
            onAccept={handleAcceptOrder}
            showActions={!acceptedOrders.includes(order.id)}
          />
        ))}
      </div>
    </div>
  );

  const renderMyDeliveries = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{t.myDeliveries}</h1>
      <div className="space-y-4">
        {mockMyDeliveries.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            language={language}
            onMarkPicked={handleMarkPicked}
            onMarkDelivered={handleMarkDelivered}
          />
        ))}
      </div>
    </div>
  );

  const renderEarnings = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{t.earnings}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg text-red-900 mb-2">{t.weeklyEarnings}</h3>
          <p className="text-3xl text-gray-800 mb-1">₹2,450</p>
          <p className="text-sm text-green-600">+15% from last week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg text-red-900 mb-2">{t.monthlyEarnings}</h3>
          <p className="text-3xl text-gray-800 mb-1">₹9,870</p>
          <p className="text-sm text-green-600">+22% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg text-red-900 mb-2">{t.availableBalance}</h3>
          <p className="text-3xl text-gray-800 mb-4">₹3,420</p>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            {t.withdrawViaUPI}
          </button>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h1 className="text-3xl text-red-900">{t.profile}</h1>

      {submitted && (
        <div className="p-4 bg-green-100 text-green-700 rounded-xl">
          ✅ Your Form is submitted
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t.name}</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t.phoneNumber}</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t.email}</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t.city}</label>
            <select
              placeholder="Select the City"
              value={profileData.city}
              onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            >
            
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Nashik">Nashik</option>
              <option value="Nagpur">Nagpur</option>
            </select>
          </div>

          {/* Permanent Address */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Permanent Address</label>
            <textarea
              placeholder="Enter your permanent address"
              rows={2}
              value={profileData.permanentAddress}
              onChange={(e) => setProfileData(prev => ({ ...prev, permanentAddress: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Current Address */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Current Address</label>
            <textarea
              placeholder="Enter your current address"
              rows={2}
              value={profileData.currentAddress}
              onChange={(e) => setProfileData(prev => ({ ...prev, currentAddress: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">{t.vehicleType}</label>
            <select
              value={profileData.vehicleType}
              onChange={(e) => setProfileData(prev => ({ ...prev, vehicleType: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            >
              
              <option value="Two Wheeler">Two Wheeler</option>
              <option value="Car">Car</option>
              <option value="Auto Rickshaw">Auto Rickshaw</option>
              <option value="Train">Train</option>
            </select>
          </div>

          {/* Vehicle Number - conditional */}
          {profileData.vehicleType === 'Two Wheeler' && (
            <div>
              <label className="block text-sm text-gray-700 mb-2">Vehicle Registration Number</label>
              <input
                type="text"
                placeholder="Enter vehicle registration number"
                value={profileData.vehicleNumber}
                onChange={(e) => setProfileData(prev => ({ ...prev, vehicleNumber: e.target.value }))}
                required={profileData.vehicleType === 'Two Wheeler'}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
              />
            </div>
          )}

          {/* Profile Photo */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileData(prev => ({ ...prev, profilePhoto: e.target.files?.[0] || null }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Aadhaar Upload */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Upload Aadhaar Card</label>
            <input
              type="file"
              accept=".jpg,.png,.pdf"
              onChange={(e) => setProfileData(prev => ({ ...prev, aadhaarFile: e.target.files?.[0] || null }))}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>

          {/* Motivation */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700 mb-2">Why do you want to be a volunteer?</label>
            <textarea
              placeholder="Write your motivation here"
              rows={3}
              value={profileData.motivation}
              onChange={(e) => setProfileData(prev => ({ ...prev, motivation: e.target.value }))}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Agreement */}
          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              checked={profileData.agree}
              onChange={(e) => setProfileData(prev => ({ ...prev, agree: e.target.checked }))}
              required
              className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="text-gray-700 text-sm">{t.agreeTerms}</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-red-900 hover:bg-red-800 text-white px-6 py-3 rounded-xl transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'available': return renderAvailableOrders();
      case 'deliveries': return renderMyDeliveries();
      case 'earnings': return renderEarnings();
      case 'profile': return renderProfile();
      default: return renderAvailableOrders();
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl text-red-900">BUNAI Volunteer</h2>
          </div>
          <nav className="p-4">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
                  activeSection === item.id ? 'bg-red-900 text-white' : 'text-gray-700 hover:bg-red-50 hover:text-red-900'
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
              {t.logout}
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {activeSection === 'available' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;

