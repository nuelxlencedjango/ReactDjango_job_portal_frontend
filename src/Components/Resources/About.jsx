import React from 'react';
import  '../Resources/aboutus.css'; 
import aboutUsImage from '../../assets/about.jpg'; 

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About I-Wan-Wok Limited</h1>
        <p className="tagline">Connecting Talent with Opportunity</p>
      </div>

      <div className="about-us-content">
        

        <div className="text-section">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              At I-Wan-Wok Limited, we are dedicated to bridging the gap between skilled artisans, professionals, and employers who value professionalism and expertise. Our mission is to create meaningful connections that empower individuals and businesses to thrive.
            </p>
          </section>

          <section className="who-we-are-section">
            <h2>Who We Are</h2>
            <p>
              Situated at <strong>102 Apapa Road, Lagos</strong>, I-Wan-Wok Limited is a trusted platform that connects employers with the best artisans and skilled workers. We take pride in our rigorous screening process, ensuring that only the most experienced and professional individuals are part of our network.
            </p>
            <p>
              With years of experience in various fields, our artisans and professionals are equipped to deliver exceptional results, meeting the highest standards of quality and reliability.
            </p>
          </section>

          <section className="what-we-do-section">
            <h2>What We Do</h2>
            <p>
              We specialize in connecting employers with a curated pool of talented individuals, including:
            </p>
            <ul>
              <li>Skilled Artisans</li>
              <li>Professional Workers</li>
              <li>Experienced Technicians</li>
              <li>Certified Experts</li>
            </ul>
            <p>
              Our platform ensures that every employer finds the right match for their needs, while every worker gets the opportunity to showcase their skills and grow their career.
            </p>
          </section>

          <section className="why-choose-us-section">
            <h2>Why Choose Us?</h2>
            <p>
              At I-Wan-Wok Limited, we stand out because of our commitment to excellence. Here’s why you should choose us:
            </p>
            <ul>
              <li><strong>Rigorous Screening:</strong> We handpick the best professionals with proven experience.</li>
              <li><strong>Trusted Network:</strong> Our workers are reliable, skilled, and professional.</li>
              <li><strong>Seamless Connections:</strong> We make it easy for employers to find the right talent.</li>
              <li><strong>Customer-Centric Approach:</strong> Your satisfaction is our priority.</li>
            </ul>
          </section>

          <section className="contact-section">
            <h2>Get in Touch</h2>
            <p>
              Visit us at <strong>102 Apapa Road, Lagos</strong>, or reach out to us to learn more about how we can help you find the perfect match for your needs.
            </p>
            <p>
              <strong>Phone:</strong> +234-XXX-XXXX-XXXX<br />
              <strong>Email:</strong> info@iwanwok.com
            </p>
          </section>
        </div>
        <div className="image-section">
          <img src={aboutUsImage} alt="I-Wan-Wok Team" className="about-us-image" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;