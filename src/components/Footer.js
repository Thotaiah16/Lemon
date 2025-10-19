import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-img">
          <img src="/assets/restaurant.jpg" alt="Restaurant Interior" />
        </div>
        <div className="footer-links">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Menu</li>
            <li>Reservations</li>
            <li>Order Online</li>
            <li>Login</li>
          </ul>
        </div>
        <div className="footer-contact">
          <ul>
            <li><strong>Adress</strong></li>
            <li>phone number</li>
            <li>email</li>
          </ul>
        </div>
        <div className="footer-contact">
          <ul>
            <li><strong>Adress</strong></li>
            <li>phone number</li>
            <li>email</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}