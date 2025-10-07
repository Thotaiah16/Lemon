import React from 'react';
import Hero from './Hero';

import heroImage from '../assets/restauranfood.jpg';

export default function Main() {
  return (
    <main className="site-main">
  <Hero imageSrc={heroImage} />
      <section className="specials">
        <div className="specials-header">
          <h2>This Weeks Specials</h2>
          <button className="secondary-cta">Online Menu</button>
        </div>

        <div className="cards">
          <article className="card">
            <img src="/assets/greek salad.jpg" alt="Greek salad" />
            <h4>Greek salad</h4>
            <p className="price">$12.99</p>
            <p className="card-desc">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
            <button className="order"><img src="/assets/Basket.svg" alt="delivery" className="order-icon"/>Order a delivery</button>
          </article>

          <article className="card placeholder">
           <img src="/assets/bruchetta.svg" alt="Bruschetta" />
            <h4>Bruschetta</h4>
            <p className="price">$5.99</p>
            <p className="card-desc">Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
            <button className="order"><img src="/assets/Basket.svg" alt="delivery" className="order-icon"/>Order a delivery</button>
          </article>

          <article className="card">
            <img src="/assets/lemon dessert.jpg" alt="Lemon Dessert" />
            <h4>Lemon Dessert</h4>
            <p className="price">$5.00</p>
            <p className="card-desc">This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
            <button className="order"><img src="/assets/Basket.svg" alt="delivery" className="order-icon"/>Order a delivery</button>
          </article>
        </div>
      </section>
      
      <section className="testimonials">
        <h2>Testimonials</h2>
        <div className="testimonials-grid">
          <article className="testimonial">
            <img src="/assets/Mario and Adrian A.jpg" alt="Mario and Adrian"/>
            <blockquote>
              <p>"The food was exceptional and the service was top-notch. Highly recommend!"</p>
              <cite>- Mario</cite>
            </blockquote>
          </article>

          <article className="testimonial">
            <img src="/assets/Mario and Adrian b.jpg" alt="Adrian"/>
            <blockquote>
              <p>"A memorable experience — cozy atmosphere and delicious dishes."</p>
              <cite>- Adrian</cite>
            </blockquote>
          </article>
        </div>
      </section>

      <section className="below-sections">
        <div className="below-left">
          <img src="/assets/restaurant.jpg" alt="restaurant interior" />
          <h3>About Our Story</h3>
          <p>Little Lemon has been serving fresh Mediterranean flavors with a modern touch. Our chefs use local ingredients to craft seasonal dishes.</p>
        </div>

        <div className="below-right">
          <img src="/assets/restauranfood.jpg" alt="kitchen" />
          <h3>Our Philosophy</h3>
          <p>We focus on sustainability and taste — from sourcing to plating, every detail matters in delivering a memorable meal.</p>
        </div>
      </section>

      <section className="social-links">
        <h3>Follow Us</h3>
        <div className="social-list">
          <a href="#facebook" className="social-btn" aria-label="Facebook">f</a>
          <a href="#instagram" className="social-btn" aria-label="Instagram">ig</a>
          <a href="#twitter" className="social-btn" aria-label="Twitter">t</a>
        </div>
      </section>
    </main>
  );
}
