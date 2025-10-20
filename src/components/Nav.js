import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ open = false, onClose = () => {} }) {
  return (
    <nav className={`site-nav ${open ? 'open' : ''}`} aria-label="Primary navigation" role="navigation">
      <button 
        className="nav-close" 
        onClick={onClose} 
        aria-label="Close navigation menu"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
      >
        ✕
      </button>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" onClick={onClose} aria-label="Navigate to home page">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" onClick={onClose} aria-label="Navigate to about page">About</Link>
        </li>
        <li className="nav-item">
          <Link to="/menu" onClick={onClose} aria-label="Navigate to menu page">Menu</Link>
        </li>
        <li className="nav-item">
          <Link to="/booking" onClick={onClose} aria-label="Navigate to reservations page">Reservations</Link>
        </li>
        <li className="nav-item">
          <Link to="/order" onClick={onClose} aria-label="Navigate to order online page">Order Online</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" onClick={onClose} aria-label="Navigate to login page">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
