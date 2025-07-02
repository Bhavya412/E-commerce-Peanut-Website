import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 120,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="landing-wrapper">
      <section className="hero-image" data-aos="fade">
        <div className="hero-text">
          <h1 className="hero-title" data-aos="zoom-in">
            LAKSHMI SWATHI ENTERPRISES
          </h1>
          <p className="hero-subtitle" data-aos="fade-up">
            QuALITY - PURITY - TRUST
          </p>
          <div
            className="center-button"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <button
              className="explore-btn"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button>
          </div>
        </div>
      </section>

      <section className="know-us">
        <div className="know-us-text">
          <h2>KNOW US</h2>
          <h4>PREMIUM QUALITY | ECO FRIENDLY</h4>
          <blockquote>
            "Lakshmi Swathi Enterprises specializes in high-quality groundnut
            processing. We deliver premium groundnut oil and seeds, ensuring
            purity and freshness with every product."
          </blockquote>
        </div>
        <div className="know-us-image"></div>
      </section>

      <section className="source-container">
        <div className="background-image"></div>
        <div className="white-overlay">
          <h2>Sourcing from Trusted Partners</h2>
          <blockquote>
            We partner with reliable and experienced farmers who cultivate
            groundnuts using organic and sustainable farming practices.
          </blockquote>
          

          <ul>
            <li>Carefully selected premium-grade groundnuts</li>
            <li>Sourced from certified and quality-driven farms</li>
            <li>
              Regular quality checks & moisture control before procurement
            </li>
          </ul>
        </div>
      </section>

      

      
      <section className="benefits-grid">
        <div
          className="delivery-box"
          data-aos-delay="100"
        >
          <h2>Packaging & Delivery – Freshness Guaranteed</h2>
          <blockquote>
            Once quality-approved, our products are carefully packaged in food-grade materials to preserve freshness and extend shelf life.
          </blockquote>
          

          <ul>
            <li>Carefully selected premium-grade groundnuts</li>
            <li>Sourced from certified and quality-driven farms</li>
            <li>
              Regular quality checks & moisture control before procurement
            </li>
          </ul>
        
      
        </div>
        </section>
        <section className="scroll-white-section">
  <div className="scroll-container">
    <div className="logo-column">
      <img src="src\assets\WhatsApp Image 2025-06-26 at 22.05.17_0b8b5c21.jpg" alt="Logo" className="logo" />
    </div>
    <div className="contact-content">
    <blockquote>LAKSHMI SWATHI ENTERPRISES</blockquote>
    <h3>| QUALITY | PURITY | TRUST</h3>
    <ul>
            <li>tandusureshbabu@gmail.com</li>
            <li>97425 46001</li>
            <li>
              HIG 144, HB Colony, Bhavanipuram, Vijayawada, Andhra Pradesh - 520012
            </li>
          </ul>
  </div>
  </div>
</section>

        

        

        
      
    </div>
  );
}

export default LandingPage;
