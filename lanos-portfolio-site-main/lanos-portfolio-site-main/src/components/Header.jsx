import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo/Lanos LOGO.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Team', href: '#team' },
    { name: 'Insights', href: '#insights' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const navItemVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.1 * i, duration: 0.4 }
    })
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
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Lanos Logo" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
          </Link>
        </div>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                custom={index}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  cursor: 'pointer',
                  color: 'var(--text-color)',
                  fontWeight: 500,
                  padding: '0.5rem 0',
                  textDecoration: 'none'
                }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
              <Link to="/benefits-registration">
                <button className="btn btn-primary" style={{ marginLeft: '1rem', cursor: 'pointer' }}>
                  Get Started
                </button>
              </Link>
            </motion.div>
          </nav>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
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
        )}
      </div>

      {/* Mobile Nav */}
      {isMobile && (
        <motion.div
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{
            maxHeight: mobileMenuOpen ? '100vh' : 0,
            opacity: mobileMenuOpen ? 1 : 0,
            display: mobileMenuOpen ? 'flex' : 'none'
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            width: '100%',
            height: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            flexDirection: 'column',
            padding: mobileMenuOpen ? '1rem 0' : 0,
            zIndex: 1000
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                color: 'var(--text-color)',
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontWeight: 400,
                textDecoration: 'none',
                cursor: 'pointer',
                display: 'block',
                width: '100%'
              }}
            >
              {item.name}
            </a>
          ))}
          <div style={{ 
            padding: '1rem 2rem',
            marginTop: 'auto',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <Link to="/benefits-registration" style={{ width: '100%', display: 'block' }}>
              <button 
                className="btn btn-primary" 
                style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  backgroundColor: '#00c2ff'
                }}
              >
                Get Started
              </button>
            </Link>
            <Link to="/event" style={{ width: '100%', display: 'block' }}>
              <button 
                className="btn btn-secondary" 
                style={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  backgroundColor: 'transparent',
                  border: '2px solid #00c2ff',
                  color: '#00c2ff'
                }}
              >
                Register for Event
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;