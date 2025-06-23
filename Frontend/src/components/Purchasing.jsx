import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Generic from "../assets/generic.jpg";
import { 
  FaStar, 
  FaShoppingCart, 
  FaDollarSign, 
  FaArrowLeft,
  FaCheckCircle,
  FaShieldAlt,
  FaTruck,
  FaTag,
  FaInfoCircle,
  FaWrench,
  FaComment
} from 'react-icons/fa';

const Purchasing = ({ setStep, setProf, prof, addItem }) => {
  const [mainImage, setMainImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' or 'reviews'

  useEffect(() => {
    if (addItem?.images?.length > 0) {
      setMainImage(addItem.images[0]);
    } else {
      setMainImage(Generic);
    }
  }, [addItem]);

  const addCartItem = async (item) => {
    try {
      const result = await fetch(`http://localhost:8080/additem/${prof.Email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (result.status === 200) {
        const data = await result.json();
        setProf(data);
        setSuccessMessage(`${item.title} has been added to your cart!`);
        setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
      } else {
        // Handle error
        console.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          style={{ 
            color: i <= Math.floor(rating) ? 'var(--accent-color)' : '#e5e7eb',
            fontSize: '1.2rem'
          }} 
        />
      );
    }
    return stars;
  };

  const isUserAdded = addItem.id <= 120 || addItem.id >= 137;

  return (
    <div className="app-container">
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#" onClick={(e) => { e.preventDefault(); setStep("home"); }}>Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" onClick={(e) => { e.preventDefault(); setStep("shop"); }}>Shop</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {addItem.title}
            </li>
          </ol>
        </nav>
        
        {successMessage && (
          <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
            <FaCheckCircle className="me-2" />
            {successMessage}
          </div>
        )}

        <div className="row">
          {/* Image Gallery */}
          <div className="col-lg-6 mb-4">
            <div className="card-modern">
              <div className="p-3">
                <img 
                  src={mainImage} 
                  alt={addItem.title} 
                  className="img-fluid rounded" 
                  style={{ 
                    height: '450px', 
                    width: '100%', 
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              
              {!isUserAdded && addItem.images && addItem.images.length > 1 && (
                <div className="d-flex justify-content-center p-2 gap-2">
                  {addItem.images.map((img, index) => (
                    <img 
                      key={index}
                      src={img}
                      alt={`${addItem.title} thumbnail ${index + 1}`}
                      className="img-thumbnail"
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: mainImage === img ? '2px solid var(--primary-color)' : '2px solid transparent',
                        transition: 'border 0.3s ease'
                      }}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="col-lg-6">
            <div className="ps-lg-4">
              <h2 className="mb-2">{addItem.title}</h2>
              <p className="text-muted mb-3">
                Brand: <span className="text-primary">{addItem.brand}</span>
              </p>

              {!isUserAdded && (
                <div className="d-flex align-items-center mb-3">
                  {renderStars(addItem.rating)}
                  <span className="ms-2 text-muted">({addItem.rating} based on {addItem.reviews.length} reviews)</span>
                </div>
              )}

              <div className="d-flex align-items-baseline mb-3">
                <h3 className="text-primary fw-bold me-3">
                  ${(addItem.price * (1 - (addItem.discountPercentage || 0) / 100)).toFixed(2)}
                </h3>
                {addItem.discountPercentage > 0 && (
                  <h5 className="text-muted text-decoration-line-through me-2">
                    ${addItem.price.toFixed(2)}
                  </h5>
                )}
                {addItem.discountPercentage > 0 && (
                  <span className="badge bg-danger fs-6">
                    {addItem.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <p className="mb-4">{addItem.description}</p>
              
              <div className="d-flex gap-2 mb-4">
                <button 
                  className="btn-modern flex-grow-1" 
                  onClick={() => addCartItem(addItem)}
                  disabled={addItem.stock <= 0}
                >
                  <FaShoppingCart style={{ marginRight: '8px' }} />
                  {addItem.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="btn-outline-modern flex-grow-1">
                  <FaDollarSign style={{ marginRight: '8px' }} />
                  Buy Now
                </button>
              </div>

              <div className="card-modern">
                <div className="p-3">
                  <div className="d-flex align-items-center mb-2">
                    <FaShieldAlt className="me-2 text-primary" />
                    <span>{isUserAdded ? 'User Listing' : addItem.warrantyInformation}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <FaTruck className="me-2 text-primary" />
                    <span>{isUserAdded ? 'Direct Shipping' : addItem.shippingInformation}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCheckCircle className="me-2 text-success" />
                    <span>{addItem.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info Tabs */}
        {!isUserAdded && (
          <div className="row mt-5">
            <div className="col-12">
              <div className="card-modern">
                <div className="p-4">
                  <h4 className="mb-4">More Information</h4>
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'specs' ? 'active' : ''}`}
                        onClick={() => setActiveTab('specs')}
                        type="button" 
                        role="tab"
                      >
                        <FaWrench style={{ marginRight: '8px' }} />
                        Specifications
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button 
                        className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                        onClick={() => setActiveTab('reviews')}
                        type="button" 
                        role="tab"
                      >
                        <FaComment style={{ marginRight: '8px' }} />
                        Reviews ({addItem.reviews.length})
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-4">
                    <div className={`tab-pane fade ${activeTab === 'specs' ? 'show active' : ''}`} role="tabpanel">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between"><strong>Availability</strong> {addItem.availabilityStatus}</li>
                        <li className="list-group-item d-flex justify-content-between"><strong>Return Policy</strong> {addItem.returnPolicy}</li>
                        <li className="list-group-item d-flex justify-content-between"><strong>SKU</strong> {addItem.sku}</li>
                      </ul>
                    </div>
                    <div className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`} role="tabpanel">
                      {addItem.reviews.map((review, index) => (
                        <div key={index} className={`p-3 ${index !== addItem.reviews.length - 1 ? 'border-bottom' : ''}`}>
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">{review.reviewerName}</h6>
                            <div className="d-flex align-items-center">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-muted small mb-1">{new Date(review.date).toLocaleDateString()}</p>
                          <p className="mb-0">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Back to Shop
            </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Purchasing;
