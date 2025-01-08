import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingForm } from '@/components/BookingForm';
import { PaymentStripePage } from '@/pages/PaymentStripePage';
import { DriverDetailsPage } from '@/pages/DriverDetailsPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <Routes>
            <Route path="/" element={<BookingForm />} />
            <Route path="/payment/stripe" element={<PaymentStripePage />} />
            <Route path="/driver/details" element={<DriverDetailsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
