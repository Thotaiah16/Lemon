import React from 'react';
import { Link } from 'react-router-dom';

export default function Specials() {
  return (
    <section className="specials" aria-labelledby="specials-heading">
      <div className="specials-header">
        <h2 id="specials-heading">This Weeks Specials</h2>
        <Link to="/menu">
          <button className="secondary-cta" aria-label="View online menu">
            Online Menu
          </button>
        </Link>
      </div>

      <div className="cards" role="list" aria-label="Weekly special dishes">
        <article className="card" role="listitem">
          <img src="/assets/greek salad.jpg" alt="Fresh Greek salad with feta cheese and olives" />
          <h3>Greek salad</h3>
          <p className="price" aria-label="Price: $12.99">$12.99</p>
          <p className="card-desc">The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
          <button className="order" aria-label="Order Greek salad for delivery" style={{textDecoration: 'none'}}>
            Order a delivery <img src="\assets\delievry.png" alt="" role="presentation" className="order-icon" style={{marginLeft: '2px', width: '20px', height: '20px', verticalAlign: 'middle'}}/>
          </button>
        </article>

        <article className="card placeholder" role="listitem">
         <img src="/assets/bruchetta.svg" alt="Grilled bruschetta with garlic and olive oil" />
          <h3>Bruschetta</h3>
          <p className="price" aria-label="Price: $5.99">$5.99</p>
          <p className="card-desc">Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
          <button className="order" aria-label="Order Bruschetta for delivery" style={{textDecoration: 'none'}}>
            Order a delivery <img src="\assets\delievry.png" alt="" role="presentation" className="order-icon" style={{marginLeft: '2px', width: '20px', height: '20px', verticalAlign: 'middle'}}/>
          </button>
        </article>

        <article className="card" role="listitem">
          <img src="/assets/lemon dessert.jpg" alt="Traditional lemon dessert from grandma's recipe" />
          <h3>Lemon Dessert</h3>
          <p className="price" aria-label="Price: $5.00">$5.00</p>
          <p className="card-desc">This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.</p>
          <button className="order" aria-label="Order Lemon Dessert for delivery" style={{textDecoration: 'none'}}>
            Order a delivery <img src="\assets\delievry.png" alt="" role="presentation" className="order-icon" style={{marginLeft: '2px', width: '20px', height: '20px', verticalAlign: 'middle'}}/>
          </button>
        </article>
      </div>
    </section>
  );
}
