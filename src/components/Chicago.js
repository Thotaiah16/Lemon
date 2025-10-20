import React from 'react';
import './Chicago.css';

export default function Chicago() {
  return (
    <section className="chicago-band" aria-labelledby="about-heading">
      <div className="chicago-inner">
        <div className="chicago-text">
          <h1 id="about-heading">Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            Little Lemon has been serving fresh Mediterranean flavors with a modern touch. Our chefs use local ingredients to craft seasonal dishes. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
          </p>
        </div>
        <div className="chicago-collage" role="img" aria-label="Restaurant photos">
          <img
            className="collage-img collage-img-front"
            src="/assets/restaurant-chef-B.jpg"
            alt="Little Lemon chef preparing fresh Mediterranean food"
          />
          <img
            className="collage-img collage-img-back"
            src="/assets/restaurant.jpg"
            alt="Little Lemon restaurant interior with modern decor"
          />
        </div>
      </div>
    </section>
  );
}