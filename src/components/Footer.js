import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
        <address>
          <strong>Little Lemon</strong>
          <br />123 Lemon Lane
          <br />Lemon City, LC 12345
        </address>
      </div>
    </footer>
  );
}
