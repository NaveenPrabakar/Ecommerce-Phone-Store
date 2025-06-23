import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, FaUser } from 'react-icons/fa';

const Login = ({ setStep, setSuccess, success, setProf }) => {
  const [user, setUser] = useState({
    Email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const filled = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const go = async () => {
    setSuccess("");
    setError("");
    setLoading(true);

    if (user.Email.length === 0) {
      setError("Please fill in Email.");
      setLoading(false);
      return;
    } else if (user.password.length === 0) {
      setError("Please fill in password.");
      setLoading(false);
      return;
    }

    try {
      const result = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (result.status === 400) {
        setError("Email does not exist");
      } else if (result.status === 401) {
        setError("Password is incorrect");
      } else if (result.status === 200) {
        const data = await result.json();
        setProf(data);
        console.log("Login successful", data);

        if (data.admin === true) {
          setStep("admin");
        } else {
          setStep("home");
        }
      } else {
        setError("Unknown error");
      }
    } catch (error) {
      setError("Network error. Please try again.");
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
                <h2 className="mb-2">Welcome to PhoneStore</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <div className="me-2">⚠️</div>
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <div className="me-2">✅</div>
                  {success}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={(e) => { e.preventDefault(); go(); }}>
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
                      value={user.Email}
                      onChange={filled}
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
                      value={user.password}
                      onChange={filled}
                      placeholder="Enter your password"
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
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-primary"
                      onClick={() => setStep("signup")}
                      style={{ textDecoration: 'none' }}
                    >
                      Sign up here
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

export default Login;
