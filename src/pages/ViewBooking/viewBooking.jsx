import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/isAuth/isAuth';
import Sidebar from '../../components/sidebar/SideBar';
import ViewBooking from '../../components/ViewBooking/viewBooking';
import {
  fetchUserBookingInfo,
  deleteBookingHandler,
} from '../../server/booking/booking';

const ViewBookingPage = () => {
  const { userId, userRole } = useAuth();
  const [viewBooking, setViewBooking] = useState(null);

  const [active, setActive] = useState('MyBookings');

  useEffect(() => {
    const fetchUserData = async () => {
      await fetchUserBookingInfo(userId, setViewBooking);
    };
    fetchUserData();
  }, [userId]);
  return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        <Sidebar active={active} setActive={setActive} userRole={userRole} />
        <main className="content">
          {viewBooking && (
            <ViewBooking
              viewBooking={viewBooking}
              userId={userId}
              deleteBookingHandler={deleteBookingHandler}
              setViewBooking={setViewBooking}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default ViewBookingPage;
