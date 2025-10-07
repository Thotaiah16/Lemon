import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './Hero';
import Specials from './Specials';
import Testimonials from './Testimonials';
import Chicago from './Chicago';
import BookingPage from './BookingPage';

import heroImage from '../assets/restauranfood.jpg';

function Home() {
  return (
    <main className="site-main">
      <Hero imageSrc={heroImage} />
      <Specials />
      <Testimonials />
      <Chicago />
    </main>
  );
}

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<BookingPage />} />
    </Routes>
  );
}
