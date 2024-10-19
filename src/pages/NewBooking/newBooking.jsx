import { ToastContainer } from 'react-toastify';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/isAuth/isAuth';
import Sidebar from '../../components/sidebar/SideBar';
import NewBookingForm from '../../components/NewBookingForm/NewBookingForm';

const NewBooking = () => {
  const { userId, userRole } = useAuth();

  const [active, setActive] = useState('NewBooking');

  return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        <Sidebar active={active} setActive={setActive} userRole={userRole} />
        <main className="content">
          <NewBookingForm userId={userId} />
        </main>
      </div>
    </>
  );
};

export default NewBooking;
