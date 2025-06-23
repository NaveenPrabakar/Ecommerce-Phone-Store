import React, { useState } from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FaStar, FaShippingFast, FaShieldAlt, FaHeadset, FaArrowRight, FaTimes } from 'react-icons/fa';

const Home = ({ setStep, setProf, prof, setId }) => {
  const preview = []; //only display three phones on the phone screen

  for (let i = 0; i < 6; i++) {
    //only view the preview of the shop
    preview.push(Phones[0].products[i]);
  }

  const [modalProduct, setModalProduct] = useState(null);

  const openModal = (product) => setModalProduct(product);
  const closeModal = () => setModalProduct(null);

  return (
    <div className="app-container">
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">Discover Amazing Phones</h1>
              <p className="hero-subtitle">
                Find the perfect smartphone for your lifestyle. From flagship models to budget-friendly options, 
                we have everything you need to stay connected.
              </p>
              <div className="d-flex gap-3">
                <button 
                  className="btn-modern"
                  onClick={() => setStep("shop")}
                >
                  Shop Now
                  <FaArrowRight style={{ marginLeft: '8px' }} />
                </button>
                <button 
                  className="btn-outline-modern"
                  onClick={() => setStep("sell")}
                >
                  Sell Your Phone
                </button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div style={{ fontSize: '8rem', opacity: 0.8 }}>📱</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="p-4">
                <FaShippingFast style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
                <h5>Free Shipping</h5>
                <p className="text-muted">Free shipping on all orders over $50</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="p-4">
                <FaShieldAlt style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
                <h5>Secure Payment</h5>
                <p className="text-muted">100% secure payment processing</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="p-4">
                <FaHeadset style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
                <h5>24/7 Support</h5>
                <p className="text-muted">Round the clock customer support</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="p-4">
                <FaStar style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
                <h5>Quality Guarantee</h5>
                <p className="text-muted">30-day money back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Featured Products</h2>
            <p className="text-muted">Discover our most popular smartphones</p>
          </div>
          
          <div className="product-grid">
            {preview.map((p) => (
              <div key={p.id} className="product-card product-card-hover">
                <div className="position-relative">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="product-image"
                  />
                  {p.discountPercentage && (
                    <div className="product-discount">
                      {p.discountPercentage}% OFF
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-title">{p.title}</h3>
                  <div className="product-price">${p.price}</div>
                  <div className="product-brand">{p.brand}</div>
                  <div className="d-flex gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        style={{ 
                          color: i < Math.floor(p.rating || 4) ? '#f59e0b' : '#e5e7eb',
                          fontSize: '0.9rem'
                        }} 
                      />
                    ))}
                    <span className="text-muted ms-2">({p.rating || 4})</span>
                  </div>
                  <button 
                    className="btn-modern w-100"
                    onClick={() => openModal(p)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Modal Preview */}
          {modalProduct && (
            <div className="modal-backdrop-custom" onClick={closeModal}>
              <div className="modal-custom" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={closeModal}><FaTimes /></button>
                <div className="row">
                  <div className="col-md-5 text-center mb-3 mb-md-0">
                    <img src={modalProduct.thumbnail} alt={modalProduct.title} className="img-fluid rounded" style={{maxHeight: '320px', objectFit: 'contain'}} />
                  </div>
                  <div className="col-md-7">
                    <h2 className="mb-2">{modalProduct.title}</h2>
                    <div className="mb-2 text-primary fw-bold" style={{fontSize: '1.5rem'}}>${modalProduct.price}</div>
                    <div className="mb-2">Brand: <span className="fw-semibold">{modalProduct.brand}</span></div>
                    <div className="mb-2">{[...Array(5)].map((_, i) => (
                      <FaStar key={i} style={{ color: i < Math.floor(modalProduct.rating || 4) ? '#f59e0b' : '#e5e7eb', fontSize: '1.1rem' }} />
                    ))} <span className="text-muted ms-2">({modalProduct.rating || 4})</span></div>
                    <div className="mb-3 text-muted">{modalProduct.description}</div>
                    <button 
                      className="btn-modern me-2"
                      onClick={() => {
                        setId(modalProduct.id);
                        setStep("rotate");
                        closeModal();
                      }}
                    >
                      Go to Full Details
                    </button>
                    <button className="btn-outline-modern" onClick={closeModal}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-5">
            <button 
              className="btn-outline-modern"
              onClick={() => setStep("shop")}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="mb-4">About PhoneStore</h2>
              <p className="lead mb-4">
                PhoneStore is your premier destination for buying and selling smartphones. 
                We offer a unique platform where users can both purchase the latest devices 
                and resell their phones directly to other buyers.
              </p>
              <p className="mb-4">
                Our expert admin team actively monitors all transactions to ensure a secure 
                and scam-free experience. Whether you're looking for the newest flagship 
                or want to sell your current device, we've got you covered.
              </p>
              <button 
                className="btn-modern"
                onClick={() => setStep("about")}
              >
                Learn More
              </button>
            </div>
            <div className="col-lg-6 text-center">
              <div style={{ fontSize: '6rem', opacity: 0.7 }}>🏪</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
