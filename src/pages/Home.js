// src/pages/Home.js

// General
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

// Assets
import logo from '../assets/logo/kastilyosabucal-logo.png'
import facebookIcon from '../assets/icons/facebook.png';
import instagramIcon from '../assets/icons/instagram.png';
import emailIcon from '../assets/icons/email.png';
import aboutImage from '../assets/img1.jpg';
import photo1 from '../assets/photo1.jpg';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';

// Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Home() {

  // Account Registration field state
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerMiddleName, setRegisterMiddleName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerContact, setRegisterContact] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Account Login field state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Photo Album Modal state
  const [showPhotoAlbumModal, setShowPhotoAlbumModal] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = [photo1, photo2, photo3];

  // Authentication Modal Tab state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // login tab / register tab
  const [loggedIn, setLoggedIn] = useState(false);

  // General
  const navigate = useNavigate();

  // Account Login Verification Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setShowAuthModal(false);
      setLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login Error: ", error.message);
      setLoginError("Incorrect email or password. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');

    // Validate required fields
    if (
      !registerFirstName.trim() ||
      !registerLastName.trim() ||
      !registerContact.trim() ||
      !registerEmail.trim() ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      setRegisterError('Please fill in all required fields.');
      return;
    }

    // Validate password and confirm password match
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }

    try {
      // Create user using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const newUser = userCredential.user;

      // Save additional user details to Firestore
      await setDoc(doc(db, 'user', newUser.uid), {
        firstName: registerFirstName,
        middleName: registerMiddleName, // optional field
        lastName: registerLastName,
        contact: registerContact,
        email: newUser.email,
        createdAt: new Date()
      });

      setShowAuthModal(false);
      setLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error("Registration Error: ", error.message);
      setRegisterError(error.message);
    }
  };

  // Page Section Navigation
  const handleNavigation = (e, targetPage) => {
    e.preventDefault();
    if (targetPage === 'photos') {
      setShowPhotoAlbumModal(true);
      setCurrentPhotoIndex(0);
    } else if (targetPage === 'home') {
      navigate('/');
    } else if (targetPage === 'about') {
      const aboutSection = document.getElementById('about-section');
      aboutSection && aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else if (targetPage === 'services') {
      const servicesSection = document.getElementById('services-section');
      servicesSection && servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else if (targetPage === 'contact') {
      const contactSection = document.getElementById('contact-section');
      contactSection && contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Photo Album Navigation Handler
  const handleNextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  return (
    <div>
      {/* Top Header: Company Name, Logo & Login/Register */}
      <div className="top-header">
        <div className="top-header-left">
          <img
            src={logo}
            alt="Kastilyo sa Bucal"
            className="company-logo"
          />
          <span className="company-name">Kastilyo sa Bucal</span>
        </div>
        <div className="top-header-right">
          <a
            href="#!"
            className="login-register"
            onClick={(e) => {
              e.preventDefault();
              setShowAuthModal(true);
              setAuthTab('login');
            }}
          >
            Login
          </a>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Social Icons on Left */}
          <div className="navbar-social">
            <a href="https://www.facebook.com/kastilyosabucal" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/kastilyosabucal/" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="mailto:photoapp@example.com">
              <img src={emailIcon} alt="Email" className="social-icon" />
            </a>
          </div>

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links on Right */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={(e) => handleNavigation(e, 'home')}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about-section" onClick={(e) => handleNavigation(e, 'about')}>
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services-section" onClick={(e) => handleNavigation(e, 'services')}>
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact-section" onClick={(e) => handleNavigation(e, 'contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="container hero-content">
          <h1>Kastilyo sa Bucal</h1>
          <p>
            Unleash your inner royalty at Kastilyo sa Bucal. Your photos will be as enchanting as the setting itself.
            Reserve your spot now!
          </p>
          <div className="button-group">
            <a
              href="#!"
              className="btn btn-primary"
              onClick={(e) => handleNavigation(e, 'photos')}
            >
              View Photo Album
            </a>
            <a
              href="#!"
              className="btn btn-outline"
              onClick={(e) => {
                e.preventDefault();
                setShowAuthModal(true);
                setAuthTab('login');
              }}
            >
              Book Reservation
            </a>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section className="about-section" id="about-section">
        <div className="container about-container">
          <div className="about-text">
            <h2>About Us</h2>
            <p className="about-tagline">Capturing Moments, Creating Memories.</p>
            <p className="about-description">
              The Kastilyo is an old-fashioned castle venue for photoshoots. Imagine the backdrop of your memories with
              authentic spots, rare antique items imported from other countries, and an old-world ambiance that will make
              you feel like royalty in your photos.
            </p>
          </div>
          <div className="about-image-container">
            <img src={aboutImage} alt="About Us" className="about-image" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services-section">
        <div className="container services-container">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Reservation</h3>
              <p className="service-description">
                Capture your special moments in our stunning venue. Our rental packages offer the perfect backdrop for your
                photoshoots and events, providing an elegant space to bring your creative vision to life.
              </p>
              <p className="price-range"><strong></strong> P3,600 - P10,000</p>
            </div>
            <div className="service-card">
              <h3>Day Tour</h3>
              <p className="service-description">
                Explore our historic venue with a guided day tour. Immerse yourself in the rich heritage and stunning views
                of our property.
              </p>
              <p className="price-range"><strong></strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact-section">
        <div className="container contact-container">
          <h2>Contact Us</h2>
          <p className="contact-tagline">Get in Touch</p>
          <div className="contact-details">
            <div className="contact-info">
              <p><strong>Email:</strong> info@kastilyosabucal.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Castle Road, Bucal, Country</p>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input type="text" id="contact-name" name="contact-name" className="form-control" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input type="email" id="contact-email" name="contact-email" className="form-control" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="contact-message" className="form-control" rows="4" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {showPhotoAlbumModal && (
        <div className="photo-modal-overlay">
          <div className="photo-modal-container">
            <button className="photo-modal-close" onClick={() => setShowPhotoAlbumModal(false)}>
              &times;
            </button>
            <div className="photo-modal-content">
              <button
                className="photo-modal-nav left"
                onClick={handlePrevPhoto}
                disabled={currentPhotoIndex === 0}
              >
                &#10094;
              </button>
              <img
                src={photos[currentPhotoIndex]}
                alt={`Photo ${currentPhotoIndex + 1}`}
                className="photo-modal-image"
              />
              <button
                className="photo-modal-nav right"
                onClick={handleNextPhoto}
                disabled={currentPhotoIndex === photos.length - 1}
              >
                &#10095;
              </button>
            </div>
            <div className="photo-modal-thumbnails">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
                  onClick={() => setCurrentPhotoIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}



      {/* Footer Section */}
      <footer className="footer-section">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Kastilyo sa Bucal. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modal (Login/Registration) */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-content auth-modal">
            <button className="modal-close" onClick={() => setShowAuthModal(false)}>
              &times;
            </button>
            <div className="auth-tabs">
              <button
                className={`auth-tab ${authTab === 'login' ? 'active' : ''}`}
                onClick={() => setAuthTab('login')}
              >
                Login
              </button>
              <button
                className={`auth-tab ${authTab === 'register' ? 'active' : ''}`}
                onClick={() => setAuthTab('register')}
              >
                Register
              </button>
            </div>
            <div className="auth-form-scroll">
              <div className="auth-form">
                {authTab === 'login' ? (
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <input
                        type="email"
                        id="login-email"
                        name="login-email"
                        className="form-control"
                        placeholder="Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        id="login-password"
                        name="login-password"
                        className="form-control"
                        placeholder="Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    {loginError && (
                      <p className="error-message" style={{ color: 'red' }}>
                        {loginError}
                      </p>
                    )}
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                    <p className="forgot-password">
                      <a href="/forgot-password">Forgot Password?</a>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegister}>
                    <div className="form-group">
                      <input
                        type="text"
                        id="register-firstname"
                        name="register-firstname"
                        className="form-control"
                        placeholder="First Name"
                        required
                        autoComplete="given-name"
                        value={registerFirstName}
                        onChange={(e) => setRegisterFirstName(e.target.value)}
                        onKeyPress={(e) => {
                          // Allow letters and spaces only
                          const regex = /^[A-Za-z\s]$/;
                          if (!regex.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="register-middlename"
                        name="register-middlename"
                        className="form-control"
                        placeholder="Middle Name"
                        autoComplete="additional-name"
                        value={registerMiddleName}
                        onChange={(e) => setRegisterMiddleName(e.target.value)}
                        onKeyPress={(e) => {
                          // Allow letters and spaces only
                          const regex = /^[A-Za-z\s]$/;
                          if (!regex.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="register-lastname"
                        name="register-lastname"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        autoComplete="family-name"
                        value={registerLastName}
                        onChange={(e) => setRegisterLastName(e.target.value)}
                        onKeyPress={(e) => {
                          // Allow letters and spaces only
                          const regex = /^[A-Za-z\s]$/;
                          if (!regex.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        id="register-contact"
                        name="register-contact"
                        className="form-control"
                        placeholder="Contact No."
                        required
                        autoComplete="tel"
                        value={registerContact}
                        onChange={(e) => setRegisterContact(e.target.value)}
                        onKeyPress={(e) => {
                          // Allow numbers only
                          const regex = /^[0-9]$/;
                          if (!regex.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        pattern="\d{10,15}"
                        title="Please enter a valid contact number (10-15 digits)."
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        id="register-email"
                        name="register-email"
                        className="form-control"
                        placeholder="Email"
                        required
                        autoComplete="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        id="register-password"
                        name="register-password"
                        className="form-control"
                        placeholder="Password"
                        required
                        autoComplete="new-password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        id="register-confirm-password"
                        name="register-confirm-password"
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                        autoComplete="new-password"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      />
                    </div>
                    {registerError && (
                      <p className="error-message" style={{ color: 'red' }}>
                        {registerError}
                      </p>
                    )}
                    <div className="form-group checkbox-group">
                      <input type="checkbox" id="terms" name="terms" required />
                      <label htmlFor="terms">
                        I have read & agree to&nbsp;
                        <a href="../Register_Terms&Condition.pdf" target="_blank" rel="noopener noreferrer">
                          Terms &amp; Conditions
                        </a>
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
