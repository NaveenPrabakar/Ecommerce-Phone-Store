import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { FaUser, FaEnvelope, FaLock, FaTrash, FaEye, FaEyeSlash, FaBell, FaShieldAlt } from 'react-icons/fa';

const Settings = ({ setStep, setProf, prof }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
    name: prof.Name || '',
    email: prof.Email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.currentPassword) {
      setError("Please enter your current password to make changes.");
      return;
    }

    if (prof.password !== form.currentPassword) {
      setError("Incorrect current password.");
      return;
    }

    const originalEmail = prof.Email;
    const updatedProfile = { ...prof, Name: form.name, Email: form.email };

    try {
      const result = await fetch(`http://localhost:8080/change/${originalEmail}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      if (result.ok) {
        const data = await result.json();
        setProf(data);
        setSuccess("Profile updated successfully!");
        setForm({ ...form, currentPassword: '' });
      } else {
        setError("An error occurred while updating your profile.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (form.newPassword !== form.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    
    // Add password strength validation if desired
    
    setSuccess("Password updated successfully! (This is a mock-up)");
    setForm({ ...form, currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
      // Logic for account deletion
      console.log("Account deletion requested.");
      setStep('login');
    }
  };
  
  return (
    <div className="app-container">
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />
      <div className="container py-5">
        <h1 className="mb-4">Account Settings</h1>
        <div className="row">
          {/* Settings Navigation */}
          <div className="col-md-3">
            <div className="card-modern p-3">
              <ul className="nav flex-column settings-nav">
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('profile')}>
                    <FaUser className="me-2" /> Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'security' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('security')}>
                    <FaShieldAlt className="me-2" /> Security
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('notifications')}>
                    <FaBell className="me-2" /> Notifications
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Settings Content */}
          <div className="col-md-9">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {activeTab === 'profile' && (
              <div className="card-modern">
                <div className="card-body p-4">
                  <h4 className="mb-4">Profile Information</h4>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
                    </div>
                    <hr className="my-4" />
                    <div className="mb-3">
                      <label className="form-label">Current Password (to save changes)</label>
                      <input type="password" name="currentPassword" className="form-control" value={form.currentPassword} onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="btn-modern">Save Changes</button>
                  </form>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <>
                <div className="card-modern mb-4">
                  <div className="card-body p-4">
                    <h4 className="mb-4">Change Password</h4>
                    <form onSubmit={handlePasswordUpdate}>
                      <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input type="password" name="currentPassword" className="form-control" value={form.currentPassword} onChange={handleChange} required/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input type="password" name="newPassword" className="form-control" value={form.newPassword} onChange={handleChange} required/>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input type="password" name="confirmNewPassword" className="form-control" value={form.confirmNewPassword} onChange={handleChange} required/>
                      </div>
                      <button type="submit" className="btn-modern">Update Password</button>
                    </form>
                  </div>
                </div>

                <div className="card-modern danger-zone">
                  <div className="card-body p-4">
                    <h4 className="mb-3">Danger Zone</h4>
                    <p>Deleting your account is permanent and will remove all your data.</p>
                    <button className="btn btn-danger" onClick={handleDeleteAccount}>
                      <FaTrash className="me-2" /> Delete My Account
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'notifications' && (
              <div className="card-modern">
                <div className="card-body p-4">
                  <h4 className="mb-4">Notification Settings</h4>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="emailNotifications" defaultChecked />
                    <label className="form-check-label" htmlFor="emailNotifications">Email notifications for new listings</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="promoEmails" />
                    <label className="form-check-label" htmlFor="promoEmails">Promotional emails from PhoneStore</label>
                  </div>
                  <button className="btn-modern">Save Preferences</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
