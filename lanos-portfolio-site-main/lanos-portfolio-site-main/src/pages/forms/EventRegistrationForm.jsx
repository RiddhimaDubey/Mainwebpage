import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faGraduationCap, faCode, faSchool } from '@fortawesome/free-solid-svg-icons';
import { sendToTelegram } from '../../utils/telegramNotifier';
import { TELEGRAM_CONFIG } from '../../config/telegram';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeName: '',
    semester: '',
    skills: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const availableSkills = [
    'Java',
    'Python',
    'HTML',
    'CSS',
    'DSA',
    'AutoCAD',
    'React',
    'Node.js',
    'Angular',
    'C++',
    'C',
    'JavaScript'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedSkills = [...formData.skills];
      if (checked) {
        updatedSkills.push(value);
      } else {
        const index = updatedSkills.indexOf(value);
        if (index > -1) {
          updatedSkills.splice(index, 1);
        }
      }
      setFormData(prev => ({ ...prev, skills: updatedSkills }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendToTelegram(
        TELEGRAM_CONFIG.BOT_TOKEN,
        TELEGRAM_CONFIG.CHAT_ID,
        {
          ...formData,
          formType: 'Event Registration Form'
        }
      );

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        collegeName: '',
        semester: '',
        skills: []
      });
    } catch (error) {
      setSubmitSuccess(false);
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
    <div className="container" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem' }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="form-container"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <FontAwesomeIcon
            icon={faGraduationCap}
            style={{
              fontSize: '3rem',
              color: 'var(--accent-color)',
              marginBottom: '1rem'
            }}
          />
          <h1 style={{ marginBottom: '0.5rem' }}>Event Registration</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Register for our upcoming events and workshops to enhance your skills and knowledge.
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
            <p>Thank you for registering! We will contact you with further details about the event.</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Register for Another Event
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div className="form-group">
                <label htmlFor="name">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem' }} />
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
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="collegeName">
                  <FontAwesomeIcon icon={faSchool} style={{ marginRight: '0.5rem' }} />
                  College Name
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your college name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="semester">
                  <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '0.5rem' }} />
                  Semester
                </label>
                <input
                  type="number"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  min="1"
                  max="8"
                  className="form-control"
                  placeholder="Enter your current semester"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faCode} style={{ marginRight: '0.5rem' }} />
                Skills you know
              </label>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px'
              }}>
                {availableSkills.map((skill) => (
                  <label
                    key={skill}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={handleChange}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                width: '100%',
                maxWidth: '300px',
                margin: '0 auto',
                backgroundColor: 'var(--accent-color)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Register Now'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default EventRegistrationForm; 