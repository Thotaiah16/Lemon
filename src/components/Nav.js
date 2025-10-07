import React from 'react';

export default function Nav({ open = false, onClose = () => {} }) {
  return (
    <nav className={`site-nav ${open ? 'open' : ''}`} aria-label="Primary navigation">
      <button className="nav-close" onClick={onClose} aria-hidden={!open}>×</button>
      <ul className="nav-list">
        <li className="nav-item"><a href="#home" onClick={onClose}>Home</a></li>
        <li className="nav-item"><a href="#about" onClick={onClose}>About</a></li>
        <li className="nav-item"><a href="#menu" onClick={onClose}>Menu</a></li>
        <li className="nav-item"><a href="#reservations" onClick={onClose}>Reservations</a></li>
        <li className="nav-item"><a href="#order" onClick={onClose}>Order Online</a></li>
        <li className="nav-item"><a href="#login" onClick={onClose}>Login</a></li>
      </ul>
    </nav>
  );
}
