import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import goggle from '../assets/goggle.png';
import latpot from '../assets/img1.png';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  const services = [
    {
      title: "Gamified EdTech Platform",
      description: "Interactive, game-based learning experiences that make education engaging and effective for students of all ages.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.27002 6.96002L12 12L20.73 6.96002" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.08V12" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Enterprise Training Solutions",
      description: "Customized training programs for businesses to upskill their workforce with cutting-edge technology education.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Consulting & Curriculum Design",
      description: "Expert guidance on educational technology implementation and curriculum development for modern learning needs.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const researchProjects = [
    
      {
        title: "Smart Goggle",
        description: "Revolutionary wearable technology that enhances learning through augmented reality, providing immersive educational experiences.",
        image: goggle,
        link: "/projects/smart-goggle" // <-- Internal route or external URL
      },
      {
        title: "Project Aurora",
        description: "Advanced AI-driven learning platform that adapts to individual learning styles and provides personalized education paths.",
        image: latpot,
        link: "/projects/project-aurora"
      }
  ];
    
  

  return (
    <section ref={sectionRef} id="services" style={{ padding: '8rem 0', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="section-title">Our Products and Services</h2>
          
          {/* Services */}
          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="service-card"
                style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 194, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {service.icon}
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Research Projects */}
          <motion.h3 
            id="research"
            variants={itemVariants}
            style={{ 
              fontSize: '1.8rem', 
              marginTop: '5rem', 
              marginBottom: '2rem',
              textAlign: 'center'
            }}
          >
            R&D Innovations
          </motion.h3>
          
          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
          }}>
            {researchProjects.map((project, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="research-card"
                style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%'
                }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div style={{
                  height: '200px',
                  backgroundColor: 'rgba(0, 194, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  {/* Placeholder for project image */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: index === 0 ? 'rgba(0, 194, 255, 0.2)' : 'rgba(255, 62, 108, 0.2)'
                  }}>
                    <h3 style={{ color: index === 0 ? 'var(--accent-color)' : 'var(--accent-color-alt)' }}>
                    
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'cover'
                         
                      }} 
                    />
                    </h3>
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem' }}>{project.title}</h3>
                  
                  <p>{project.description}</p>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.button 
                      className="btn btn-outline"
                      style={{ marginTop: '1.5rem' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </a>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;