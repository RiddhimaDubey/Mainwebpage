import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo/Lanos LOGO.png';

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: 'Home', href: isHomePage ? '#hero' : '/' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Services', href: isHomePage ? '#services' : '/#services' },
    { name: 'Research', href: isHomePage ? '#research' : '/#research' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
    { name: 'Blog', href: isHomePage ? '#insights' : '/#insights' }
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * i,
        duration: 0.4
      }
    })
  };

  const eventButtonVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    } else if (href.includes('#')) {
      // For links like '/#about' when not on homepage
      setMobileMenuOpen(false);
    } else {
      // For regular links like '/register'
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'scrolled' : ''}`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem 0',
        zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Lanos Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
              >
                {item.href.startsWith('#') || item.href.includes('#') ? (
                  <a
                    href={item.href}
                    style={{ cursor: 'pointer', color: 'var(--text-color)', fontWeight: 500, position: 'relative', padding: '0.5rem 0', textDecoration: 'none' }}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    style={{ cursor: 'pointer', color: 'var(--text-color)', fontWeight: 500, position: 'relative', padding: '0.5rem 0', textDecoration: 'none' }}
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <motion.div
                variants={eventButtonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  to="/event" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    border: '2px solid var(--primary-color)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    marginLeft: '1rem'
                  }}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  Register for Event
                </Link>
              </motion.div>
            </motion.div>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div className="mobile-menu-btn">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-color)',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <motion.div
          className="mobile-nav"
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{
            maxHeight: mobileMenuOpen ? '100vh' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
            display: mobileMenuOpen ? 'flex' : 'none'
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: '60px', // Height of the header
            left: 0,
            width: '100%',
            height: 'calc(100vh - 60px)', // Full height minus header
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            flexDirection: 'column',
            padding: mobileMenuOpen ? '1rem 0' : 0,
            overflow: 'auto',
            zIndex: 99
          }}
        >
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%',
            justifyContent: 'space-between'
          }}>
            <div>
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith('#') || item.href.includes('#') ? (
                    <a
                      href={item.href}
                      className="mobile-nav-link"
                      style={{
                        color: 'var(--text-color)',
                        padding: '1rem 2rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        fontWeight: 400,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="mobile-nav-link"
                      style={{
                        color: 'var(--text-color)',
                        padding: '1rem 2rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        fontWeight: 400,
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div style={{ 
              padding: '1rem 2rem', 
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              marginTop: 'auto',
              position: 'sticky',
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)'
            }}>
              <Link
                to="/event"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  padding: '1rem',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: 'white',
                  backgroundColor: 'var(--primary-color)',
                  textAlign: 'center',
                  border: '2px solid var(--primary-color)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
              >
                <FontAwesomeIcon icon={faCalendarAlt} />
                Register for Event
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;