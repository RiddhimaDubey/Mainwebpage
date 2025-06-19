import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faGraduationCap, 
  faBuilding, 
  faUsers, 
  faGamepad, 
  faChalkboardTeacher, 
  faHandshake, 
  faBookOpen, 
  faFlask 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebook, 
  faTwitter, 
  faLinkedin, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if it's open (handled by header component)
      window.dispatchEvent(new CustomEvent('closeMobileMenu'));
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Team', href: '#team' },
    { name: 'Insights', href: '#insights' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      style={{
        backgroundColor: '#080808',
        color: 'var(--text-color)',
        padding: '5rem 0 2rem',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3>Lanos</h3>
            <p>Agile EdTech & R&D Startup transforming technology education and innovation.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon hoverable">
                <FontAwesomeIcon icon={faTwitter} style={socialIconStyle} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon hoverable">
                <FontAwesomeIcon icon={faLinkedin} style={socialIconStyle} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon hoverable">
                <FontAwesomeIcon icon={faInstagram} style={socialIconStyle} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon hoverable">
                <FontAwesomeIcon icon={faFacebook} style={socialIconStyle} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {quickLinks.map((link) => (
                <li key={link.name} style={{ marginBottom: '0.8rem' }}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="animated-link"
                    style={{ cursor: 'pointer' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Important Links */}
          <motion.div variants={itemVariants}>
            <h3>Important Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  to="/gamified-learning" 
                  className="animated-link"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem',
                    textDecoration: 'none',
                    color: 'var(--text-color)',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <FontAwesomeIcon icon={faGamepad} style={{ color: 'var(--accent-color)' }} />
                  Gamified Learning Platform
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  to="/enterprise-training" 
                  className="animated-link"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem',
                    textDecoration: 'none',
                    color: 'var(--text-color)',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <FontAwesomeIcon icon={faBuilding} style={{ color: 'var(--accent-color)' }} />
                  Enterprise Training
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  to="/consulting-services" 
                  className="animated-link"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem',
                    textDecoration: 'none',
                    color: 'var(--text-color)',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <FontAwesomeIcon icon={faHandshake} style={{ color: 'var(--accent-color)' }} />
                  Consulting Services
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  to="/curriculum-design" 
                  className="animated-link"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem',
                    textDecoration: 'none',
                    color: 'var(--text-color)',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <FontAwesomeIcon icon={faBook} style={{ color: 'var(--accent-color)' }} />
                  Curriculum Design
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link 
                  to="/rd-innovations" 
                  className="animated-link"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem',
                    textDecoration: 'none',
                    color: 'var(--text-color)',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <FontAwesomeIcon icon={faFlask} style={{ color: 'var(--accent-color)' }} />
                  R&D Innovations
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} id="contact">
            <h3>Contact Us</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'var(--accent-color)' }} />
                <span>Sagar, Madhya Pradesh, India</span>
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <FontAwesomeIcon icon={faPhone} style={{ color: 'var(--accent-color)' }} />
                <a href="tel:+919109279790" className="animated-link">+91 91092 79790</a>
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <FontAwesomeIcon icon={faEnvelope} style={{ color: 'var(--accent-color)' }} />
                <a href="mailto:info@lanos.tech" className="animated-link">info@lanos.tech</a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          style={{ 
            marginTop: '4rem', 
            paddingTop: '2rem', 
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <p style={{ margin: 0 }}>© {currentYear} Lanos. All rights reserved.</p>
          <div>
            <Link to="/privacy-policy" className="animated-link" style={{ marginRight: '1.5rem' }}>Privacy Policy</Link>
            <Link to="/terms" className="animated-link">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

const socialIconStyle = {
  fontSize: '1.2rem',
  color: 'var(--text-color)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  transition: 'all 0.3s ease'
};

export default Footer;