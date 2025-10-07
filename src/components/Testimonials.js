import React from 'react';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <div className="testimonials-band">
      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonials-grid">
          <article className="testimonial">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian A.jpg" alt="Mario"/>
              <span className="testimonial-name">Mario</span>
            </div>
            <blockquote>
              <p>"The food was exceptional and the service was top-notch. Highly recommend!"</p>
              <cite>- Mario</cite>
            </blockquote>
          </article>
          <article className="testimonial">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian b.jpg" alt="Adrian"/>
              <span className="testimonial-name">Adrian</span>
            </div>
            <blockquote>
              <p>"A memorable experience — cozy atmosphere and delicious dishes."</p>
              <cite>- Adrian</cite>
            </blockquote>
          </article>
          <article className="testimonial">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian A.jpg" alt="Mario"/>
              <span className="testimonial-name">Mario</span>
            </div>
            <blockquote>
              <p>"The food was exceptional and the service was top-notch. Highly recommend!"</p>
              <cite>- Mario</cite>
            </blockquote>
          </article>
          <article className="testimonial">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian b.jpg" alt="Adrian"/>
              <span className="testimonial-name">Adrian</span>
            </div>
            <blockquote>
              <p>"A memorable experience — cozy atmosphere and delicious dishes."</p>
              <cite>- Adrian</cite>
            </blockquote>
          </article>
        </div>
      </section>
    </div>
  );
}