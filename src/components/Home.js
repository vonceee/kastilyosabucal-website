// src/components/Home.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

import facebookIcon from '../assets/icons/facebook.png';
import instagramIcon from '../assets/icons/instagram.png';
import emailIcon from '../assets/icons/email.png';
import aboutImage from '../assets/img1.jpg';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    appointmentType: '',
    name: '',
    email: '',
    date: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data: ", appointmentForm);
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setShowForm(false);
      setAppointmentForm({
        appointmentType: '',
        name: '',
        email: '',
        date: '',
        message: ''
      });
    }, 2000);
  };

  // Handle navigation via <a> tag clicks
  const handleNavigation = (e, targetPage) => {
    e.preventDefault();
    if (targetPage === 'appointment') {
      setShowModal(true);
    }
  };

  // Handle appointment type selection
  const handleTypeSelection = (type) => {
    setAppointmentForm((prev) => ({ ...prev, appointmentType: type }));
    setShowForm(true);
  };

  return (
    <div>
      {/* Top Header: Company Name & Login/Register */}
      <div className="top-header">
        <div className="top-header-left">
          <span className="company-name">Kastilyo sa Bucal</span>
        </div>
        <div className="top-header-right">
          <a href="/login" className="login-register">
            Login / Register
          </a>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Social Icons on Left */}
          <div className="navbar-social">
            <a href="https://www.facebook.com/YourFacebookPage" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://www.instagram.com/YourInstagramPage" target="_blank" rel="noopener noreferrer">
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
              href="/photos"
              className="btn btn-primary"
              onClick={(e) => handleNavigation(e, 'photos')}
            >
              View Photo Album
            </a>
            <a
              href="/appointment"
              className="btn btn-outline"
              onClick={(e) => handleNavigation(e, 'appointment')}
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
          <h2>Our Services</h2>
          <p className="services-tagline">What We Offer</p>
          <div className="services-cards">
            <div className="service-card">
              <h3>Photoshoot</h3>
              <p>Professional photoshoots with creative direction.</p>
            </div>
            <div className="service-card">
              <h3>Day Tours</h3>
              <p>Guided tours of our majestic castle venue.</p>
            </div>
            <div className="service-card">
              <h3>Event Hosting</h3>
              <p>Host memorable events in our stunning surroundings.</p>
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

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content modal-flare">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            {submitted ? (
              <div className="modal-message">
                <h2>Appointment Booked!</h2>
                <p>Thank you, {appointmentForm.name}.</p>
              </div>
            ) : (
              <div>
                <h2>Book an Appointment</h2>
                {!showForm ? (
                  <div className="mb-3 appointment-type">
                    <label className="appointment-type-label">Select Appointment Type</label>
                    <div className="appointment-options">
                      <button
                        className="appointment-btn"
                        onClick={() => handleTypeSelection("Day Tour")}
                      >
                        Day Tour
                        <p className="option-description">
                          Enjoy a guided tour of our castle venue with exclusive package details.
                        </p>
                      </button>
                      <button
                        className="appointment-btn"
                        onClick={() => handleTypeSelection("Photoshoot")}
                      >
                        Photoshoot
                        <p className="option-description">
                          Get a professional photoshoot session with creative direction.
                        </p>
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      className="back-button"
                      onClick={() => {
                        setShowForm(false);
                        setAppointmentForm((prev) => ({ ...prev, appointmentType: '' }));
                      }}
                    >
                      &larr; Back
                    </button>
                    <p>
                      <strong>Selected: {appointmentForm.appointmentType}</strong>
                    </p>
                    <form onSubmit={handleFormSubmit}>
                      <div className="mb-3">
                        <label htmlFor="modal-name">Name</label>
                        <input
                          type="text"
                          id="modal-name"
                          name="name"
                          className="form-control"
                          value={appointmentForm.name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="modal-email">Email</label>
                        <input
                          type="email"
                          id="modal-email"
                          name="email"
                          className="form-control"
                          value={appointmentForm.email}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="modal-date">Preferred Date</label>
                        <input
                          type="date"
                          id="modal-date"
                          name="date"
                          className="form-control"
                          value={appointmentForm.date}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="modal-message">Message (Optional)</label>
                        <textarea
                          id="modal-message"
                          name="message"
                          className="form-control"
                          rows="3"
                          value={appointmentForm.message}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Appointment
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
