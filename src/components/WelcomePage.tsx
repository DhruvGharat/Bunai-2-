import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, User, ShoppingBag, Palette, Truck, Globe } from "lucide-react";
import Footer from "./Footer";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackSrc = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

type UserRole = 'admin' | 'buyer' | 'artisan' | 'volunteer';
type Language = 'en' | 'hi' | 'mr';

interface WelcomePageProps {
  onRoleSelect: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onRoleSelect, language, setLanguage }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const slides = [
    { image: "images/artisanweaving.jpg", alt: "Artisan weaving traditional textiles" },
    { image: "images/traditionaljewellery.jpg", alt: "Traditional Indian jewelry" },
    { image: "images/pottery.jpg", alt: "Handmade pottery and crafts" },
    { image: "images/textiles.jpg", alt: "Tribal textiles and patterns" }
  ];

  const text = {
    en: {
      title: "BUNAI",
      subtitle: "Weaving Together Stories and Culture",
      description: "Empowering Artisans Across India",
      continueAs: "Continue as...",
      roles: {
        admin: { name: "Admin", tagline: "Manage the platform" },
        buyer: { name: "Buyer", tagline: "Discover authentic crafts" },
        artisan: { name: "Artisan", tagline: "Share your creations" },
        volunteer: { name: "Volunteer", tagline: "Support local delivery" }
      },
      login: "Login",
      signUp: "Sign Up",
      footer: { about: "About", contact: "Contact", privacy: "Privacy Policy" }
    },
    hi: {
      title: "बुनाई",
      subtitle: "कहानियों और संस्कृति को बुनते हुए",
      description: "भारत भर के कारीगरों को सशक्त बनाना",
      continueAs: "जारी रखें...",
      roles: {
        admin: { name: "प्रशासक", tagline: "प्लेटफ़ॉर्म प्रबंधित करें" },
        buyer: { name: "खरीदार", tagline: "प्रामाणिक हस्तशिल्प खोजें" },
        artisan: { name: "कारीगर", tagline: "अपनी कृतियाँ साझा करें" },
        volunteer: { name: "स्वयंसेवक", tagline: "स्थानीय डिलीवरी में मदद करें" }
      },
      login: "लॉगिन",
      signUp: "साइन अप",
      footer: { about: "हमारे बारे में", contact: "संपर्क करें", privacy: "गोपनीयता नीति" }
    },
    mr: {
      title: "बुनाई",
      subtitle: "कथा आणि संस्कृती एकत्र विणताना",
      description: "भारतभरातील कारागिरांना सामर्थ्य देणे",
      continueAs: "सुरू ठेवा...",
      roles: {
        admin: { name: "प्रशासक", tagline: "प्लॅटफॉर्म व्यवस्थापित करा" },
        buyer: { name: "खरेदीदार", tagline: "खरे हस्तकला शोधा" },
        artisan: { name: "कारागीर", tagline: "आपली निर्मिती शेअर करा" },
        volunteer: { name: "स्वयंसेवक", tagline: "स्थानिक वितरणात मदत करा" }
      },
      login: "लॉगिन",
      signUp: "साइन अप",
      footer: { about: "आमच्याबद्दल", contact: "संपर्क", privacy: "गोपनीयता धोरण" }
    }
  };

  const currentText = text[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (delta < -50) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    touchStartX.current = null;
  };

  const roleIcons = { admin: User, buyer: ShoppingBag, artisan: Palette, volunteer: Truck };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-6">
        <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-red-900 text-white' : 'text-red-900 hover:bg-red-50'}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'hi' ? 'bg-red-900 text-white' : 'text-red-900 hover:bg-red-50'}`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage('mr')}
            className={`px-3 py-1 rounded-full transition-colors ${language === 'mr' ? 'bg-red-900 text-white' : 'text-red-900 hover:bg-red-50'}`}
          >
            मराठी
          </button>
          <div className="w-px h-6 bg-gray-300"></div>
          <Globe className="w-5 h-5 text-red-900" />
        </div>
      </nav>

      {/* Main content, now correctly configured to take available space */}
      <div className="flex-1">
        <div className="relative h-screen" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <ImageWithFallback src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
            </div>
          ))}

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center text-center z-40">
            <div className="max-w-4xl px-6">
              <h1 className="text-6xl md:text-8xl text-white mb-4 tracking-wider">{currentText.title}</h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-2">{currentText.subtitle}</p>
              <p className="text-xl md:text-2xl text-yellow-300">{currentText.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-stone-50 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center mb-12 text-red-900">{currentText.continueAs}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(currentText.roles).map(([role, roleData]) => {
                const IconComponent = roleIcons[role as keyof typeof roleIcons];
                return (
                  <div
                    key={role}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-red-900/20"
                    onClick={() => onRoleSelect(role as UserRole)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-900 to-red-700 rounded-full flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl mb-2 text-red-900">{roleData.name}</h3>
                      <p className="text-stone-600 mb-6 text-sm">{roleData.tagline}</p>
                      <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-full transition-colors font-medium">{currentText.login}</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;