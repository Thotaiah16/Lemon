import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ imageSrc = '/assets/restauranfood.jpg' }) {
  return (
    <section className="hero-container" aria-labelledby="hero-heading">
      <div className="text-content">
        <h1 id="hero-heading">Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are family owned mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
        <Link to="/booking">
          <button className="hero-btn" aria-label="Reserve a table at Little Lemon">
            Reserve a Table
          </button>
        </Link>
      </div>

       <div className="image" role="img" aria-label="Featured Mediterranean dish">
        <div className="image-content">
          <img src={imageSrc} alt="Delicious Mediterranean dish from Little Lemon restaurant" />
        </div>
      </div>
    </section>

  );
}
