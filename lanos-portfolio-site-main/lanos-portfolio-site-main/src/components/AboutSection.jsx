import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const statsRef = useRef(null);
  
  useEffect(() => {
    if (isInView && statsRef.current) {
      // Animate stats counters
      const counters = statsRef.current.querySelectorAll('.stat-number');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        
        const updateCounter = () => {
          const increment = target / 50;
          
          if (count < target) {
            count += increment;
            counter.textContent = Math.ceil(count);
            setTimeout(updateCounter, 30);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
      });
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} id="about" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid"
          style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}
        >
          {/* Left column - About content */}
          <motion.div variants={itemVariants}>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              What We Are & Who We Are
            </h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              Founded in 2024 in Sagar, Madhya Pradesh, Lanos is a lean, innovation-obsessed startup tackling education and technology challenges through integrated R&D and gamified learning platforms.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission & Vision</h3>
              <p>
              We aim to democratize future-ready tech education and deliver transformative research outcomes, establishing Lanos as the global epicenter for EdTech and R&D breakthroughs—catalyzing 25,000 jobs in Sagar, MP by 2027.
              </p>
            </div>
            
            {/* <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Vision</h3>
              <p>
                Establish Lanos as the global epicenter for EdTech & R&D breakthroughs, catalyzing 25,000 jobs in Sagar, MP by 2027.
              </p>
            </div> */}
          </motion.div>
          
          {/* Right column - Stats */}
          <motion.div 
            variants={itemVariants}
            ref={statsRef}
            className="stats-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem'
            }}
          >
            <div className="stat-card" style={statCardStyle}>
              <h3 className="stat-number" data-target="2024">0</h3>
              <p>Founded</p>
            </div>
            
            <div className="stat-card" style={statCardStyle}>
              <h3 className="stat-number" data-target="25000">0</h3>
              <p>Jobs Target by 2027</p>
            </div>
            
            <div className="stat-card" style={statCardStyle}>
              <h3 className="stat-number" data-target="5">0</h3>
              <p>Core Services</p>
            </div>
            
            <div className="stat-card" style={statCardStyle}>
              <h3 className="stat-number" data-target="10">0</h3>
              <p>R&D Innovations</p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Values section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ marginTop: '6rem' }}
        >
          <h2 className="section-title">Our Core Values</h2>
          
          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <motion.div variants={itemVariants} className="value-card" style={valueCardStyle}>
              <div className="value-icon" style={valueIconStyle}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.27002 6.96002L12 12L20.73 6.96002" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22.08V12" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </div>
              <h3>Innovation</h3>
              <p>We constantly push boundaries to create cutting-edge solutions that transform education and technology.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="value-card" style={valueCardStyle}>
              <div className="value-icon" style={valueIconStyle}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Employment Generation</h3>
              <p>We believe in generating more employment opportunities in regions where engineers and freshers struggle to find growth-oriented jobs.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="value-card" style={valueCardStyle}>
              <div className="value-icon" style={valueIconStyle}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Agility</h3>
              <p>We adapt quickly to changing environments and embrace new challenges with enthusiasm.</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="value-card" style={valueCardStyle}>
              <div className="value-icon" style={valueIconStyle}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Collaboration</h3>
              <p>We believe that collaboration is the key to rapid and sustainable growth in the technological landscape.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const statCardStyle = {
  backgroundColor: 'rgba(30, 30, 30, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '2rem',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'default'
};

const valueCardStyle = {
  backgroundColor: 'rgba(30, 30, 30, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '2rem',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '100%'
};

const valueIconStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 194, 255, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto 1.5rem'
};

export default AboutSection;