import React from 'react';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-container">
          <img src="/assets/Logo.svg" alt="Little Lemon logo" className="logo" />
        </div>
        <Nav />
      </div>
    </header>
  );
}
