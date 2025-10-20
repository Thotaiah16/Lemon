import React from 'react';

export default function About() {
  return (
    <main id="main-content" className="site-main" role="main">
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#495E57' }}>About Little Lemon</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: '#F4CE14', marginBottom: '1rem' }}>Our Story</h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
              Founded in Chicago in 1995, Little Lemon has been serving authentic Mediterranean cuisine 
              with a modern twist for over two decades. Our family-owned restaurant combines traditional 
              recipes passed down through generations with contemporary culinary techniques to create 
              unforgettable dining experiences.
            </p>
          </div>
          
          <div>
            <h2 style={{ fontSize: '2rem', color: '#F4CE14', marginBottom: '1rem' }}>Our Philosophy</h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}>
              We believe in using only the freshest, locally-sourced ingredients to craft dishes that 
              celebrate the rich flavors of the Mediterranean. Every meal is prepared with passion, 
              attention to detail, and a commitment to exceptional quality that keeps our guests 
              coming back.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '4rem', padding: '2rem', backgroundColor: '#495E57', borderRadius: '12px', color: 'white' }}>
          <h2 style={{ fontSize: '2rem', color: '#F4CE14', marginBottom: '1.5rem', textAlign: 'center' }}>Why Choose Little Lemon?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌿 Fresh Ingredients</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>Locally sourced, organic produce delivered daily</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👨‍🍳 Expert Chefs</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>Trained in traditional Mediterranean cuisine</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>❤️ Family Tradition</h3>
              <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>Recipes perfected over 30+ years</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
