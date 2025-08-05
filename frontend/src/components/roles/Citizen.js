// components/roles/Citizen.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AidRequest from './AidRequest';
import Alerts from './Alerts';
import MyRequests from './MyRequests';
import CitizenHeader from './CitizenHeader';
import './CitizenDashboard.css';
import Profile from './Profile';
import Services from './OurServices';
import HelpingVolun from './Helpingvolun';
import AOS from 'aos';
import 'aos/dist/aos.css';

import home from './images/aidrequest.png'

const Citizen = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <CitizenHeader />
      <div className="dashboard">
        <div className="main-content">
          <Routes>
            <Route path="aid" element={<AidRequest />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="history" element={<MyRequests />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services" element={<Services />} />
            <Route path="volun" element={<HelpingVolun />} />
            <Route
              index
              element={
                <>
                  <section id="welcome" className="welcome-section">
  <h1>Welcome to AID CONNECT</h1>
  <img src={home} alt="Aid Connect Welcome" className="welcome-img" />
  <p>
    Aid Connect is your trusted platform for requesting emergency help and staying informed with real-time alerts.
    Whether you need food, medical assistance, or shelter — we're here for you. Together, we can build a stronger and more connected community. 
  </p>
  <p>
    The platform is built with accessibility and ease-of-use in mind, ensuring that anyone in need can request help in just a few clicks.
    We use modern web technologies to connect people during critical times and ensure support reaches them faster.
  </p>
</section>


                  <section id="about" className="section about-section">
                    <h2>About Us</h2>
                    <p>
                      We are a team dedicated to providing a fast and reliable emergency support system for all citizens.
                      Our mission is to bridge the gap between aid providers and seekers during critical times.
                    </p>
                    <p>
                      Aid Connect was inspired by real-life disaster scenarios, and we aim to empower communities with tools to stay safe, informed, and supported.
                      Every request on our platform is treated with urgency and care.
                    </p>
                  </section>

                  <section id="faq" className="section faq-section" >
                    <h2>Frequently Asked Questions (FAQ)</h2>
                    <ul>
                      <li><strong>How do I raise an aid request?</strong><br />Click on the "Aid Request" tab and fill the form with required details.</li>
                      <li><strong>Is my location shared?</strong><br />Your location is used only during emergency aid request for faster assistance.</li>
                      <li><strong>Can I cancel my request?</strong><br />Yes, go to "My Requests" and you’ll find the option to cancel.</li>
                    </ul>
                  </section>

                  

                  <section id="features" className="section features-section" >
                    <h2>Key Features</h2>
                    <ul>
                      <li>Real-time emergency alerts</li>
                      <li> Easy and fast aid request submission</li>
                      <li> Location-based support services</li>
                      <li> Transparent request tracking</li>
                      <li> Volunteer matchmaking and community support</li>
                    </ul>
                  </section>

                  <section id="volunteer" className="section volunteer-section">
                    <h2>Volunteer With Us</h2>
                    <p>Join a growing network of dedicated individuals making a difference. Whether you’re a doctor, delivery person, or just want to help — there’s a place for you at Aid Connect.</p>
                    <button className="btn-volunteer" onClick={() => window.location.href = '/citizen/volun'}>Join as Volunteer</button>
                  </section>

                  <section id="testimonials" className="section testimonial-section">
                    <h2>What People Are Saying</h2>
                    <div className="testimonial-cards">
                      <div className="testimonial-card">
                        <p>“This platform saved my family during the floods. I'm forever grateful!”</p>
                        <span>- Asha R., Chennai</span>
                      </div>
                      <div className="testimonial-card">
                        <p>“Volunteering with Aid Connect has been the most rewarding experience.”</p>
                        <span>- Raj S., Bengaluru</span>
                      </div>
                      <div className="testimonial-card">
                        <p>“Easy to use and helped me get food during quarantine.”</p>
                        <span>- Karim M., Hyderabad</span>
                      </div>
                    </div>
                  </section>

                  <section id="stats" className="section stats-section" >
                    <h2>Platform Impact</h2>
                    <div className="stats-grid">
                      <div className="stat-box">
                        <h3>1.2K+</h3>
                        <p>Requests Fulfilled</p>
                      </div>
                      <div className="stat-box">
                        <h3>850+</h3>
                        <p>Active Volunteers</p>
                      </div>
                      <div className="stat-box">
                        <h3>24x7</h3>
                        <p>Support Availability</p>
                      </div>
                    </div>
                  </section>
                  <section id="contact" className="section contact-section" >
                    <h2>Contact Us</h2>
                    <p>
                      📧 Email: support@aidconnect.org <br />
                      📞 Phone: +91-9876543210 <br />
                      📍 Address: Aid Connect, 2nd Floor, Tech Park, Bengaluru
                    </p>
                  </section>

                  <footer className="footer">
                    <p>© {new Date().getFullYear()} Aid Connect. All rights reserved.</p>
                  </footer>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Citizen;
