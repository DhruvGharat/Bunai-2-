import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import ArtisanDashboard from './components/ArtisanDashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import AboutUs from './components/AboutUs';

type UserRole = 'admin' | 'buyer' | 'artisan' | 'volunteer' | null;
type CurrentPage = 'welcome' | 'login' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('welcome');
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentPage('login');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedRole(null);
    setCurrentPage('welcome');
    navigate('/');
  };

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} language={language} />;
      case 'buyer':
        return <BuyerDashboard onLogout={handleLogout} language={language} />;
      case 'artisan':
        return <ArtisanDashboard onLogout={handleLogout} language={language} />;
      case 'volunteer':
        return <VolunteerDashboard onLogout={handleLogout} language={language} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  // Handle initial page load
  React.useEffect(() => {
    // Set initial page based on URL
    if (window.location.pathname === '/about') {
      // The router will handle the about page
      return;
    } else if (window.location.pathname === '/') {
      setCurrentPage('welcome');
    } else {
      // Redirect unknown routes to welcome
      navigate('/');
      setCurrentPage('welcome');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Routes>
        <Route 
          path="/about" 
          element={
            <AboutUs 
              onBack={() => navigate('/')} 
              language={language} 
              setLanguage={setLanguage}
            />
          } 
        />
        <Route 
          path="/" 
          element={
            <>
              {currentPage === 'welcome' && (
                <WelcomePage 
                  onRoleSelect={handleRoleSelect} 
                  language={language}
                  setLanguage={setLanguage}
                />
              )}
              {currentPage === 'login' && selectedRole && (
                <LoginPage 
                  role={selectedRole} 
                  onLogin={handleLogin} 
                  onBack={() => setCurrentPage('welcome')}
                  language={language}
                />
              )}
              {currentPage === 'dashboard' && isLoggedIn && renderDashboard()}
            </>
          } 
        />
        {/* Catch-all route for 404s - will be handled by the useEffect */}
        <Route path="*" element={null} />
      </Routes>
    </div>
  );
}

export default App;