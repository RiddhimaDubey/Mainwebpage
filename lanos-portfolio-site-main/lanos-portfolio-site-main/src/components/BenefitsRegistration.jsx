import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faGraduationCap, faBriefcase, faUniversity } from '@fortawesome/free-solid-svg-icons';

// Import form components
import StudentForm from './forms/StudentForm';
import ProfessionalForm from './forms/ProfessionalForm';
import InstitutionForm from './forms/InstitutionForm';

const BenefitsRegistration = () => {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const handleBack = () => {
    if (activeForm) {
      setActiveForm(null);
    } else {
      navigate('/');
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'student':
        return <StudentForm onBack={() => setActiveForm(null)} />;
      case 'professional':
        return <ProfessionalForm onBack={() => setActiveForm(null)} />;
      case 'institution':
        return <InstitutionForm onBack={() => setActiveForm(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="benefits-registration-container" style={{ 
      minHeight: 'calc(100vh - 200px)', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      marginTop: '80px'
    }}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="registration-header"
        style={{ textAlign: 'center', marginBottom: '2rem', width: '100%', maxWidth: '1000px' }}
      >
        <button 
          onClick={handleBack}
          style={{
            background: 'transparent',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            color: '#6e8efb',
            padding: '0.5rem',
            marginBottom: '1rem',
            alignSelf: 'flex-start'
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} />
          Back
        </button>
        <h1>Who Benefits Registration</h1>
        <p>Select your category to register and learn how you can benefit from our services</p>
      </motion.div>

      {!activeForm ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            width: '100%',
            maxWidth: '1000px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {/* Student Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onClick={() => setActiveForm('student')}
          >
            <div style={{
              backgroundColor: 'rgba(110, 142, 251, 0.1)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '2.5rem', color: '#6e8efb' }} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Students</h2>
            <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Access cutting-edge learning platforms, gain hands-on experience with emerging technologies, and develop industry-relevant skills.
            </p>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#6e8efb',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                marginTop: 'auto'
              }}
            >
              Register as Student
            </button>
          </motion.div>

          {/* Professional Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onClick={() => setActiveForm('professional')}
          >
            <div style={{
              backgroundColor: 'rgba(0, 194, 255, 0.1)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: '2.5rem', color: '#00c2ff' }} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Working Professionals</h2>
            <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Upskill with emerging technologies, access flexible learning schedules, and advance your career with industry-recognized certifications.
            </p>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#00c2ff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                marginTop: 'auto'
              }}
            >
              Register as Professional
            </button>
          </motion.div>

          {/* Institution Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
            onClick={() => setActiveForm('institution')}
          >
            <div style={{
              backgroundColor: 'rgba(39, 174, 96, 0.1)',
              borderRadius: '50%',
              width: '80px',
              height: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <FontAwesomeIcon icon={faUniversity} style={{ fontSize: '2.5rem', color: '#27ae60' }} />
            </div>
            <h2 style={{ marginBottom: '1rem' }}>Academic Institutions</h2>
            <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Integrate modern curriculum, develop faculty programs, and enhance student engagement with innovative teaching methodologies.
            </p>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                marginTop: 'auto'
              }}
            >
              Register as Institution
            </button>
          </motion.div>
        </motion.div>
      ) : (
        renderForm()
      )}
    </div>
  );
};

export default BenefitsRegistration;