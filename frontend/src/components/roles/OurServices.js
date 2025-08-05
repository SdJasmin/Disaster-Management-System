import React from 'react';
import './OurServices.css';
import aid from './images/homepage.png';

import vol from './images/volunteer.png';
import contact from './images/contact.png';
import alert from './images/alert.png';
import res from './images/res.png';
const services = [
  {
    title: 'Emergency Aid Requests',
    description: 'During disasters, citizens can easily raise requests for urgent needs such as food, clean water, temporary shelter, or medical attention .The platform ensures their request is immediately routed to the nearest available support team or rescue unit for faster response.',
    image: aid,
  },
  {
    title: 'Volunteer Support System',
    description: 'Trained volunteers receive instant notifications when a citizen nearby raises an aid request. They are automatically assigned based on proximity and availability, ensuring timely and efficient assistance during emergencies.',
    image: vol,
  },
  {
    title: 'Live Alert Notifications',
    description: 'Citizens receive real-time alerts about disasters such as floods, earthquakes, or storms happening in their area.The platform also provides essential safety tips and evacuation instructions to help them stay informed and protected.',
    image: alert,
  },
  {
    title: 'Resource Management',
    description: 'The system tracks the real-time availability of essential resources like food, clean water, and medical supplies. It helps authorities and volunteers efficiently manage and distribute these resources to affected areas based on priority and need.',
    image: res,
  },
 
  {
    title: 'Helpline & Emergency Contacts',
    description: 'Citizens can quickly reach out for help through one-tap access to verified emergency contacts and official government helplines. This ensures immediate support in critical situations without the need to search for contact details.',
    image: contact,
  },
];

const OurServices = () => {
  return (
    <section className="services-section" id="our-services">
      <h2>Our Services</h2>
      <div className="services-wrapper">
        {services.map((service, index) => (
          <div
            className={`service-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'}`}
            key={index}
          >
            <div className="service-img">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-text">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
