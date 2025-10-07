import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ open = false, onClose = () => {} }) {
  return (
    <nav className={`site-nav ${open ? 'open' : ''}`} aria-label="Primary navigation">
      <button className="nav-close" onClick={onClose} aria-hidden={!open}>
7</button>
      <ul className="nav-list">
        <li className="nav-item"><Link to="/" onClick={onClose}>Home</Link></li>
        <li className="nav-item"><Link to="/about" onClick={onClose}>About</Link></li>
        <li className="nav-item"><Link to="/menu" onClick={onClose}>Menu</Link></li>
        <li className="nav-item"><Link to="/booking" onClick={onClose}>Reservations</Link></li>
        <li className="nav-item"><Link to="/order" onClick={onClose}>Order Online</Link></li>
        <li className="nav-item"><Link to="/login" onClick={onClose}>Login</Link></li>
      </ul>
    </nav>
  );
}
