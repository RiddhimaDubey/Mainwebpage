import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Testimonial carousel state
  const [[currentTestimonial, direction], setCurrentTestimonial] = useState([0, 0]);
  const testimonials = [
    {
      text: "Lanos Institute has completely transformed our approach to technical training. Their gamified learning platform has increased engagement and knowledge retention among our team by over 40%.",
      author: "Sarah Johnson",
      position: "CTO, TechVision Inc."
    },
    {
      text: "The research collaboration with Lanos has been instrumental in developing our new AI-driven educational tools. Their expertise and innovative thinking have accelerated our product development significantly.",
      author: "Michael Chen",
      position: "Head of Innovation, EduTech Solutions"
    },
    {
      text: "As someone who struggled with traditional learning methods, Lanos' approach was a revelation. Their interactive modules made complex programming concepts accessible and even enjoyable.",
      author: "Priya Sharma",
      position: "Software Engineer & Former Student"
    },
    {
      text: "Partnering with Lanos for our corporate training needs has yielded exceptional results. Our employees are more engaged and better equipped to handle technological challenges.",
      author: "Robert Williams",
      position: "HR Director, Global Systems"
    }
  ];

  const paginate = (newDirection) => {
    const nextIndex = (currentTestimonial + newDirection + testimonials.length) % testimonials.length;
    setCurrentTestimonial([nextIndex, newDirection]);
  };

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      position: "absolute"
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative"
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      position: "absolute"
    })
  };
  
  // Auto-advance testimonials
  useEffect(() => {
    const autoAdvanceInterval = setInterval(() => {
      paginate(1);
    }, 5000); // Change testimonial every 5 seconds
    
    return () => clearInterval(autoAdvanceInterval);
  }, [currentTestimonial]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section ref={sectionRef} id="testimonials" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ textAlign: 'center' }}
        >
          <h2 className="section-title">What People Say About Us</h2>
          
          <div className="testimonial-carousel" style={testimonialCarouselStyle}>
            {/* Left navigation button */}
            <button 
              onClick={() => paginate(-1)}
              style={{
                ...carouselButtonStyle,
                position: 'absolute',
                left: '-25px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '-15px' }}>
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="testimonial-container" style={testimonialContainerStyle}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 0.3 },
                    opacity: { duration: 0.2 }
                  }}
                  className="testimonial"
                  style={testimonialStyle}
                >
                  <div className="testimonial-content" style={testimonialContentStyle}>
                    <div className="quote-icon" style={quoteIconStyle}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 11L7 16H5L7 11H5V7H10V11ZM18 11L15 16H13L15 11H13V7H18V11Z" fill="#00c2ff" />
                      </svg>
                    </div>
                    <p style={testimonialTextStyle}>{testimonials[currentTestimonial].text}</p>
                    <div style={testimonialAuthorStyle}>
                      <h4>{testimonials[currentTestimonial].author}</h4>
                      <p>{testimonials[currentTestimonial].position}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right navigation button */}
            <button 
              onClick={() => paginate(1)}
              style={{
                ...carouselButtonStyle,
                position: 'absolute',
                right: '-25px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '-15px' }}>
                <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonial carousel styles
const testimonialCarouselStyle = {
  width: '100%',
  maxWidth: '800px',
  marginTop: '3rem',
  position: 'relative',
  overflow: 'visible',
  margin: '3rem auto 0'
};

const testimonialContainerStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 0',
  minHeight: '300px', // Set a fixed height to prevent layout shifts
  overflow: 'hidden' // Hide overflow content during transitions
};

const testimonialStyle = {
  width: '100%',
  maxWidth: '800px',
  top: 0,
  left: 0,
  right: 0
};

const testimonialContentStyle = {
  backgroundColor: 'rgba(30, 30, 30, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '3rem',
  textAlign: 'center',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  position: 'relative'
};

const quoteIconStyle = {
  position: 'absolute',
  top: '1.5rem',
  left: '1.5rem',
  opacity: 0.5
};

const testimonialTextStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.8',
  marginBottom: '2rem',
  fontStyle: 'italic'
};

const testimonialAuthorStyle = {
  marginTop: '1.5rem'
};

const carouselButtonStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: 'rgba(0, 194, 255, 0.2)',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: 'rgba(0, 194, 255, 0.4)'
  }
};

export default TestimonialsSection;