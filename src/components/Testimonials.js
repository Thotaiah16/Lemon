import React from 'react';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <div className="testimonials-band">
      <section className="testimonials" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading">Testimonials</h2>
        <div className="testimonials-grid" role="list" aria-label="Customer testimonials">
          <article className="testimonial" role="listitem">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian A.jpg" alt="Mario, satisfied customer"/>
              <span className="testimonial-name" aria-label="Customer name">Mario</span>
            </div>
            <blockquote>
              <p>"The food was exceptional and the service was top-notch. Highly recommend!"</p>

            </blockquote>
          </article>
          <article className="testimonial" role="listitem">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian b.jpg" alt="Adrian, satisfied customer"/>
              <span className="testimonial-name" aria-label="Customer name">Adrian</span>
            </div>
            <blockquote>
              <p>"A memorable experience — cozy atmosphere and delicious dishes."</p>

            </blockquote>
          </article>
          <article className="testimonial" role="listitem">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian A.jpg" alt="Mario, satisfied customer"/>
              <span className="testimonial-name" aria-label="Customer name">Mario</span>
            </div>
            <blockquote>
              <p>"The food was exceptional and the service was top-notch. Highly recommend!"</p>

            </blockquote>
          </article>
          <article className="testimonial" role="listitem">
            <div className="testimonial-header">
              <img src="/assets/Mario and Adrian b.jpg" alt="Adrian, satisfied customer"/>
              <span className="testimonial-name" aria-label="Customer name">Adrian</span>
            </div>
            <blockquote>
              <p>"A memorable experience — cozy atmosphere and delicious dishes."</p>

            </blockquote>
          </article>
        </div>
      </section>
    </div>
  );
}