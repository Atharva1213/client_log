import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleBookingSubmit } from '../../server/booking/booking';
import styles from './NewBookingForm.module.css';

const locations = [
  'Pune Station',
  'MG Road',
  'Kothrud',
  'Hadapsar',
  'Baner',
  'Aundh',
  'Viman Nagar',
  'Pimple Saudagar',
  'Kharadi',
  'Wakad',
  'Hinjewadi',
  'Shivaji Nagar',
  'Dhayari',
  'Kalyani Nagar',
  'Yerwada',
  'Sinhagad Road',
];

const vehicleTypes = ['Car', 'Auto', 'Bus', 'Taxi'];

const costEstimates = {
  Car: 50,
  Auto: 30,
  Bus: 20,
  Taxi: 40,
};

const NewBookingForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropOffLocation: '',
    date: '',
    time: '',
    vehicleType: '',
  });

  const [estimatedCost, setEstimatedCost] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (
      name === 'pickupLocation' ||
      name === 'dropOffLocation' ||
      name === 'vehicleType'
    ) {
      calculateEstimatedCost(
        formData.pickupLocation,
        formData.dropOffLocation,
        value
      );
    }
  };

  const clearData = () => {
    setFormData({
      pickupLocation: '',
      dropOffLocation: '',
      date: '',
      time: '',
      vehicleType: '',
    });
    setEstimatedCost(0);
  };
  const calculateEstimatedCost = (pickup, dropOff, vehicle) => {
    if (pickup && dropOff && vehicle) {
      const cost = costEstimates[vehicle] || 0;
      setEstimatedCost(cost);
    } else {
      setEstimatedCost(0);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({
      ...prevData,
      date: today,
    }));
    calculateEstimatedCost(
      formData.pickupLocation,
      formData.dropOffLocation,
      formData.vehicleType
    );
  }, [formData]);

  return (
    <form
      onSubmit={(e) => {
        handleBookingSubmit(e, formData, clearData, estimatedCost, userId);
      }}
      className={styles.newBookingForm}
    >
      <ToastContainer />
      <h3 className={styles.formHeader}>New Booking</h3>
      <div className={styles.formGroup}>
        <label>Pickup Location:</label>
        <select
          name="pickupLocation"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select pickup location
          </option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Drop-off Location:</label>
        <select
          name="dropOffLocation"
          value={formData.dropOffLocation}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select drop-off location
          </option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Time:</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          min={`${new Date().getHours() + 1 < 10 ? '0' : ''}${new Date().getHours() + 1}:00`}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Vehicle Type:</label>
        <select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select vehicle type
          </option>
          {vehicleTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.formGroup}>
        <h4>Estimated Cost: ₹{estimatedCost}</h4>
      </div>

      <div className={styles.formGroup}>
        <button type="submit" className={styles.submitButton}>
          Book Now
        </button>
      </div>
    </form>
  );
};

export default NewBookingForm;
