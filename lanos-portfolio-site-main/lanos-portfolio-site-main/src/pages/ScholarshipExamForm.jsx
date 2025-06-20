import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faSchool, faBook, faCity, faQuestion, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { studentRegistrationAPI } from '../services/api';
import '../components/FormStyles.css';
import { useLocation } from 'react-router-dom';

const ScholarshipExamForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    collegeName: '',
    course: '',
    semester: '',
    city: '',
    preferredCourse: '',
    heardFrom: '',
    confirmation: false
  });

  const [referralCode, setReferralCode] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const preferredCourseEnumMap = {
    'Full-stack web development (Java, Python, Node)': 'FULL_STACK',
    '2D/3D Game Development (Unity, Unreal Engine)': 'GAME_DEVELOPMENT',
    'CAD Designing and development (AutoCAD, SketchUP, Revit, STAD.pro, 3dx Max)': 'CAD_DESIGN',
    'Cyber Security': 'CYBER_SECURITY',
    'Artificial Intelligence and Machine learning': 'AI_ML',
    'Data Science and analysis': 'DATA_SCIENCE',
    'AR/VR Technologies': 'AR_VR',
    'Not Sure Yet': 'NOT_SURE',
  };

  const hearAboutExamEnumMap = {
    'Poster': 'POSTER',
    'Friend': 'FRIEND',
    'WhatsApp': 'WHATSAPP',
    'Instagram': 'INSTAGRAM',
    'College Announcement': 'COLLEGE_ANNOUNCEMENT',
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref') || params.get('referral');
    if (ref && /^226100(0[1-9]|1[0-9]|20)$/.test(ref)) {
      setReferralCode(ref);
    } else {
      setReferralCode("");
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'course' && (value === '11th' || value === '12th')) {
      setFormData({
        ...formData,
        [name]: value,
        semester: 'N/A'
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Prepare data for backend (map fields as needed)
      const registrationData = {
        fullName: formData.fullName,
        mobileNumber: formData.phone,
        emailAddress: formData.email,
        collegeName: formData.collegeName,
        currentCourseAndYear: formData.course + (formData.semester && formData.semester !== 'N/A' ? ` Semester: ${formData.semester}` : ''),
        cityTown: formData.city,
        preferredCourse: preferredCourseEnumMap[formData.preferredCourse] || null,
        hearAboutExam: hearAboutExamEnumMap[formData.heardFrom],
        confirmation: formData.confirmation,
        referralCode: referralCode || null
      };
      // Save to backend
      await studentRegistrationAPI.create(registrationData);
      setSubmitStatus({ success: true, message: 'Registration successful! We will contact you soon with more information.' });
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        collegeName: '',
        course: '',
        semester: '',
        city: '',
        preferredCourse: '',
        heardFrom: '',
        confirmation: false
      });
    } catch (error) {
      // Log the full error object for debugging
      console.error('Full error object:', error);

      // Try to log the response body if available
      if (error.response) {
        error.response.text().then(text => {
          console.error('Error response body:', text);
        });
      }

      let errorMsg = error.message || 'Registration failed. Please try again later.';
      let errorDetails = error.details || null;
      setSubmitStatus({ success: false, message: errorMsg, details: errorDetails });
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

  const isSemesterDisabled = () => {
    return formData.course === '11th' || formData.course === '12th';
  };

  // Add a function to check if the form is valid
  const isFormValid = () => {
    // Check if all required fields are filled
    const requiredFields = [
      'fullName', 
      'phone', 
      'email', 
      'collegeName', 
      'course', 
      'city', 
      'heardFrom'
    ];
    
    // If semester is required (not 11th or 12th), check it too
    if (!isSemesterDisabled() && !formData.semester) {
      return false;
    }
    
    // Check if any required field is empty
    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    
    // Check if confirmation checkbox is checked
    if (!formData.confirmation) {
      return false;
    }
    
    return true;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      paddingTop: '4rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#ffffff',
      position: 'relative',
      overflow: 'auto',
      width: '100%'
    }}>
      {/* Background gradient effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at top right, rgba(0, 194, 255, 0.15), transparent 50%), radial-gradient(circle at bottom left, rgba(255, 62, 108, 0.15), transparent 50%)',
        zIndex: 0
      }}></div>
      
      {/* Logo or branding */}
      <div style={{
        marginBottom: '2rem',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#ff3e6c',
          marginBottom: '0.5rem'
        }}>
          LANOS
        </h1>
        <h2 style={{
          fontSize: '1.5rem',
          color: '#ffffff',
          marginBottom: '1rem'
        }}>
          Scholarship Exam Registration
        </h2>
      </div>

      {/* Show error if invalid referral code */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={formVariants}
        style={{
          width: '100%',
          maxWidth: '700px',
          zIndex: 1,
          marginBottom: '2rem'
        }}
      >
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              backgroundColor: submitStatus.success ? 'rgba(39, 174, 96, 0.1)' : 'rgba(255, 76, 76, 0.1)',
              border: `1px solid ${submitStatus.success ? 'rgba(39, 174, 96, 0.3)' : 'rgba(255, 76, 76, 0.3)'}`,
              borderRadius: '10px',
              padding: '2rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
              color: submitStatus.success ? '#27ae60' : '#ff4c4c'
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>{submitStatus.success ? 'Registration Successful!' : 'Registration Failed'}</h3>
            <p>{submitStatus.message}</p>
            {submitStatus.details && (
              <ul style={{ color: '#ff4c4c', textAlign: 'left', margin: '1rem auto', maxWidth: 400 }}>
                {Object.entries(submitStatus.details).map(([field, msg]) => (
                  <li key={field}><b>{field}:</b> {msg}</li>
                ))}
              </ul>
            )}
            {submitStatus.success && (
              <button
                onClick={() => setSubmitStatus(null)}
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: 'rgba(39, 174, 96, 0.2)',
                  color: '#27ae60',
                  border: '1px solid #27ae60',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginTop: '1rem'
                }}
              >
                Submit Another Response
              </button>
            )}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} style={{ 
          width: '100%',
          backgroundColor: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '10px',
          padding: '2.5rem',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="fullName" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '5px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label htmlFor="phone" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faPhone} style={{ marginRight: '0.5rem' }} />
                Mobile Number (WhatsApp) *
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
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '5px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '0.5rem' }} />
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
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '5px',
                  color: '#ffffff',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="collegeName" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <FontAwesomeIcon icon={faSchool} style={{ marginRight: '0.5rem' }} />
              College Name *
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '5px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label htmlFor="course" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faBook} style={{ marginRight: '0.5rem' }} />
                Current Course *
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '5px',
                  color: '#ffffff',
                  fontSize: '1rem',
                  height: '45px',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em'
                }}
              >
                <option value="">Select your course</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
                <option value="BA">BA (Bachelor of Arts)</option>
                <option value="MA">MA (Master of Arts)</option>
                <option value="B.Tech">B.Tech (Bachelor of Technology)</option>
                <option value="M.Tech">M.Tech (Master of Technology)</option>
                <option value="BCA">BCA (Bachelor of Computer Applications)</option>
                <option value="MCA">MCA (Master of Computer Applications)</option>
                <option value="B.Sc">B.Sc (Bachelor of Science)</option>
                <option value="M.Sc">M.Sc (Master of Science)</option>
                <option value="B.Com">B.Com (Bachelor of Commerce)</option>
                <option value="M.Com">M.Com (Master of Commerce)</option>
                <option value="Other">Other...</option>
              </select>
            </div>
            <div>
              <label htmlFor="semester" style={{ 
                display: 'block', 
                marginBottom: '0.5rem',
                fontSize: '0.9rem'
              }}>
                <FontAwesomeIcon icon={faGraduationCap} style={{ marginRight: '0.5rem' }} />
                Semester *
              </label>
              <select
                id="semester"
                name="semester"
                value={isSemesterDisabled() ? 'N/A' : formData.semester}
                onChange={handleChange}
                required
                disabled={isSemesterDisabled()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: isSemesterDisabled() 
                    ? '#111111' 
                    : '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '5px',
                  color: isSemesterDisabled() 
                    ? '#555555' 
                    : '#ffffff',
                  fontSize: '1rem',
                  height: '45px',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1em'
                }}
              >
                <option value="">Select semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
                <option value="N/A">Not Applicable</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="city" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <FontAwesomeIcon icon={faCity} style={{ marginRight: '0.5rem' }} />
              City/Town *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '5px',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="preferredCourse" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <FontAwesomeIcon icon={faQuestion} style={{ marginRight: '0.5rem' }} />
              Preferred Course (Optional)
            </label>
            <select
              id="preferredCourse"
              name="preferredCourse"
              value={formData.preferredCourse}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '5px',
                color: '#ffffff',
                fontSize: '1rem',
                height: '45px',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1em'
              }}
            >
              <option value="">Select a course (optional)</option>
              <option value="Full-stack web development (Java, Python, Node)">Full-stack web development (Java, Python, Node)</option>
              <option value="2D/3D Game Development (Unity, Unreal Engine)">2D/3D Game Development (Unity, Unreal Engine)</option>
              <option value="CAD Designing and development (AutoCAD, SketchUP, Revit, STAD.pro, 3dx Max)">CAD Designing and development (AutoCAD, SketchUP, Revit, STAD.pro, 3dx Max)</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Artificial Intelligence and Machine learning">Artificial Intelligence and Machine learning</option>
              <option value="Data Science and analysis">Data Science and analysis</option>
              <option value="AR/VR Technologies">AR/VR Technologies</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="heardFrom" style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              How Did You Hear About the Exam? *
            </label>
            <select
              id="heardFrom"
              name="heardFrom"
              value={formData.heardFrom}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '5px',
                color: '#ffffff',
                fontSize: '1rem',
                height: '45px',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1em'
              }}
            >
              <option value="">Select an option</option>
              <option value="Poster">Poster</option>
              <option value="Friend">Friend</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Instagram">Instagram</option>
              <option value="College Announcement">College Announcement</option>
            </select>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
                required
                style={{ marginRight: '0.5rem' }}
              />
              I confirm that the above information is correct.
            </label>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: isFormValid() ? '#ff3e6c' : '#555555',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1rem',
                cursor: isFormValid() ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Register for Scholarship Exam'}
            </button>
          </div>
        </form>
      </motion.div>
      
      {/* Footer */}
      <div style={{
        marginTop: 'auto',
        textAlign: 'center',
        padding: '1rem 0',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '0.8rem',
        zIndex: 1
      }}>
        © {new Date().getFullYear()} Lanos Institute. All rights reserved.
      </div>
      
      {/* Mobile responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            form {
              padding: 1.5rem;
            }
            
            div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
              gap: 1rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ScholarshipExamForm;








