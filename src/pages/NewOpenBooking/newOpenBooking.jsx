import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/isAuth/isAuth';
import Sidebar from '../../components/sidebar/SideBar';
import { ShowErrorTaskMessage } from '../../utils/logMessge';
import {
  fetchUserAllPendingBookingInfo,
  updateBookingStatus,
} from '../../server/booking/booking';
import { checkProfileStatus } from '../../server/admin/admin';
import ViewNewOpenBooking from '../../components/NewOpenBooking/NewOpenBooking';

const ViewNewBookingPage = () => {
  const { userId, userRole } = useAuth();
  const [active, setActive] = useState('NewOpenBooking');
  const [bookings, setBookings] = useState(null);
  const [statusProfile, setStatusProfile] = useState(null);
  const [userActive, setUserActive] = useState(false);

  const handleBookingStatus = async () => {
    const currentBooking = localStorage.getItem('currentBooking');

    if (currentBooking) {
      setUserActive(true);
      ShowErrorTaskMessage(
        'You are currently in a live booking. You cannot take another booking at this time.'
      );
      setTimeout(() => {
        window.location.href = '/currentBooking';
      }, 2000);
    } else {
      await checkProfileStatus(userId, setStatusProfile);
      await fetchUserAllPendingBookingInfo(userId, setBookings);
    }
  };
  useEffect(() => {
    handleBookingStatus();
  }, [userActive]);

  return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        <Sidebar active={active} setActive={setActive} userRole={userRole} />
        <main className="content">
          {bookings && statusProfile ? (
            <ViewNewOpenBooking
              viewBooking={bookings}
              userId={userId}
              deleteBookingHandler={updateBookingStatus}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <h3>Please Update Your Profile Then You Will Get The Access</h3>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ViewNewBookingPage;
