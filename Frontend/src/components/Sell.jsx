import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { 
  FaPhone, 
  FaDollarSign, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaUpload,
  FaTag,
  FaInfoCircle,
  FaShieldAlt,
  FaClock,
  FaStar
} from 'react-icons/fa';

const Sell = ({ setStep, setProf, prof, setId }) => {
  const [form, setform] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    email: prof.Email,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sell'); // 'sell' or 'my-listings'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  function get_sold() {
    fetch(`${import.meta.env.VITE_API_URL}sold/${prof.Email}`)
      .then((response) => response.json())
      .then((data) => {
        setSoldItems(data);
      })
      .catch((error) => {
        console.error("Error fetching sold items:", error);
      });
  }

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}done/${id}/${prof.Email}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if(result.status === 200){
          const data = await result.json();
          setProf(data);
          get_sold();
          setSuccess("Listing deleted successfully!");
          setTimeout(() => setSuccess(""), 3000);
        } else {
          setError("Failed to delete listing. Please try again.");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    get_sold();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (form.title.length === 0) {
      setError("Please fill out the title");
      setLoading(false);
      return;
    } else if (form.description.length === 0) {
      setError("Please fill out the description.");
      setLoading(false);
      return;
    } else if (form.price.length === 0) {
      setError("Please fill out the price.");
      setLoading(false);
      return;
    } else if (form.brand.length === 0) {
      setError("Please fill out the brand.");
      setLoading(false);
      return;
    }

    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (result.status === 200) {
        setSuccess("Your phone has been successfully listed for sale!");
        const data = await result.json();
        setProf(data);
        get_sold();
        
        // Reset form
        setform({
          title: "",
          description: "",
          price: "",
          brand: "",
          email: prof.Email,
        });
        
        setTimeout(() => setSuccess(""), 5000);
      } else if (result.status === 500) {
        setError("Something went wrong! Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="text-center">
            <h1 className="hero-title">Sell Your Phone</h1>
            <p className="hero-subtitle">
              Turn your old phone into cash! List your device and reach thousands of potential buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-5">
        {/* Tab Navigation */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn ${activeTab === 'sell' ? 'btn-modern' : 'btn-outline-modern'}`}
                  onClick={() => setActiveTab('sell')}
                >
                  <FaPlus style={{ marginRight: '8px' }} />
                  List New Phone
                </button>
                <button
                  type="button"
                  className={`btn ${activeTab === 'my-listings' ? 'btn-modern' : 'btn-outline-modern'}`}
                  onClick={() => setActiveTab('my-listings')}
                >
                  <FaPhone style={{ marginRight: '8px' }} />
                  My Listings ({soldItems.length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
            <FaExclamationTriangle className="me-2" />
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
            <FaCheckCircle className="me-2" />
            {success}
          </div>
        )}

        {/* Sell Form Tab */}
        {activeTab === 'sell' && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="form-modern">
                <div className="text-center mb-4">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                  <h2 className="mb-2">List Your Phone</h2>
                  <p className="text-muted">Fill out the details below to list your phone for sale</p>
                </div>

                <form onSubmit={submit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="title" className="form-label">
                        <FaPhone style={{ marginRight: '8px', color: 'var(--primary-color)' }} />
                        Phone Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="form-control-modern w-100"
                        name="title"
                        placeholder="e.g., iPhone 13 Pro Max 256GB"
                        value={form.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="brand" className="form-label">
                        <FaTag style={{ marginRight: '8px', color: 'var(--primary-color)' }} />
                        Brand
                      </label>
                      <select
                        id="brand"
                        className="form-control-modern w-100"
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Google">Google</option>
                        <option value="OnePlus">OnePlus</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Huawei">Huawei</option>
                        <option value="Sony">Sony</option>
                        <option value="LG">LG</option>
                        <option value="Motorola">Motorola</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor="price" className="form-label">
                      <FaDollarSign style={{ marginRight: '8px', color: 'var(--primary-color)' }} />
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="form-control-modern w-100"
                      name="price"
                      placeholder="Enter price in USD"
                      value={form.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <label htmlFor="description" className="form-label">
                      <FaInfoCircle style={{ marginRight: '8px', color: 'var(--primary-color)' }} />
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="form-control-modern w-100"
                      name="description"
                      rows="4"
                      placeholder="Describe your phone's condition, features, and any included accessories..."
                      value={form.description}
                      onChange={handleChange}
                      required
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>

                  <div className="mt-5">
                    <button
                      type="submit"
                      className="btn-modern w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="d-flex align-items-center justify-content-center">
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Listing Your Phone...
                        </div>
                      ) : (
                        <>
                          <FaUpload style={{ marginRight: '8px' }} />
                          List Phone for Sale
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Benefits Section */}
                <div className="mt-5 pt-4 border-top">
                  <h5 className="mb-3">Why Sell with PhoneStore?</h5>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <FaShieldAlt style={{ color: 'var(--primary-color)', marginRight: '12px', flexShrink: 0 }} />
                        <div>
                          <h6 className="mb-1">Secure Transactions</h6>
                          <small className="text-muted">Safe payment processing</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <FaClock style={{ color: 'var(--primary-color)', marginRight: '12px', flexShrink: 0 }} />
                        <div>
                          <h6 className="mb-1">Quick Listing</h6>
                          <small className="text-muted">List in minutes</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex align-items-center">
                        <FaStar style={{ color: 'var(--primary-color)', marginRight: '12px', flexShrink: 0 }} />
                        <div>
                          <h6 className="mb-1">Wide Reach</h6>
                          <small className="text-muted">Thousands of buyers</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Listings Tab */}
        {activeTab === 'my-listings' && (
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">My Active Listings</h3>
                <span className="badge bg-primary fs-6">{soldItems.length} items</span>
              </div>

              {soldItems.length === 0 ? (
                <div className="card-modern">
                  <div className="p-5 text-center">
                    <div style={{ fontSize: '4rem', opacity: 0.5, marginBottom: '2rem' }}>
                      <FaPhone />
                    </div>
                    <h4 className="mb-3">No Listings Yet</h4>
                    <p className="text-muted mb-4">
                      You haven't listed any phones for sale yet. Start by creating your first listing!
                    </p>
                    <button
                      className="btn-modern"
                      onClick={() => setActiveTab('sell')}
                    >
                      <FaPlus style={{ marginRight: '8px' }} />
                      List Your First Phone
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card-modern">
                  <ul className="list-group list-group-flush">
                    {soldItems.map((item) => (
                      <li key={item.id} className="list-group-item p-3">
                        <div className="row align-items-center">
                          <div className="col-md-5 d-flex align-items-center mb-2 mb-md-0">
                            <FaPhone className="me-3 text-primary" style={{ fontSize: '1.5rem' }}/>
                            <div>
                              <h6 className="mb-0">{item.title}</h6>
                              <small className="text-muted">{item.brand}</small>
                            </div>
                          </div>
                          <div className="col-6 col-md-2 text-md-center">
                            <strong className="d-md-none">Price: </strong>
                            <span>${item.price}</span>
                          </div>
                          <div className="col-6 col-md-2 text-md-center">
                            <span className="badge bg-success">Active</span>
                          </div>
                          <div className="col-12 col-md-3 text-md-end mt-2 mt-md-0">
                            <div className="d-flex gap-2 justify-content-md-end">
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => { setId(item.id); setStep("edit"); }}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleDelete(item.id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Sell;
