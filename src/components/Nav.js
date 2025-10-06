import React from 'react';

export default function Nav() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <ul className="nav-list">
        <li className="nav-item"><a href="#home">Home</a></li>
        <li className="nav-item"><a href="#about">About</a></li>
        <li className="nav-item"><a href="#menu">Menu</a></li>
        <li className="nav-item"><a href="#reservations">Reservations</a></li>
        <li className="nav-item"><a href="#order">Order Online</a></li>
        <li className="nav-item"><a href="#login">Login</a></li>
      </ul>
    </nav>
  );
}
