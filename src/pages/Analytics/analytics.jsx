import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../hooks/isAuth/isAuth';
import Sidebar from '../../components/sidebar/SideBar';
import { getAnalytics } from '../../server/admin/admin';
import AnalyticsDiv from '../../components/Analytics/analyticsDiv';

const Analytics = () => {
  const {userRole } = useAuth();
  const [active, setActive] = useState('Analytics');
  const [userCount, setUserCount] = useState(null);
  const [driverCount, setDriverCount] = useState(null);
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      await getAnalytics(setUserCount, setDriverCount, setBookings);
    };
    fetchUserData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        <Sidebar active={active} setActive={setActive} userRole={userRole} />
        <main className="content">
          {userCount && driverCount && bookings ? (
            <AnalyticsDiv
              userCount={userCount}
              bookings={bookings}
              driverCount={driverCount}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <b>Please wait for some time while we analyze the data.</b>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Analytics;
