import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { sendToTelegram } from '../utils/telegramNotifier';
import { TELEGRAM_CONFIG } from '../config/telegram';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    try {
      // Send to Telegram bot
      await sendToTelegram(
        TELEGRAM_CONFIG.BOT_TOKEN,
        TELEGRAM_CONFIG.CHAT_ID,
        {
          ...formData,
          formType: 'Contact & Collaboration Form'
        }
      );
      
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'There was an error sending your message. Please try again.'
      });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} id="contact" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="section-title">Contact & Collaboration</h2>
          
          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            marginTop: '3rem'
          }}>
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <h3 style={{ marginBottom: '2rem' }}>Get In Touch</h3>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 194, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1rem'
                  }}>
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: 'var(--accent-color)' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, marginBottom: '0.2rem' }}>Email</h4>
                    <a href="mailto:info@lanos.tech" className="animated-link">info@lanos.tech</a>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 194, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1rem'
                  }}>
                    <FontAwesomeIcon icon={faPhone} style={{ color: 'var(--accent-color)' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, marginBottom: '0.2rem' }}>Phone</h4>
                    <a href="tel:+919109279790" className="animated-link">+91 91092 79790</a>
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 194, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1rem'
                  }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'var(--accent-color)' }} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, marginBottom: '0.2rem' }}>Address</h4>
                    <p style={{ margin: 0 }}>Lanos Institute of Technology Classes, 10th Battalion Rd, Sagar, Madhya Pradesh</p>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Connect With Us</h3>
                <p>
                  Interested in our services or want to explore collaboration opportunities? 
                  Reach out to us through the contact form or directly via email or phone.
                </p>
                <p>
                  We're always looking for partners who share our vision of transforming 
                  technology education and innovation.
                </p>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div style={{
                backgroundColor: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '10px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Collaboration Form</h3>
                
                {formStatus.submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: formStatus.success ? 'rgba(0, 194, 255, 0.1)' : 'rgba(255, 62, 108, 0.1)',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}
                  >
                    <p style={{ margin: 0 }}>{formStatus.message}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label 
                        htmlFor="name" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label 
                        htmlFor="email" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label 
                        htmlFor="subject" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '2rem' }}>
                      <label 
                        htmlFor="message" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        style={{
                          ...inputStyle,
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      className="btn btn-primary"
                      style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Send Message
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Map or Location */}
          <motion.div 
            variants={itemVariants}
            style={{ marginTop: '5rem' }}
          >
            <div style={{
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              padding: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
            }}>
              {/* Google Maps iframe for Lanos Headquarters */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.0456789012345!2d78.79296980941567!3d23.851802904326178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDUxJzA2LjUiTiA3OMKwNDcnMzQuNyJF!5e0!3m2!1sen!2sin!4v1716408500000!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '10px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Lanos Institute of Technology Classes Location"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '4px',
  color: 'var(--text-color)',
  fontSize: '1rem',
  transition: 'border-color 0.3s ease',
  outline: 'none'
};

export default ContactSection;