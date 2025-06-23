import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-modern">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <h5 className="mb-3">PhoneStore</h5>
                        <p className="text-muted">
                            Your premier destination for buying and selling smartphones. 
                            We offer the latest devices with secure transactions and 
                            excellent customer support.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                                <FaFacebook />
                            </a>
                            <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-white" style={{ fontSize: '1.5rem' }}>
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                    
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="mb-3">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">Home</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">Shop</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">Sell</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">About</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="mb-3">Support</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">Help Center</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">Contact Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">Returns</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">Shipping Info</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="col-lg-4 mb-4">
                        <h6 className="mb-3">Contact Information</h6>
                        <div className="d-flex align-items-center mb-2">
                            <FaPhone className="me-2" />
                            <span className="text-muted">+1 (555) 123-4567</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <FaEnvelope className="me-2" />
                            <span className="text-muted">info@phonestore.com</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <FaMapMarkerAlt className="me-2" />
                            <span className="text-muted">123 Tech Street, Digital City, DC 12345</span>
                        </div>
                    </div>
                </div>
                
                <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="text-muted mb-0">
                            © 2024 PhoneStore. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p className="text-muted mb-0">
                            Prepared by{" "}
                            <span className="text-white">Naveen Prabakar & Mucu Milo</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;