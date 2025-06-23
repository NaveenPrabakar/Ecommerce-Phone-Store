import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FaCheckCircle, FaShoppingCart, FaHome, FaFileInvoiceDollar } from 'react-icons/fa';

const Confirmation = ({ setStep, setProf, prof }) => {
  const [cart, setCart] = useState([]);
  const [orderNumber, setOrderNumber] = useState('');

  const getCart = async () => {
    try {
      const result = await fetch(`http://localhost:8080/getcart/${prof.Email}`, {
        method: "GET",
      });

      if (result.status === 200) {
        setCart(await result.json());
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeAll = async () => {
    try {
      await fetch(`http://localhost:8080/removeall/${prof.Email}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  useEffect(() => {
    // Fetch the cart contents to display one last time
    getCart();
    
    // Generate a random order number for display
    setOrderNumber(`PS-${Math.floor(Math.random() * 100000000)}`);

    // Clear the cart in the background after displaying it
    return () => {
      removeAll();
    };
  }, []);

  const calculateTotal = () => {
    let total = 0;
    for (let item of cart) {
      let discount = item.discountPercentage || 0;
      total += item.price * (1 - discount / 100);
    }
    return total;
  };
  
  const total = calculateTotal();

  return (
    <div className="app-container">
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card-modern text-center p-4 p-md-5">
              <div style={{ fontSize: '5rem', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                <FaCheckCircle />
              </div>

              <h1 className="mb-3">Thank You for Your Order!</h1>
              <p className="lead text-muted mb-4">
                Your purchase was successful. An email confirmation has been sent to {prof.Email}.
              </p>

              <div className="card-modern mb-4">
                <div className="p-4 text-start">
                  <h5 className="mb-3 d-flex align-items-center">
                    <FaFileInvoiceDollar className="me-2" />
                    Order Summary
                  </h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Order Number:</span>
                      <strong>{orderNumber}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Order Date:</span>
                      <strong>{new Date().toLocaleDateString()}</strong>
                    </li>
                    <li className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Items ({cart.length}):</span>
                        <strong>${total.toFixed(2)}</strong>
                      </div>
                      <ul className="list-unstyled mt-2 mb-0 ps-3">
                        {cart.map(item => (
                          <li key={item.id} className="text-muted small">
                            - {item.title}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Taxes (8%):</span>
                      <strong>${(total * 0.08).toFixed(2)}</strong>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center fs-5">
                      <strong>Total:</strong>
                      <strong className="text-primary">${(total * 1.08).toFixed(2)}</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-muted mb-4">
                Your order will be shipped within 3-5 business days. You can track your order status from your account page once it has shipped.
              </p>

              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn-modern"
                  onClick={() => setStep("shop")}
                >
                  <FaShoppingCart className="me-2" />
                  Continue Shopping
                </button>
                <button
                  className="btn-outline-modern"
                  onClick={() => setStep("home")}
                >
                  <FaHome className="me-2" />
                  Go to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
