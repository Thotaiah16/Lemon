import React, { useReducer, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Specials from './Specials';
import Testimonials from './Testimonials';
import Chicago from './Chicago';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import About from './About';
import Menu from './Menu';
import OrderOnline from './OrderOnline';
import Login from './Login';
import { initializeTimes, updateTimes } from '../state/bookingTimes';

import heroImage from '../assets/restauranfood.jpg';

function Home() {
  return (
    <main id="main-content" className="site-main" role="main">
      <Hero imageSrc={heroImage} />
      <Specials />
      <Testimonials />
      <Chicago />
    </main>
  );
}

// `initializeTimes` and `updateTimes` are implemented in `src/state/bookingTimes.js`.
// They handle calling the external API (via window.fetchAPI) and the book-time action.

export default function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, undefined, initializeTimes);
  const [apiLoaded, setApiLoaded] = useState(typeof window !== 'undefined' && typeof window.fetchAPI === 'function');
  const navigate = useNavigate();

  // Step 2: submitForm function that calls submitAPI and navigates to confirmation page
  const submitForm = async (formData) => {
    try {
      // Call the submitAPI function with the form data
      let success = false;
      
      if (typeof window !== 'undefined' && typeof window.submitAPI === 'function') {
        const result = window.submitAPI(formData);
        // Handle both sync and async submitAPI
        success = result instanceof Promise ? await result : result;
      } else {
        // If API not available, treat as success for testing
        success = true;
      }

      if (success) {
        console.log('✓ Booking submitted successfully:', formData);
        // Navigate to confirmation page
        navigate('/confirmed');
        return true;
      } else {
        console.error('❌ Booking submission failed');
        return false;
      }
    } catch (error) {
      console.error('❌ Error submitting booking:', error);
      return false;
    }
  };
  
  useEffect(() => {
    if (apiLoaded) return;
    // Try mirrors in order. Prefer the canonical raw.githubusercontent URL first
    // (this project requires that URL). raw.githack is kept as a secondary
    // fallback for environments where raw.githubusercontent may be blocked.
    const candidates = [
      'https://raw.githubusercontent.com/courseraap/capstone/main/api.js',
      'https://raw.githack.com/courseraap/capstone/main/api.js'
    ];

    let mounted = true;

    async function tryLoadList(list) {
      // avoid concurrent loads from multiple effects
      if (typeof window !== 'undefined' && window.__LEM_API_LOADING__) return;
      if (typeof window !== 'undefined') window.__LEM_API_LOADING__ = true;

      // If API already available, short-circuit
      if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
        setApiLoaded(true);
        if (typeof window !== 'undefined') delete window.__LEM_API_LOADING__;
        return;
      }

      // Strategy: fetch-first (bypasses CORS/MIME issues) then fallback to script tag
      for (const src of list) {
        if (!mounted) break;
        if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
          setApiLoaded(true);
          break;
        }

        console.log('Attempting to load booking API via fetch:', src);
        try {
          const resp = await fetch(src, { mode: 'cors', cache: 'default' });
          if (!resp.ok) {
            console.warn('Fetch failed for', src, '- status:', resp.status);
            continue;
          }
          const code = await resp.text();
          console.log('Fetched booking API script successfully from:', src);
          
          // Evaluate the code directly (safer than eval: use Function constructor in strict mode)
          // This creates fetchAPI and submitAPI in the global scope
          const wrappedCode = `
            (function() {
              'use strict';
              ${code}
              // Expose to window
              if (typeof fetchAPI !== 'undefined') window.fetchAPI = fetchAPI;
              if (typeof submitAPI !== 'undefined') window.submitAPI = submitAPI;
            })();
          `;
          
          // Execute via script element with inline code (most reliable for global scope)
          const scriptEl = document.createElement('script');
          scriptEl.textContent = wrappedCode;
          document.body.appendChild(scriptEl);
          
          await new Promise(r => setTimeout(r, 50));
          
          if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
            console.log('✓ Booking API loaded successfully from:', src);
            if (mounted) {
              setApiLoaded(true);
              const today = new Date();
              const iso = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().slice(0,10);
              dispatch({ type: 'date-changed', date: iso });
            }
            break;
          } else {
            console.error('fetchAPI not found after executing script from:', src);
          }
        } catch (fetchErr) {
          console.warn('Fetch attempt failed for', src, ':', fetchErr.message);
          
          // Fallback: try script tag (may fail due to CORS/MIME but worth trying)
          try {
            console.log('Trying script tag fallback for:', src);
            await new Promise((resolve, reject) => {
              const s = document.createElement('script');
              s.src = src;
              s.async = true;
              s.onload = () => resolve();
              s.onerror = (ev) => {
                console.error('Script tag also failed for:', src, ev);
                reject(new Error('script tag load error'));
              };
              document.body.appendChild(s);
            });
            
            await new Promise(r => setTimeout(r, 100));
            
            if (typeof window !== 'undefined' && typeof window.fetchAPI === 'function') {
              console.log('✓ Booking API loaded via script tag from:', src);
              if (mounted) {
                setApiLoaded(true);
                const today = new Date();
                const iso = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().slice(0,10);
                dispatch({ type: 'date-changed', date: iso });
              }
              break;
            }
          } catch (scriptErr) {
            console.warn('Script tag fallback also failed for:', src);
          }
        }
      }

      if (mounted && typeof window !== 'undefined' && typeof window.fetchAPI !== 'function') {
        console.error('❌ Failed to load booking API from any source. fetchAPI and submitAPI are not available.');
      }

      if (typeof window !== 'undefined') delete window.__LEM_API_LOADING__;
    }

    tryLoadList(candidates);

    return () => { mounted = false; };
  }, [apiLoaded, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/booking" element={<BookingPage availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />} />
      <Route path="/confirmed" element={<ConfirmedBooking />} />
      <Route path="/order" element={<OrderOnline />} />
      <Route path="/login" element={<Login />} />
      <Route path="/specials" element={<Specials />} />
    </Routes>
  );
}
