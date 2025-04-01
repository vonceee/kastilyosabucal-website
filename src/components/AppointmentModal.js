// src/components/AppointmentModal.js
import React, { useState } from 'react';

// Assets
import { FaClock, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import GCASH_QR from '../assets/qr/sample-qr.png';
import BPI_QR from '../assets/qr/sample-qr1.png';
import successGif from '../assets/gif/success.gif';

import '../styles/AppointmentModal.css';

// Database
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

function AppointmentModal({ onClose, onNext }) {
  // Step state and form data
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  // Payment states (Step 3)
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  // Error message state
  const [errorMessage, setErrorMessage] = useState('');
  // Confirmation message state
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [bookingId, setBookingId] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);

  // Compute minimum booking date (one week from today)
  const today = new Date();
  const minBookingDate = new Date(today);
  minBookingDate.setDate(today.getDate() + 7);
  const minBookingDateStr = minBookingDate.toISOString().split("T")[0];

  // Time Slots based on selected package
  let timeSlots = [];
  if (selectedPackage === 'basic') {
    timeSlots = [
      "7:00 AM - 9:00 AM",
      "9:00 AM - 11:00 AM",
      "1:00 PM - 3:00 PM",
      "3:00 PM - 5:00 PM"
    ];
  } else if (selectedPackage === 'standard1') {
    timeSlots = [
      "7:00 AM - 11:00 AM",
      "1:00 PM - 5:00 PM"
    ];
  } else if (selectedPackage === 'standard2') {
    timeSlots = [
      "7:00 AM - 12:00 PM",
      "12:00 PM - 5:00 PM"
    ];
  } else if (selectedPackage === 'special') {
    timeSlots = ["8:00 AM - 5:00 PM"];
  }

  // Down Payment Computation (50%)
  let packagePrice = 0;
  if (selectedPackage === 'basic') {
    packagePrice = 3600;
  } else if (selectedPackage === 'standard1') {
    packagePrice = 7000;
  } else if (selectedPackage === 'standard2') {
    packagePrice = 8000;
  } else if (selectedPackage === 'special') {
    packagePrice = 10000;
  }
  const downPayment = packagePrice * 0.5;

  const handleNext = async (e) => {
    e.preventDefault();
    // Clear any previous error
    setErrorMessage('');

    if (currentStep === 1) {
      if (!selectedPackage) {
        setErrorMessage("Please select a package.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!appointmentDate || !selectedTimeSlot) {
        setErrorMessage("Please select a date and a time slot.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!paymentMethod) {
        setErrorMessage("Please select a payment method.");
        return;
      }
      if (!referenceNumber.trim()) {
        setErrorMessage("Please enter your payment reference number.");
        return;
      }
      if (!paymentScreenshot) {
        setErrorMessage("Please upload your payment screenshot.");
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Set processing state to true to show loading in the button.
      setIsProcessing(true);
      const details = {
        package: selectedPackage,
        date: appointmentDate,
        timeSlot: selectedTimeSlot,
        paymentMethod,
        referenceNumber,
      };
      try {
        // paymentScreenshot is the file from the input
        const docRef = await handleConfirmBooking(details, paymentScreenshot);
        console.log("Booking confirmed with ID:", docRef.id);
        // Set confirmation title and booking ID separately
        setConfirmationMessage("Booking Successful!");
        setBookingId(docRef.id);
      } catch (error) {
        // Handle error if needed
      } finally {
        setIsProcessing(false);
      }
    }
  };

  async function uploadFile(file) {
    try {
      // Create a storage reference (you can adjust the folder structure as needed)
      const storageRef = ref(storage, `bookings/${file.name}`);
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

  const handleConfirmBooking = async (details, file) => {
    try {
      const imageURL = await uploadFile(file);
      const bookingData = {
        ...details,
        paymentScreenshotURL: imageURL,
        createdAt: new Date(),
      };
      // Save the booking data to Firestore (in a collection called 'bookings')
      const docRef = await addDoc(collection(db, 'bookings'), bookingData);
      console.log("Booking stored with ID:", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error storing booking:", error);
      setErrorMessage("There was an error processing your booking. Please try again.");
      throw error;
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  if (confirmationMessage) {
    return (
      <div className="modal-overlay">
        <div className="modal-content appointment-modal">
          <button className="modal-close" onClick={onClose}>&times;</button>
          <div className="confirmation-message">
            <img src={successGif} alt="Booking Successful" className="success-gif" />
            <h2>{confirmationMessage}</h2>
            <p>Booking ID: {bookingId}</p>
            <p>Thank you for booking with Kastilyo sa Bucal. We look forward to serving you!</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content appointment-modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <div className="header-left">
            <h2>Book Reservation</h2>
          </div>
          <div className="header-center">
            <div className="progress-indicator">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>{step}</div>
              ))}
            </div>
          </div>
          <div className="header-right">
            <p className="step-text">
              {currentStep === 1 && 'Step 1 of 4: Choose a Package'}
              {currentStep === 2 && 'Step 2 of 4: Select Date & Time'}
              {currentStep === 3 && 'Step 3 of 4: Payment Process'}
              {currentStep === 4 && 'Step 4 of 4: Confirm Booking'}
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleNext}>
          {currentStep === 1 && (
            <>
              <div className="card-group">
                <div className={`package-card ${selectedPackage === 'basic' ? 'selected' : ''}`}
                  onClick={() => setSelectedPackage('basic')}
                >
                  <div className="price-tag">P3600</div>
                  <h3>Basic</h3>
                  <div className="package-details">
                    <span className="icon"><FaUsers /></span>
                    <span>5 PAX</span>
                  </div>
                  <div className="package-details">
                    <span className="icon"><FaClock /></span>
                    <span>2 Hours</span>
                  </div>
                </div>
                <div className={`package-card ${selectedPackage === 'standard1' ? 'selected' : ''}`}
                  onClick={() => setSelectedPackage('standard1')}
                >
                  <div className="price-tag">P7000</div>
                  <h3>Standard 1</h3>
                  <div className="package-details">
                    <span className="icon"><FaUsers /></span>
                    <span>10 PAX</span>
                  </div>
                  <div className="package-details">
                    <span className="icon"><FaClock /></span>
                    <span>4 Hours</span>
                  </div>
                </div>
                <div className={`package-card ${selectedPackage === 'standard2' ? 'selected' : ''}`}
                  onClick={() => setSelectedPackage('standard2')}
                >
                  <div className="price-tag">P8000</div>
                  <h3>Standard 2</h3>
                  <div className="package-details">
                    <span className="icon"><FaUsers /></span>
                    <span>10 PAX</span>
                  </div>
                  <div className="package-details">
                    <span className="icon"><FaClock /></span>
                    <span>5 Hours</span>
                  </div>
                </div>
              </div>
              <div className="special-addon-row">
                <div className={`package-card ${selectedPackage === 'special' ? 'selected' : ''}`}
                  onClick={() => setSelectedPackage('special')}
                >
                  <div className="price-tag">P10,000</div>
                  <h3>Special</h3>
                  <div className="package-details">
                    <span className="icon"><FaUsers /></span>
                    <span>10 PAX</span>
                  </div>
                  <div className="package-details">
                    <span className="icon"><FaClock /></span>
                    <span>9 Hours</span>
                  </div>
                </div>
                <div className="addon-card">
                  <h4>Add-On Options</h4>
                  <div className="addon-details">
                    <p><strong>Extension Hours:</strong> P1800 per hour</p>
                    <p><strong>Additional Pax:</strong> P200 per head</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="appointment-date">Date</label>
                <input
                  type="date"
                  id="appointment-date"
                  name="appointment-date"
                  required
                  min={minBookingDateStr}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                />
                <small className="date-hint">Bookings must be at least one week in advance.</small>
              </div>
              <div className="time-slots">
                <p>Select a time slot:</p>
                {timeSlots.map((slot, index) => (
                  <label key={index} className="time-slot-option">
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot}
                      checked={selectedTimeSlot === slot}
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                      required
                    />
                    {slot}
                  </label>
                ))}
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="payment-section">
                <p className="payment-info">
                  Down Payment: <strong>P{downPayment.toFixed(2)}</strong>
                </p>
                <div className="payment-details">
                  <div className="payment-left">
                    <div className="form-group">
                      <label htmlFor="payment-method">Payment Method</label>
                      <select
                        id="payment-method"
                        name="payment-method"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                      >
                        <option value="">Select Payment Method</option>
                        <option value="GCASH">GCASH</option>
                        <option value="BPI">BPI</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="reference-number">Reference Number</label>
                      <input
                        type="text"
                        id="reference-number"
                        name="reference-number"
                        value={referenceNumber}
                        onChange={(e) => setReferenceNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="payment-screenshot">Upload Payment Screenshot</label>
                      <input
                        type="file"
                        id="payment-screenshot"
                        name="payment-screenshot"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                      />
                    </div>
                  </div>
                  {paymentMethod && (
                    <div className="payment-right">
                      <p className="qr-instruction">
                        Scan the QR code to pay via {paymentMethod}:
                      </p>
                      <div className="qr-code-box">
                        {paymentMethod === 'GCASH' ? (
                          <img src={GCASH_QR} alt="GCASH QR Code" className="qr-code" />
                        ) : (
                          <img src={BPI_QR} alt="BPI QR Code" className="qr-code" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="confirmation-card">
                <h3>Review Your Booking</h3>
                <p>
                  <strong>Package:</strong> {selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)}
                </p>
                <p>
                  <strong>Date:</strong> {appointmentDate}
                </p>
                <p>
                  <strong>Time Slot:</strong> {selectedTimeSlot}
                </p>
                <p>
                  <strong>Payment Method:</strong> {paymentMethod}
                </p>
                <p>
                  <strong>Down Payment:</strong> P{downPayment.toFixed(2)}
                </p>
                <p>
                  <strong>Reference Number:</strong> {referenceNumber}
                </p>
              </div>
            </>
          )}

          <div className="modal-buttons">
            <button className="btn btn-secondary" onClick={handleBack} disabled={currentStep === 1 || isProcessing}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={isProcessing}>
              {currentStep === 4
                ? (isProcessing ? 'Processing...' : 'Confirm Booking')
                : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal;
