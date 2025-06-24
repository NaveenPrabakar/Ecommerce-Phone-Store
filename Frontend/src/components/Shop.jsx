import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FaStar, FaSearch, FaFilter, FaSort, FaHeart } from 'react-icons/fa';
import Generic from "../assets/generic.jpg";

const Shop = ({ setStep, setProf, prof, setItem }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  const addItem = (item) => {
    setItem(item);
  };

  const getProducts = async () => {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}products`, {
        method: "GET",
      });

      if (result.status === 200) {
        let temp = await result.json();
        setProducts(temp);
        setFilteredProducts(temp);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [prof]);

  useEffect(() => {
    let filtered = [...products];
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Filter by brand
    if (selectedBrand !== "all") {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.title.localeCompare(b.title);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });
    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedBrand, sortBy]);

  const brands = [...new Set(products.map(p => p.brand))];

  if (loading) {
    return (
      <div className="app-container">
        <NavBar setStep={setStep} setProf={setProf} prof={prof} />
        <div className="container py-5">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      {/* Header */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="mb-3">Phone Shop</h1>
            <p className="text-muted">Discover the latest smartphones and find your perfect match</p>
          </div>

          {/* Search and Filters */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="position-relative">
                <FaSearch style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: 'var(--text-light)'
                }} />
                <input
                  type="text"
                  className="form-control-modern"
                  placeholder="Search phones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '40px' }}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <select
                className="form-control-modern"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="all">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <select
                className="form-control-modern"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-muted">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-5">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem', opacity: 0.5 }}>📱</div>
              <h3 className="mt-3">No products found</h3>
              <p className="text-muted">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="product-card">
                  <div className="position-relative">
                    <img
                      src={p.images && p.images[1] ? p.images[1] : Generic}
                      alt={p.title}
                      className="product-image"
                    />
                    {p.discountPercentage && (
                      <div className="product-discount">
                        {p.discountPercentage}% OFF
                      </div>
                    )}
                    <button 
                      className="btn btn-sm position-absolute top-0 end-0 m-2"
                      style={{ 
                        background: 'rgba(255,255,255,0.9)', 
                        border: 'none',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaHeart style={{ color: '#ef4444', fontSize: '0.8rem' }} />
                    </button>
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{p.title}</h3>
                    <div className="product-price">${p.price}</div>
                    <div className="product-brand">{p.brand}</div>
                    
                    {/* Rating */}
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

                    {/* Stock Status */}
                    <div className="mb-3">
                      <span className={`badge ${p.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                        {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <button
                      className="btn-modern w-100"
                      onClick={() => {
                        setStep("purchasing");
                        addItem(p);
                      }}
                      disabled={p.stock <= 0}
                    >
                      {p.stock > 0 ? 'View Details' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
