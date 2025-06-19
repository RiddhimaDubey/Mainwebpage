import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faUser, faEnvelope, faPhone, faBriefcase, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { sendToTelegram } from '../../utils/telegramNotifier';
import { TELEGRAM_CONFIG } from '../../config/telegram';

const EnterpriseTrainingForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: '',
    industry: '',
    trainingNeeds: [],
    employeeCount: '',
    timeline: '',
    budget: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const trainingNeeds = [...formData.trainingNeeds];
      if (checked) {
        trainingNeeds.push(value);
      } else {
        const index = trainingNeeds.indexOf(value);
        if (index > -1) {
          trainingNeeds.splice(index, 1);
        }
      }
      setFormData({ ...formData, trainingNeeds });
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
        {
          ...formData,
          formType: 'Enterprise Training Form'
        }
      );

      console.log('Telegram response:', result);
      
      setSubmitSuccess(true);
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        companySize: '',
        industry: '',
        trainingNeeds: [],
        employeeCount: '',
        timeline: '',
        budget: '',
        additionalInfo: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
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
            icon={faBuilding} 
            style={{ 
              fontSize: '3rem', 
              color: 'var(--accent-color)',
              marginBottom: '1rem'
            }} 
          />
          <h1 style={{ marginBottom: '0.5rem' }}>Enterprise Training</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Transform your workforce with our customized enterprise training solutions.
            Fill out the form below to discuss your organization's training needs.
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
            <p>Thank you for your interest in our Enterprise Training solutions. Our team will contact you shortly to discuss your requirements.</p>
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
                <label htmlFor="companyName">
                  <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '0.5rem' }} />
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
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
                <label htmlFor="companySize">
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: '0.5rem' }} />
                  Company Size
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select company size</option>
                  <option value="1-50">1-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501-1000">501-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="industry">
                  <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '0.5rem' }} />
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="employeeCount">
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: '0.5rem' }} />
                  Number of Employees to Train
                </label>
                <input
                  type="number"
                  id="employeeCount"
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeline">
                  <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.5rem' }} />
                  Training Timeline
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
                  <option value="<10k">Less than $10,000</option>
                  <option value="10k-50k">$10,000 - $50,000</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Training Needs</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  'Technical Skills',
                  'Leadership Development',
                  'Soft Skills',
                  'Digital Transformation',
                  'Project Management',
                  'Data Analytics',
                  'AI/ML Training',
                  'Cybersecurity'
                ].map((need) => (
                  <label key={need} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      name="trainingNeeds"
                      value={need}
                      checked={formData.trainingNeeds.includes(need)}
                      onChange={handleChange}
                    />
                    {need}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="additionalInfo">Additional Information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows="4"
                className="form-control"
                placeholder="Please provide any additional details about your training requirements..."
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

export default EnterpriseTrainingForm; 