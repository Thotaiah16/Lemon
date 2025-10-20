import React from 'react';

export default function Menu() {
  return (
    <main id="main-content" className="site-main" role="main">
      <section style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh', background: 'linear-gradient(135deg, #495E57 0%, #3d4f4a 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#495E57' }}>🍋 Our Menu</h1>
          <div style={{ width: '100px', height: '4px', backgroundColor: '#F4CE14', margin: '0 auto 2rem' }}></div>
          
          <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '2rem', lineHeight: '1.8' }}>
            We're crafting something extraordinary for you! 
          </p>
          
          <div style={{ padding: '2rem', backgroundColor: '#F4CE14', borderRadius: '12px', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#495E57' }}>Coming Very Soon</h2>
            <p style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.6' }}>
              Our new digital menu featuring our signature Mediterranean dishes, 
              seasonal specials, and exclusive chef recommendations.
            </p>
          </div>
          
          <p style={{ marginTop: '2rem', fontSize: '1rem', color: '#888' }}>
            In the meantime, visit us to explore our full culinary selection!
          </p>
        </div>
      </section>
    </main>
  );
}
