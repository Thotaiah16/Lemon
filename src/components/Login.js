import React from 'react';

export default function Login() {
  return (
    <main id="main-content" className="site-main" role="main">
      <section style={{ padding: '4rem 2rem', minHeight: '60vh', background: 'linear-gradient(135deg, #495E57 0%, #2d3a35 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '500px', width: '100%', backgroundColor: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
            <h1 style={{ fontSize: '2.5rem', color: '#495E57', marginBottom: '0.5rem' }}>Member Portal</h1>
            <p style={{ color: '#888', fontSize: '1rem' }}>Your personalized dining experience</p>
          </div>
          
          <div style={{ padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.3rem', color: '#495E57', marginBottom: '1rem', textAlign: 'center' }}>
              Exclusive Member Benefits
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
              <li style={{ padding: '0.5rem 0', fontSize: '1rem', color: '#666' }}>✨ Priority reservations</li>
              <li style={{ padding: '0.5rem 0', fontSize: '1rem', color: '#666' }}>🎁 Special birthday offers</li>
              <li style={{ padding: '0.5rem 0', fontSize: '1rem', color: '#666' }}>📧 Early access to new menu items</li>
              <li style={{ padding: '0.5rem 0', fontSize: '1rem', color: '#666' }}>💰 Exclusive member discounts</li>
            </ul>
          </div>
          
          <div style={{ padding: '1.5rem', backgroundColor: '#F4CE14', borderRadius: '12px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#495E57', marginBottom: '0.5rem' }}>Launching Soon!</h3>
            <p style={{ fontSize: '1rem', color: '#333', margin: 0 }}>
              We're creating an amazing members-only experience for you.
            </p>
          </div>
          
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#888' }}>
            Stay tuned for updates
          </p>
        </div>
      </section>
    </main>
  );
}
