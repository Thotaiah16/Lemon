import React from 'react';

export default function Main() {
  return (
    <main className="site-main">
      <section className="hero">
        <div className="hero-content">
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>We are family owned mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
          <button className="cta">Reserve a Table</button>
        </div>
        <div className="hero-image">
          <img src="/assets/restauranfood.jpg" alt="featured dish" />
        </div>
      </section>

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
            <button className="order">Order a delivery</button>
          </article>

          <article className="card placeholder">
           <img src="/assets/bruchetta.svg" alt="Bruschetta" />
            <h4>Bruschetta</h4>
            <p className="price">$5.99</p>
            <p className="card-desc">Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
            <button className="order">Order a delivery</button>
          </article>

          <article className="card">
            <img src="/assets/lemon dessert.jpg" alt="Lemon Dessert" />
            <h4>Lemon Dessert</h4>
            <p className="price">$5.00</p>
            <p className="card-desc">This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
            <button className="order">Order a delivery</button>
          </article>
        </div>
      </section>
    </main>
  );
}
