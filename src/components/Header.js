import React, { useState } from 'react';
import Nav from './Nav';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-container">
          <img src="/assets/Logo.svg" alt="Little Lemon logo" className="logo" />
        </div>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(open => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <Nav open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
