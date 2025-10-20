import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-content">
        <div className="footer-img">
          <img src="/assets/restaurant.jpg" alt="Little Lemon restaurant interior" />
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <h3 className="sr-only">Quick Links</h3>
          <ul>
            <li><Link to="/" aria-label="Go to home page">Home</Link></li>
            <li><Link to="/about" aria-label="Learn about Little Lemon">About</Link></li>
            <li><Link to="/menu" aria-label="View our menu">Menu</Link></li>
            <li><Link to="/booking" aria-label="Make a reservation">Reservations</Link></li>
            <li><Link to="/order" aria-label="Order food online">Order Online</Link></li>
            <li><Link to="/login" aria-label="Login to your account">Login</Link></li>
          </ul>
        </nav>
        <address className="footer-contact">
          <h3 className="sr-only">Contact Information</h3>
          <ul>
            <li><strong>Address</strong></li>
            <li><a href="tel:+1234567890" aria-label="Call us at 123-456-7890">123-456-7890</a></li>
            <li><a href="mailto:info@littlelemon.com" aria-label="Email us at info@littlelemon.com">info@littlelemon.com</a></li>
          </ul>
        </address>
        <div className="footer-contact">
          <h3 className="sr-only">Social Media</h3>
          <ul>
            <li><strong>Connect</strong></li>
            <li><a href="https://facebook.com" aria-label="Visit our Facebook page" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" aria-label="Visit our Instagram page" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}