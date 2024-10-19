import React from 'react';
import styles from './analytics.module.css';
import { BarChartJS } from '../ChartsJS/BarChart';
import { PieChartJS } from '../ChartsJS/PieChart';

export default function analyticsDiv({ userCount, driverCount, bookings }) {
  const getLast7Days = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();
  };

  const labels = getLast7Days();

  const aggregateBookingsByDay = () => {
    const bookingsCount = {};
    labels.forEach((date) => {
      bookingsCount[date] = 0;
    });

    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split('T')[0];
      if (bookingsCount[bookingDate] !== undefined) {
        bookingsCount[bookingDate]++;
      }
    });

    return labels.map((date) => bookingsCount[date]);
  };

  const barData = {
    labels,
    datasets: [
      {
        label: 'Number of Bookings',
        data: aggregateBookingsByDay(),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Users', 'Drivers'],
    datasets: [
      {
        label: 'User vs Driver Count',
        data: [userCount, driverCount],
        backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 159, 64, 0.7)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          height: '10vh',
          marginBottom: '5vh',
        }}
      >
        <h3 style={{ fontSize: '3vh' }}>My Anatytics</h3>
      </div>
      <div className={styles.analyticsContainer}>
        <div className={styles.chartWrapper}>
          <p className={styles.chartTitle}>User and Driver Distribution</p>
          <PieChartJS chartData={pieData} />
        </div>
        <div className={styles.chartWrapper}>
          <p className={styles.chartTitle}>Bookings in the Last 7 Days</p>
          <BarChartJS
            chartData={barData}
            max={Math.max(...aggregateBookingsByDay()) + 5}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <div className={styles.chartWrapper} style={{ height: '3vh' }}>
          <p className={styles.chartTitle}>
            Total No of Whole User : <b> {userCount + driverCount} </b>
          </p>
        </div>
        <div className={styles.chartWrapper} style={{ height: '3vh' }}>
          <p className={styles.chartTitle}>
            Total No of Booking Upto : <b> {bookings.length} </b>
          </p>
        </div>
      </div>
    </div>
  );
}
