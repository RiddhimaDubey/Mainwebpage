import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BenefitsSection = () => {
  const navigate = useNavigate();
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

  const beneficiaries = [
    {
      title: "Students",
      benefits: [
        "Access to cutting-edge learning platforms",
        "Hands-on experience with emerging technologies",
        "Personalized learning paths",
        "Industry-relevant skills development",
        "Enhanced job prospects"
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Working Professionals",
      benefits: [
        "Upskilling opportunities in emerging technologies",
        "Flexible learning schedules",
        "Industry-recognized certifications",
        "Career advancement pathways",
        "Networking with industry experts"
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Academic Institutions",
      benefits: [
        "Modern curriculum integration",
        "Faculty development programs",
        "Research collaboration opportunities",
        "Access to innovative teaching methodologies",
        "Enhanced student engagement and outcomes"
      ],
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 3H8C9.06087 3 10.0783 3.42143 10.8284 4.17157C11.5786 4.92172 12 5.93913 12 7V21C12 20.2044 11.6839 19.4413 11.1213 18.8787C10.5587 18.3161 9.79565 18 9 18H2V3Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 3H16C14.9391 3 13.9217 3.42143 13.1716 4.17157C12.4214 4.92172 12 5.93913 12 7V21C12 20.2044 12.3161 19.4413 12.8787 18.8787C13.4413 18.3161 14.2044 18 15 18H22V3Z" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const handleNavigate = (title) => {
    if (title === "Students") {
      navigate('/student-benefits#student-registration-form');
    } else if (title === "Working Professionals") {
      navigate('/professional-benefits#professional-registration-form');
    } else if (title === "Academic Institutions") {
      navigate('/institution-benefits#institution-registration-form');
    } else {
      navigate('/benefits-registration');
    }
  };

  return (
    <section ref={sectionRef} id="benefits" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="section-title">Who Benefits</h2>
          <div className="grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {beneficiaries.map((beneficiary, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="benefit-card"
                style={{
                  backgroundColor: 'rgba(30, 30, 30, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '10px',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                whileHover={{
                  y: -10,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => handleNavigate(beneficiary.title)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 194, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1rem'
                  }}>
                    {beneficiary.icon}
                  </div>
                  <h3 style={{ margin: 0 }}>{beneficiary.title}</h3>
                </div>
                
                <ul style={{ paddingLeft: '1.5rem', flex: '1' }}>
                  {beneficiary.benefits.map((benefit, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      viewport={{ once: true }}
                      style={{ marginBottom: '0.5rem' }}
                    >
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
                
                {(beneficiary.title === "Students" || beneficiary.title === "Working Professionals" || beneficiary.title === "Academic Institutions") && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{ 
                      marginTop: 'auto', 
                      textAlign: 'center',
                      width: '100%',
                      paddingTop: '1.5rem'
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(beneficiary.title);
                      }}
                      style={{
                        backgroundColor: '#00c2ff',
                        color: '#000',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 10px rgba(0, 194, 255, 0.3)',
                        width: '80%'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#33ceff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 194, 255, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#00c2ff';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 194, 255, 0.3)';
                      }}
                    >
                    Register now
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
