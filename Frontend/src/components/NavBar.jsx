import React, { useState } from 'react';
import { FaHome, FaShoppingBag, FaDollarSign, FaShoppingCart, FaCog, FaInfoCircle, FaUser, FaSignOutAlt, FaUserShield } from 'react-icons/fa';

const NavBar = ({ setStep, setProf, prof }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setProf(null);
    setStep("login");
  };

  return (
    <nav className="navbar-modern">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Logo/Brand */}
          <a 
            className="navbar-brand-modern" 
            href="#" 
            onClick={() => setStep("home")}
          >
            <span style={{ fontSize: '1.8rem', marginRight: '8px' }}>📱</span>
            PhoneStore
          </a>

          {/* Desktop Navigation */}
          <div className="d-none d-md-flex align-items-center">
            <a 
              className="nav-link-modern" 
              href="#" 
              onClick={() => setStep("home")}
            >
              <FaHome style={{ marginRight: '6px' }} />
              Home
            </a>
            
            <a 
              className="nav-link-modern" 
              href="#" 
              onClick={() => setStep("shop")}
            >
              <FaShoppingBag style={{ marginRight: '6px' }} />
              Shop
            </a>
            
            <a 
              className="nav-link-modern" 
              href="#" 
              onClick={() => setStep("sell")}
            >
              <FaDollarSign style={{ marginRight: '6px' }} />
              Sell
            </a>
            
            <a 
              className="nav-link-modern" 
              href="#" 
              onClick={() => setStep("cart")}
            >
              <FaShoppingCart style={{ marginRight: '6px' }} />
              Cart
            </a>
            
            <a 
              className="nav-link-modern" 
              href="#" 
              onClick={() => setStep("about")}
            >
              <FaInfoCircle style={{ marginRight: '6px' }} />
              About
            </a>

            {/* User Menu */}
            {prof && (
              <>
                <a 
                  className="nav-link-modern"
                  href="#"
                  onClick={() => setStep("settings")}
                >
                  <FaCog style={{ marginRight: '6px' }} />
                  Settings
                </a>
                {prof.admin && (
                  <a 
                    className="nav-link-modern" 
                    href="#" 
                    onClick={() => setStep("admin")}
                  >
                    <FaUserShield style={{ marginRight: '6px' }} />
                    Admin
                  </a>
                )}
                <a 
                  className="nav-link-modern text-danger" 
                  href="#" 
                  onClick={handleLogout}
                  title="Logout"
                >
                  <FaSignOutAlt style={{ marginLeft: '12px' }} />
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="btn btn-outline-modern d-md-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon">☰</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="d-md-none mt-3">
            <div className="d-flex flex-column gap-2">
              <a 
                className="nav-link-modern" 
                href="#" 
                onClick={() => { setStep("home"); setIsMenuOpen(false); }}
              >
                <FaHome style={{ marginRight: '6px' }} />
                Home
              </a>
              
              <a 
                className="nav-link-modern" 
                href="#" 
                onClick={() => { setStep("shop"); setIsMenuOpen(false); }}
              >
                <FaShoppingBag style={{ marginRight: '6px' }} />
                Shop
              </a>
              
              <a 
                className="nav-link-modern" 
                href="#" 
                onClick={() => { setStep("sell"); setIsMenuOpen(false); }}
              >
                <FaDollarSign style={{ marginRight: '6px' }} />
                Sell
              </a>
              
              <a 
                className="nav-link-modern" 
                href="#" 
                onClick={() => { setStep("cart"); setIsMenuOpen(false); }}
              >
                <FaShoppingCart style={{ marginRight: '6px' }} />
                Cart
              </a>
              
              <a 
                className="nav-link-modern" 
                href="#" 
                onClick={() => { setStep("about"); setIsMenuOpen(false); }}
              >
                <FaInfoCircle style={{ marginRight: '6px' }} />
                About
              </a>

              {prof && (
                <>
                  <a 
                    className="nav-link-modern" 
                    href="#" 
                    onClick={() => { setStep("settings"); setIsMenuOpen(false); }}
                  >
                    <FaCog style={{ marginRight: '6px' }} />
                    Settings
                  </a>
                  
                  {prof.admin && (
                    <a 
                      className="nav-link-modern" 
                      href="#" 
                      onClick={() => { setStep("admin"); setIsMenuOpen(false); }}
                    >
                      <FaUserShield style={{ marginRight: '6px' }} />
                      Admin Panel
                    </a>
                  )}
                  
                  <a 
                    className="nav-link-modern text-danger" 
                    href="#" 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  >
                    <FaSignOutAlt style={{ marginRight: '6px' }} />
                    Logout
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
