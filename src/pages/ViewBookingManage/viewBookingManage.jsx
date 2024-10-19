import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/isAuth/isAuth';
import Sidebar from '../../components/sidebar/SideBar';
import ViewBooking from '../../components/ViewBooking/viewBooking';
import {
  handleGetAllBooking,
  handleUpdateBooking,
} from '../../server/admin/admin';

const ViewBookingPage = () => {
  const { userId, userRole } = useAuth();
  const [bookings, setAllBooking] = useState(null);

  const [active, setActive] = useState('ViewBookings');

  useEffect(() => {
    const fetchUserData = async () => {
      await handleGetAllBooking(setAllBooking);
    };
    fetchUserData();
  }, []);
  return (
    <div>
      <ToastContainer />
      <div className="dashboard-container">
        <Sidebar active={active} setActive={setActive} userRole={userRole} />
        <main className="content">
          {bookings && (
            <ViewBooking
              viewBooking={bookings}
              userId={userId}
              deleteBookingHandler={handleUpdateBooking}
              setViewBooking={setAllBooking}
              type="true"
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ViewBookingPage;
