import React from 'react';
import './Hero.css';

export default function Hero({ imageSrc = '/assets/restauranfood.jpg' }) {
  return (
    <div className="hero-container">
      <div className="text-content">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are family owned mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <button className="hero-btn">Reserve a Table</button>
      </div>
       <section class="image">
      <div className="image-content">
        <img src={imageSrc} alt="featured dish" />
      </div>
      </section>
    </div>
  );
}
