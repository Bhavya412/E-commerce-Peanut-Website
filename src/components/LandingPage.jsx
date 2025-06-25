import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate(); 

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div className="landing-wrapper">
      <section className="hero-image" data-aos="fade">
        <div className="hero-text">
          <h1 className="hero-title" data-aos="zoom-in">
            Welcome to PureGroundnuts
          </h1>
          <p className="hero-subtitle" data-aos="fade-up">
            Natural. Organic. Farm Fresh.
          </p>
        </div>
      </section>

      
      <section className="benefits-grid">
        <div className="benefit-box" data-aos="fade-up-right" data-aos-delay="100">
          <h3>Natural Farming</h3>
          <p>Purely grown by dedicated farmers without chemicals.</p>
        </div>

        <div className="benefit-box" data-aos="fade-up-left" data-aos-delay="200">
          <h3>High Protein</h3>
          <p>Essential for muscle growth and energy.</p>
        </div>

        <div className="benefit-box" data-aos="fade-down-right" data-aos-delay="300">
          <h3>Heart Healthy</h3>
          <p>Rich in good fats that support cardiovascular wellness.</p>
        </div>

        <div className="benefit-box" data-aos="fade-down-left" data-aos-delay="400">
          <h3>Sustainable</h3>
          <p>Eco-friendly crop that supports soil health.</p>
        </div>

        <div className="center-button" data-aos="zoom-in" data-aos-delay="500">
          <button className="explore-btn" onClick={() => navigate('/products')}>
            Explore Products
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
