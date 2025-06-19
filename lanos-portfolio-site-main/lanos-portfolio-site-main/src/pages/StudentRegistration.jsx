import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { studentRegistrationAPI } from '../services/api';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    collegeName: '',
    currentCourseAndYear: '',
    cityTown: '',
    preferredCourse: '',
    hearAboutExam: '',
    confirmation: false,
    referralCode: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [availableSources, setAvailableSources] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    if (window.location.hash === '#student-registration-form' && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Load available courses and sources
    loadAvailableOptions();
  }, []);

  const loadAvailableOptions = async () => {
    try {
      const [courses, sources] = await Promise.all([
        studentRegistrationAPI.getAvailableCourses(),
        studentRegistrationAPI.getAvailableSources()
      ]);
      setAvailableCourses(courses);
      setAvailableSources(sources);
    } catch (error) {
      console.error('Failed to load available options:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Mobile number must be 10 digits';
    }
    
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      errors.emailAddress = 'Please enter a valid email address';
    }
    
    if (!formData.collegeName.trim()) {
      errors.collegeName = 'College name is required';
    }
    
    if (!formData.currentCourseAndYear.trim()) {
      errors.currentCourseAndYear = 'Current course and year is required';
    }
    
    if (!formData.cityTown.trim()) {
      errors.cityTown = 'City/Town is required';
    }
    
    if (!formData.hearAboutExam) {
      errors.hearAboutExam = 'Please select how you heard about the exam';
    }
    
    if (!formData.confirmation) {
      errors.confirmation = 'Please confirm your registration';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Check if email already exists
      const emailCheck = await studentRegistrationAPI.checkEmailExists(formData.emailAddress);
      if (emailCheck.exists) {
        setSubmitStatus({
          success: false,
          message: 'An account with this email address already exists.'
        });
        return;
      }
      
      // Check if mobile number already exists
      const mobileCheck = await studentRegistrationAPI.checkMobileExists(formData.mobileNumber);
      if (mobileCheck.exists) {
        setSubmitStatus({
          success: false,
          message: 'An account with this mobile number already exists.'
        });
        return;
      }
      
      // Prepare data for backend
      const registrationData = {
        ...formData,
        preferredCourse: formData.preferredCourse || null,
        referralCode: formData.referralCode || null
      };
      
      // Submit to backend
      const response = await studentRegistrationAPI.create(registrationData);
      
      setSubmitStatus({
        success: true,
        message: 'Registration successful! Your registration ID is: ' + response.id + '. We will contact you soon with more information.'
      });
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        mobileNumber: '',
        emailAddress: '',
        collegeName: '',
        currentCourseAndYear: '',
        cityTown: '',
        preferredCourse: '',
        hearAboutExam: '',
        confirmation: false,
        referralCode: ''
      });
      
    } catch (error) {
      console.error('Registration failed:', error);
      setSubmitStatus({
        success: false,
        message: error.message || 'Registration failed. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName];
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${hasError ? 'rgba(255, 76, 76, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
    borderRadius: '5px',
    color: 'var(--text-color)',
    fontSize: '1rem'
  });

  const errorStyle = {
    color: 'rgba(255, 76, 76, 0.8)',
    fontSize: '0.8rem',
    marginTop: '0.25rem'
  };

  return (
    <section style={{ padding: '8rem 0 4rem' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="section-title">Student Registration</h1>
          <p style={{ 
            fontSize: '1.1rem', 
            maxWidth: '800px', 
            margin: '0 auto 3rem',
            textAlign: 'center'
          }}>
            Register for our student benefits program and get access to exclusive learning resources and opportunities.
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
            id="student-registration-form"
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
              <label 
                htmlFor="fullName" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                style={inputStyle(getFieldError('fullName'))}
              />
              {getFieldError('fullName') && (
                <div style={errorStyle}>{getFieldError('fullName')}</div>
              )}
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label 
                  htmlFor="emailAddress" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  style={inputStyle(getFieldError('emailAddress'))}
                />
                {getFieldError('emailAddress') && (
                  <div style={errorStyle}>{getFieldError('emailAddress')}</div>
                )}
              </div>
              <div>
                <label 
                  htmlFor="mobileNumber" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  Mobile Number (10 digits) *
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  maxLength="10"
                  style={inputStyle(getFieldError('mobileNumber'))}
                />
                {getFieldError('mobileNumber') && (
                  <div style={errorStyle}>{getFieldError('mobileNumber')}</div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="collegeName" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                College/Institution Name *
              </label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                style={inputStyle(getFieldError('collegeName'))}
              />
              {getFieldError('collegeName') && (
                <div style={errorStyle}>{getFieldError('collegeName')}</div>
              )}
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr', 
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label 
                  htmlFor="currentCourseAndYear" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  Current Course and Year *
                </label>
                <input
                  type="text"
                  id="currentCourseAndYear"
                  name="currentCourseAndYear"
                  value={formData.currentCourseAndYear}
                  onChange={handleChange}
                  placeholder="e.g., B.Tech CSE 3rd Year"
                  style={inputStyle(getFieldError('currentCourseAndYear'))}
                />
                {getFieldError('currentCourseAndYear') && (
                  <div style={errorStyle}>{getFieldError('currentCourseAndYear')}</div>
                )}
              </div>
              <div>
                <label 
                  htmlFor="cityTown" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  City/Town *
                </label>
                <input
                  type="text"
                  id="cityTown"
                  name="cityTown"
                  value={formData.cityTown}
                  onChange={handleChange}
                  style={inputStyle(getFieldError('cityTown'))}
                />
                {getFieldError('cityTown') && (
                  <div style={errorStyle}>{getFieldError('cityTown')}</div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="preferredCourse" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                Preferred Course (Optional)
              </label>
              <select
                id="preferredCourse"
                name="preferredCourse"
                value={formData.preferredCourse}
                onChange={handleChange}
                style={{
                  ...inputStyle(false),
                  height: '45px'
                }}
              >
                <option value="">Select Preferred Course</option>
                {availableCourses.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="hearAboutExam" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                How did you hear about us? *
              </label>
              <select
                id="hearAboutExam"
                name="hearAboutExam"
                value={formData.hearAboutExam}
                onChange={handleChange}
                style={{
                  ...inputStyle(getFieldError('hearAboutExam')),
                  height: '45px'
                }}
              >
                <option value="">Select Source</option>
                {availableSources.map((source, index) => (
                  <option key={index} value={source}>{source}</option>
                ))}
              </select>
              {getFieldError('hearAboutExam') && (
                <div style={errorStyle}>{getFieldError('hearAboutExam')}</div>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label 
                htmlFor="referralCode" 
                style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                Referral Code (Optional)
              </label>
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code if you have one"
                style={inputStyle(false)}
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <input
                  type="checkbox"
                  name="confirmation"
                  checked={formData.confirmation}
                  onChange={handleChange}
                  style={{
                    width: 'auto',
                    margin: 0
                  }}
                />
                <span>I confirm that all the information provided is accurate and I agree to the terms and conditions *</span>
              </label>
              {getFieldError('confirmation') && (
                <div style={errorStyle}>{getFieldError('confirmation')}</div>
              )}
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

          <style>
            {`
              #student-registration-form select,
              #student-registration-form select option {
                color: white !important;
                background-color: #000000 !important;
              }
              #student-registration-form select option:hover {
                background-color: #1a1a1a !important;
              }
              #student-registration-form input[type="checkbox"] {
                accent-color: #00c2ff;
              }
            `}
          </style>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentRegistration;
