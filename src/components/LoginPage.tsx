import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, User, ShoppingBag, Palette, Truck } from 'lucide-react';
import ResetPasswordModal from "../components/ResetPasswordModal";
import BuyerSignup from './BuyerSignup';
import ArtistSignup from './ArtistSignup';

type UserRole = 'admin' | 'buyer' | 'artisan' | 'volunteer';
type Language = 'en' | 'hi' | 'mr';

interface LoginPageProps {
  role: UserRole;
  onLogin: () => void;
  onBack: () => void;
  language: Language;
}

const LoginPage: React.FC<LoginPageProps> = ({ role, onLogin, onBack, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [showBuyerSignup, setShowBuyerSignup] = useState(false);
  const [showArtistSignup, setShowArtistSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const text = {
    en: {
      login: "Login",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      name: "Full Name",
      forgotPassword: "Forgot Password?",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      signUpHere: "Sign up here",
      loginHere: "Login here",
      roles: {
        admin: "Admin Portal",
        buyer: "Buyer Portal",
        artisan: "Artisan Portal",
        volunteer: "Volunteer Portal"
      },
      roleDescriptions: {
        admin: "Manage platform operations and oversee the marketplace",
        buyer: "Discover and purchase authentic handmade crafts",
        artisan: "Showcase and sell your beautiful creations",
        volunteer: "Help deliver products in your local community"
      }
    },
    hi: {
      login: "लॉगिन",
      signUp: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      name: "पूरा नाम",
      forgotPassword: "पासवर्ड भूल गए?",
      dontHaveAccount: "कोई खाता नहीं है?",
      alreadyHaveAccount: "पहले से खाता है?",
      signUpHere: "यहाँ साइन अप करें",
      loginHere: "यहाँ लॉगिन करें",
      roles: {
        admin: "प्रबंधक पोर्टल",
        buyer: "खरीदार पोर्टल",
        artisan: "कारीगर पोर्टल",
        volunteer: "स्वयंसेवक पोर्टल"
      },
      roleDescriptions: {
        admin: "प्लेटफॉर्म संचालन का प्रबंधन और बाज़ार की देखरेख",
        buyer: "प्रामाणिक हस्तनिर्मित शिल्प खोजें और खरीदें",
        artisan: "अपनी सुंदर कृतियों को प्रदर्शित और बेचें",
        volunteer: "अपने स्थानीय समुदाय में उत्पादों की डिलीवरी में मदद करें"
      }
    },
    mr: {
      login: "लॉगिन",
      signUp: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्डची पुष्टी करा",
      name: "पूर्ण नाव",
      forgotPassword: "पासवर्ड विसरलात?",
      dontHaveAccount: "खाते नाही?",
      alreadyHaveAccount: "आधीच खाते आहे?",
      signUpHere: "इथे साइन अप करा",
      loginHere: "इथे लॉगिन करा",
      roles: {
        admin: "प्रशासक पोर्टल",
        buyer: "खरेदीदार पोर्टल",
        artisan: "कारागीर पोर्टल",
        volunteer: "स्वयंसेवक पोर्टल"
      },
      roleDescriptions: {
        admin: "प्लॅटफॉर्म ऑपरेशन्स व्यवस्थापित करा आणि मार्केटप्लेसचे निरीक्षण करा",
        buyer: "अस्सल हाताने बनवलेल्या हस्तकला शोधा आणि खरेदी करा",
        artisan: "आपल्या सुंदर निर्मितीचे प्रदर्शन आणि विक्री करा",
        volunteer: "आपल्या स्थानिक समुदायात उत्पादने पोहोचवण्यात मदत करा"
      }
    }
  };

  const currentText = text[language];

  const roleIcons = {
    admin: User,
    buyer: ShoppingBag,
    artisan: Palette,
    volunteer: Truck
  };

  const roleColors = {
    admin: 'from-red-900 to-red-700',
    buyer: 'from-green-800 to-green-600',
    artisan: 'from-yellow-600 to-yellow-500',
    volunteer: 'from-orange-600 to-orange-500'
  };

  const IconComponent = roleIcons[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // --- SWITCH TO SIGNUP FLOWS ---
  if (role === "buyer" && showBuyerSignup) {
    return (
      <BuyerSignup
        onBack={() => setShowBuyerSignup(false)}
        onSuccess={() => {
          setShowBuyerSignup(false);
          onLogin();
        }}
      />
    );
  }

  if (role === "artisan" && showArtistSignup) {
    return (
      <ArtistSignup
        onBack={() => setShowArtistSignup(false)}
        onSuccess={() => {
          setShowArtistSignup(false);
          onLogin();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-red-900 hover:text-red-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Login/Signup Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${roleColors[role]} p-8 text-center text-white`}>
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <IconComponent className="w-8 h-8" />
            </div>
            <h1 className="text-2xl mb-2">{currentText.roles[role]}</h1>
            <p className="text-white/90 text-sm">{currentText.roleDescriptions[role]}</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl text-gray-800 mb-2">
                {isLogin ? currentText.login : currentText.signUp}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {currentText.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {currentText.email}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {currentText.password}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    {currentText.confirmPassword}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              <button
                type="submit"
                className={`w-full bg-gradient-to-r ${roleColors[role]} text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0`}
              >
                {isLogin ? currentText.login : currentText.signUp}
              </button>
            </form>

            {isLogin && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setIsResetOpen(true)}
                  className="text-red-600 hover:text-red-700 text-sm transition-colors"
                >
                  {currentText.forgotPassword}
                </button>
              </div>
            )}

            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                {isLogin ? currentText.dontHaveAccount : currentText.alreadyHaveAccount}
              </p>
              <button
                onClick={() => {
                  if (role === 'buyer' && isLogin) {
                    setShowBuyerSignup(true); // go to BuyerSignup screen
                  } else if (role === 'artisan' && isLogin) {
                    setShowArtistSignup(true); // go to ArtistSignup screen
                  } else {
                    setIsLogin(!isLogin);
                  }
                }}
                className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors mt-1"
              >
                {isLogin ? currentText.signUpHere : currentText.loginHere}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      <ResetPasswordModal isOpen={isResetOpen} onClose={() => setIsResetOpen(false)} />
    </div>
  );
};

export default LoginPage;
