import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { sendToTelegram } from '../utils/telegramNotifier';
import { TELEGRAM_CONFIG } from '../config/telegram';

const InstitutionRegistration = () => {
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    interests: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === '#institution-registration-form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.institutionName || !formData.contactPerson || !formData.email || !formData.phone || !formData.address || !formData.interests) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Send to Telegram bot
      try {
        const result = await sendToTelegram(
          TELEGRAM_CONFIG.BOT_TOKEN,
          TELEGRAM_CONFIG.CHAT_ID,
          {
            ...formData,
            formType: 'Institution Benefits Registration'
          }
        );
        
        setSubmitStatus({
          success: true,
          message: 'Registration successful! We will contact you soon with more information about institution benefits.'
        });
        
        // Reset form after successful submission
        setFormData({
          institutionName: '',
          contactPerson: '',
          email: '',
          phone: '',
          address: '',
          interests: '',
          message: ''
        });
      } catch (telegramError) {
        throw new Error('Failed to send notification. Please try again.');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section style={{ padding: '8rem 0 4rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Institution Benefits Registration</h1>
          <p style={{ 
            fontSize: '1.1rem', 
            maxWidth: '800px', 
            margin: '0 auto 3rem',
            textAlign: 'center'
          }}>
            Register below to learn more about our exclusive benefits for academic institutions and enhance your educational offerings.
          </p>

          {submitStatus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: submitStatus.success ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 76, 76, 0.1)',
                border: `1px solid ${submitStatus.success ? 'rgba(0, 200, 83, 0.3)' : 'rgba(255, 76, 76, 0.3)'}`,
                marginBottom: '2rem',
                textAlign: 'center'
              }}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <motion.form 
            ref={formRef}
            id="institution-registration-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              maxWidth: '700px',
              margin: '0 auto',
              backgroundColor: 'rgba(30, 30, 30, 0.6)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="institutionName" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Institution Name *
              </label>
              <input
                type="text"
                id="institutionName"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '5px',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="contactPerson" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Contact Person *
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '5px',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '5px',
                    color: 'var(--text-color)',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '5px',
                    color: 'var(--text-color)',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="address" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '5px',
                  color: 'var(--text-color)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="interests" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Areas of Interest *
              </label>
              <style jsx>{`
                #institution-registration-form select,
                #institution-registration-form select option {
                  color: white !important;
                  background-color: #000000 !important;
                }
                #institution-registration-form select option:hover {
                  background-color: #1a1a1a !important;
                }
                #institution-registration-form select option:checked {
                  background-color: #1a1a1a !important;
                }
              `}</style>
              <select
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '5px',
                  color: 'white',
                  fontSize: '1rem',
                  height: '45px'
                }}
              >
                <option value="">Select</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Science">Data Science</option>
                <option value="Blockchain">Blockchain</option>
                <option value="IoT">Internet of Things</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Additional Information
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '5px',
                  color: 'var(--text-color)',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
                placeholder="Tell us about your specific interests or questions..."
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#00c2ff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '0.75rem 2.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 10px rgba(0, 194, 255, 0.3)',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Register Now'}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default InstitutionRegistration;
