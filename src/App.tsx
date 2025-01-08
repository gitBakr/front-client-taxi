import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingForm } from '@/components/BookingForm';
import { PaymentStripePage } from '@/pages/PaymentStripePage';
import { DriverDetailsPage } from '@/pages/DriverDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookingForm />} />
        <Route path="/payment/stripe" element={<PaymentStripePage />} />
        <Route path="/driver/details" element={<DriverDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
