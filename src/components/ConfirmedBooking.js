import React from 'react';

export default function ConfirmedBooking() {
  return (
    <main className="site-main" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '40px',
        backgroundColor: '#f4f4f4',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '36px',
          color: '#495e57',
          marginBottom: '20px'
        }}>
          ✓ Booking Confirmed!
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#333',
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          Thank you for your reservation at Little Lemon!
        </p>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '30px'
        }}>
          We look forward to serving you.
        </p>
        <a 
          href="/" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#495e57',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#3f5247'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#495e57'}
        >
          Return to Home
        </a>
      </div>
    </main>
  );
}
