import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faGamepad, faUser, faEnvelope, faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { sendToTelegram } from '../../utils/telegramNotifier';
import { TELEGRAM_CONFIG } from '../../config/telegram';

const GamifiedLearningForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    interests: [],
    experience: '',
    goals: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const interests = [...formData.interests];
      if (checked) {
        interests.push(value);
      } else {
        const index = interests.indexOf(value);
        if (index > -1) {
          interests.splice(index, 1);
        }
      }
      setFormData({ ...formData, interests });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send to Telegram bot
      await sendToTelegram(
        TELEGRAM_CONFIG.BOT_TOKEN,
        TELEGRAM_CONFIG.CHAT_ID,
        {
          ...formData,
          formType: 'Gamified Learning Form'
        }
      );
      
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        institution: '',
        role: '',
        interests: [],
        experience: '',
        goals: ''
      });
    } catch (error) {
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="form-page">
      <div className="container" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '0 1rem'
      }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="form-container"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: '100%'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <FontAwesomeIcon 
              icon={faGamepad} 
              style={{ 
                fontSize: '2rem',
                color: 'var(--accent-color)',
                marginBottom: '0.5rem'
              }} 
            />
            <h1 style={{ marginBottom: '0.5rem' }}>Gamified Learning Platform</h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Join our innovative gamified learning platform and transform your educational experience.
              Fill out the form below to get started.
            </p>
          </div>

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderRadius: '8px',
                border: '1px solid rgba(39, 174, 96, 0.2)'
              }}
            >
              <h3 style={{ color: '#27ae60', marginBottom: '1rem' }}>Registration Successful!</h3>
              <p>Thank you for your interest in our Gamified Learning Platform. We'll contact you shortly with more information.</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Submit Another Response
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ 
                display: 'grid', 
                gap: '1rem', 
                gridTemplateColumns: 'repeat(2, 1fr)'
              }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="fullName" style={{ 
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: 'var(--text-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FontAwesomeIcon icon={faUser} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.3px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="email" style={{ 
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: 'var(--text-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.3px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="phone" style={{ 
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: 'var(--text-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FontAwesomeIcon icon={faPhone} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.3px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="institution" style={{ 
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: 'var(--text-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FontAwesomeIcon icon={faBuilding} />
                    Institution/Organization
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.3px'
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="role" style={{ 
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: 'var(--text-color)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <FontAwesomeIcon icon={faGraduationCap} />
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="form-control"
                    style={{
                      padding: '0.75rem',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.3px'
                    }}
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="administrator">Administrator</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label style={{ 
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: 'var(--text-color)',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>Areas of Interest</label>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  alignItems: 'start'
                }}>
                  {['Programming', 'Data Science', 'AI/ML', 'Web Development', 'Mobile Development', 'Game Development'].map((interest) => (
                    <div key={interest} style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        checked={formData.interests.includes(interest)}
                        onChange={handleChange}
                        style={{ margin: 0, padding: 0 }}
                      />
                      <span style={{ fontSize: '0.9rem', marginLeft: '2px' }}>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="experience" style={{ 
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: 'var(--text-color)'
                }}>Previous Learning Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows="3"
                  className="form-control"
                  placeholder="Tell us about your previous learning experience..."
                  style={{
                    padding: '0.75rem',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    letterSpacing: '0.3px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="goals" style={{ 
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  color: 'var(--text-color)'
                }}>Learning Goals</label>
                <textarea
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  rows="3"
                  className="form-control"
                  placeholder="What do you hope to achieve through our platform?"
                  required
                  style={{
                    padding: '0.75rem',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    letterSpacing: '0.3px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ 
                  padding: '0.75rem 2rem',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  width: '100%',
                  maxWidth: '200px',
                  margin: '0 auto',
                  letterSpacing: '0.5px'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GamifiedLearningForm; 