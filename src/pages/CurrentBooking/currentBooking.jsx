import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/isAuth/isAuth';
import Sidebar from '../../components/sidebar/SideBar';
import {
  gettingCurrentBooking,
  handleCompleteTour,
} from '../../server/booking/booking';
import CurrentBookingDiv from '../../components/CurrentBooking/currentBooking';

const CurrentBooking = () => {
  const { userId, userRole } = useAuth();
  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [active, setActive] = useState('CurrentBooking');

  useEffect(() => {
    const fetchUserData = async () => {
      await gettingCurrentBooking(
        userId,
        userRole,
        setCurrentBooking,
        setCurrentUser
      );
    };

    fetchUserData();
  }, [userId,userRole]);

  return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        <Sidebar active={active} setActive={setActive} userRole={userRole} />
        <main className="content">
          {currentBooking && currentUser ? (
            <CurrentBookingDiv
              booking={currentBooking}
              userId={userId}
              currentUser={currentUser}
              userRole={userRole}
              handleCompleteTour={handleCompleteTour}
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
              <h3>
                No Current Booking Is Found. Please Go To View Booking Page
              </h3>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default CurrentBooking;
