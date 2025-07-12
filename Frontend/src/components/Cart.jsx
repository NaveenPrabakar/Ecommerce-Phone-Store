import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FaTrash, FaShoppingCart, FaArrowLeft, FaCreditCard, FaTruck } from 'react-icons/fa';

const Cart = ({ setStep, setProf, prof }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}getcart/${prof.Email}`, {
        method: "GET",
      });

      if (result.status === 200) {
        setCart(await result.json());
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [prof]);

  let total = 0;
  for (let item of cart) {
    let discount = item.discountPercentage || 0;
    total += item.price * (1 - discount / 100);
  }

  const removeCartItem = async (item) => {
    try {
      const result = await fetch(
        `${import.meta.env.VITE_API_URL}removeitem/${prof.Email}/${item.id}`,
        {
          method: "DELETE",
        }
      );

      if (result.status === 200) {
        const data = await result.json();
        setProf(data);
        // Refresh cart after removal
        getCart();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

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

  if (cart.length === 0) {
    return (
      <div className="app-container">
        <NavBar setStep={setStep} setProf={setProf} prof={prof} />

        <div className="container py-5">
          <div className="text-center">
            <div style={{ fontSize: '4rem', opacity: 0.5, marginBottom: '2rem' }}>
              <FaShoppingCart />
            </div>
            <h2 className="mb-4">Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              className="btn-modern"
              onClick={() => setStep("shop")}
            >
              <FaArrowLeft style={{ marginRight: '8px' }} />
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="container py-5">
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="d-flex align-items-center mb-4">
              <FaShoppingCart style={{ fontSize: '1.5rem', marginRight: '12px', color: 'var(--primary-color)' }} />
              <h2 className="mb-0">Shopping Cart</h2>
              <span className="badge bg-primary ms-3">{cart.length} items</span>
            </div>

            <div className="card-modern mb-4">
              <div className="p-4">
                {cart.map((item, index) => (
                  <div key={item.id} className={`d-flex align-items-center p-3 ${index !== cart.length - 1 ? 'border-bottom' : ''}`}>
                    <div className="flex-shrink-0 me-3">
                      <img
                        src={item.thumbnail || item.images?.[0] || '/phone.svg'}
                        alt={item.title}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                    
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="text-muted mb-1">Brand: {item.brand}</p>
                      <div className="d-flex align-items-center">
                        <span className="text-primary fw-bold me-3">
                          ${(item.price * (1 - (item.discountPercentage || 0) / 100)).toFixed(2)}
                        </span>
                        {item.discountPercentage > 0 && (
                          <span className="text-muted text-decoration-line-through me-2">
                            ${item.price}
                          </span>
                        )}
                        {item.discountPercentage > 0 && (
                          <span className="badge bg-danger">
                            {item.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeCartItem(item)}
                      style={{ border: 'none' }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card-modern">
              <div className="p-4">
                <h5 className="mb-4">Order Summary</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total:</strong>
                  <strong className="text-primary">${(total * 1.08).toFixed(2)}</strong>
                </div>

                <button
                  className="btn-modern w-100 mb-3"
                  onClick={() => setStep("confirmation")}
                >
                  <FaCreditCard style={{ marginRight: '8px' }} />
                  Proceed to Checkout
                </button>

                <button
                  className="btn-outline-modern w-100"
                  onClick={() => setStep("shop")}
                >
                  <FaArrowLeft style={{ marginRight: '8px' }} />
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="card-modern mt-3">
              <div className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaTruck style={{ color: 'var(--primary-color)', marginRight: '8px' }} />
                  <h6 className="mb-0">Free Shipping</h6>
                </div>
                <p className="text-muted small mb-0">
                  Free standard shipping on orders over $50. 
                  Estimated delivery: 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
