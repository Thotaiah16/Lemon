import React from 'react';

export default function OrderOnline() {
  return (
    <main id="main-content" className="site-main" role="main">
      <section style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh', background: 'linear-gradient(135deg, #F4CE14 0%, #e8c211 100%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#495E57', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            🚀 Order Online
          </h1>
          
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '3rem', marginTop: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🍽️</div>
            <h2 style={{ fontSize: '2.5rem', color: '#495E57', marginBottom: '1.5rem' }}>
              Exciting News!
            </h2>
            <p style={{ fontSize: '1.3rem', color: '#666', lineHeight: '1.8', marginBottom: '2rem' }}>
              We're building a seamless online ordering experience to bring 
              Little Lemon's authentic Mediterranean flavors right to your door!
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
              <div style={{ padding: '1.5rem', backgroundColor: '#495E57', borderRadius: '12px', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
                <h3 style={{ fontSize: '1.2rem' }}>Fast Delivery</h3>
              </div>
              <div style={{ padding: '1.5rem', backgroundColor: '#495E57', borderRadius: '12px', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💳</div>
                <h3 style={{ fontSize: '1.2rem' }}>Secure Payment</h3>
              </div>
              <div style={{ padding: '1.5rem', backgroundColor: '#495E57', borderRadius: '12px', color: 'white' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📱</div>
                <h3 style={{ fontSize: '1.2rem' }}>Easy Tracking</h3>
              </div>
            </div>

            <p style={{ marginTop: '2rem', fontSize: '1.1rem', color: '#888', fontStyle: 'italic' }}>
              Launching Soon - Stay Tuned!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
