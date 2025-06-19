import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faBuilding, faUser, faEnvelope, faPhone, faBriefcase, faChartLine, faLightbulb, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { sendToTelegram } from '../../utils/telegramNotifier';
import { TELEGRAM_CONFIG } from '../../config/telegram';

const RDInnovationsForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    organizationType: '',
    researchAreas: [],
    projectType: '',
    timeline: '',
    budget: '',
    currentResearch: '',
    innovationGoals: '',
    collaborationType: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const researchAreas = [...formData.researchAreas];
      if (checked) {
        researchAreas.push(value);
      } else {
        const index = researchAreas.indexOf(value);
        if (index > -1) {
          researchAreas.splice(index, 1);
        }
      }
      setFormData({ ...formData, researchAreas });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form with data:', formData);
      console.log('Using Telegram config:', TELEGRAM_CONFIG);

      // Send to Telegram bot
      const result = await sendToTelegram(
        TELEGRAM_CONFIG.BOT_TOKEN,
        TELEGRAM_CONFIG.CHAT_ID,
        formData
      );

      console.log('Telegram response:', result);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      setFormData({
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        organizationType: '',
        researchAreas: [],
        projectType: '',
        timeline: '',
        budget: '',
        currentResearch: '',
        innovationGoals: '',
        collaborationType: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please check the console for details and try again.');
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
            icon={faFlask} 
            style={{ 
              fontSize: '3rem', 
              color: 'var(--accent-color)',
              marginBottom: '1rem'
            }} 
          />
          <h1 style={{ marginBottom: '0.5rem' }}>R&D Innovations</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Partner with our R&D team to drive innovation and technological advancement.
            Fill out the form below to discuss potential collaboration opportunities.
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
            <h3 style={{ color: '#27ae60', marginBottom: '1rem' }}>Request Submitted!</h3>
            <p>Thank you for your interest in our R&D Innovations. Our team will contact you shortly to discuss potential collaboration.</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div className="form-group">
                <label htmlFor="organizationName">
                  <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '0.5rem' }} />
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contactPerson">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
                  Contact Person
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="organizationType">
                  <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '0.5rem' }} />
                  Organization Type
                </label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select organization type</option>
                  <option value="university">University</option>
                  <option value="research">Research Institute</option>
                  <option value="corporate">Corporate R&D</option>
                  <option value="startup">Startup</option>
                  <option value="government">Government Agency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="projectType">
                  <FontAwesomeIcon icon={faLightbulb} style={{ marginRight: '0.5rem' }} />
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select project type</option>
                  <option value="research">Research Project</option>
                  <option value="development">Development Project</option>
                  <option value="innovation">Innovation Project</option>
                  <option value="collaboration">Collaborative Research</option>
                  <option value="consulting">R&D Consulting</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timeline">
                  <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.5rem' }} />
                  Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select timeline</option>
                  <option value="immediate">Immediate (Within 1 month)</option>
                  <option value="1-3">1-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6+">6+ months</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="budget">
                  <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.5rem' }} />
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select budget range</option>
                  <option value="<50k">Less than $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="collaborationType">
                  <FontAwesomeIcon icon={faHandshake} style={{ marginRight: '0.5rem' }} />
                  Collaboration Type
                </label>
                <select
                  id="collaborationType"
                  name="collaborationType"
                  value={formData.collaborationType}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select collaboration type</option>
                  <option value="joint">Joint Research</option>
                  <option value="funded">Funded Research</option>
                  <option value="consulting">Consulting</option>
                  <option value="partnership">Strategic Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Research Areas</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  'Artificial Intelligence',
                  'Machine Learning',
                  'Data Science',
                  'Computer Vision',
                  'Natural Language Processing',
                  'Robotics',
                  'IoT',
                  'Blockchain',
                  'Cybersecurity',
                  'Quantum Computing',
                  'Biotechnology',
                  'Clean Energy'
                ].map((area) => (
                  <label key={area} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      name="researchAreas"
                      value={area}
                      checked={formData.researchAreas.includes(area)}
                      onChange={handleChange}
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="currentResearch">Current Research Overview</label>
              <textarea
                id="currentResearch"
                name="currentResearch"
                value={formData.currentResearch}
                onChange={handleChange}
                rows="3"
                className="form-control"
                placeholder="Please provide an overview of your current research activities..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="innovationGoals">Innovation Goals</label>
              <textarea
                id="innovationGoals"
                name="innovationGoals"
                value={formData.innovationGoals}
                onChange={handleChange}
                rows="3"
                className="form-control"
                placeholder="What are your key innovation goals and objectives?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows="3"
                className="form-control"
                placeholder="Please provide any additional information about your research interests or collaboration requirements..."
              />
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
                margin: '0 auto'
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default RDInnovationsForm; 