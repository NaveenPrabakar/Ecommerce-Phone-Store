import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';

const SignUpForm = ({ setStep, setSuccess }) => {
  const [profile, setprofile] = useState({
    Name: "",
    Email: "",
    password: "",
    admin: false,
    sell: [],
    mail: [],
    cart: []
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const fill = (e) => {
    const { name, value } = e.target;
    setprofile({ ...profile, [name]: value });
  };

  const submit = async () => {
    setError("");
    setLoading(true);

    if (profile.Name.length === 0) {
      setError("Please fill out your name");
      setLoading(false);
      return;
    } else if (profile.Email.length === 0) {
      setError("Please fill out your email");
      setLoading(false);
      return;
    } else if (profile.password.length === 0) {
      setError("Please enter a password");
      setLoading(false);
      return;
    }

    if (profile.Email.includes("admin")) {
      profile.admin = true;
    }

    try {
      const response = await fetch("${import.meta.env.VITE_API_URL}signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (response.status === 400) {
        setError("Email is already in use");
      } else if (response.status === 200) {
        setSuccess("Welcome to PhoneStore! Log in with your new account!");
        setStep("login");
      }
    } catch (e) {
      setError("Unable to signup at this time");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="form-modern">
              {/* Header */}
              <div className="text-center mb-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
                <h2 className="mb-2">Join PhoneStore</h2>
                <p className="text-muted">Create your account to get started</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <div className="me-2">⚠️</div>
                  {error}
                </div>
              )}

              {/* Signup Form */}
              <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <div className="position-relative">
                    <FaUser style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-light)'
                    }} />
                    <input
                      type="text"
                      id="name"
                      className="form-control-modern"
                      name="Name"
                      value={profile.Name}
                      onChange={fill}
                      placeholder="Enter your full name"
                      style={{ paddingLeft: '40px' }}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="position-relative">
                    <FaEnvelope style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-light)'
                    }} />
                    <input
                      type="email"
                      id="email"
                      className="form-control-modern"
                      name="Email"
                      value={profile.Email}
                      onChange={fill}
                      placeholder="Enter your email"
                      style={{ paddingLeft: '40px' }}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="position-relative">
                    <FaLock style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-light)'
                    }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control-modern"
                      name="password"
                      value={profile.password}
                      onChange={fill}
                      placeholder="Create a password"
                      style={{ paddingLeft: '40px', paddingRight: '40px' }}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                      style={{ border: 'none', color: 'var(--text-light)' }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-modern w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-primary"
                      onClick={() => setStep("login")}
                      style={{ textDecoration: 'none' }}
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
