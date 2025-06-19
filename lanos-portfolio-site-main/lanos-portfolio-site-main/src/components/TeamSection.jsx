import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [selectedMember, setSelectedMember] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const generateColorBackground = (index) => {
    const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c', '#f39c12', '#27ae60', '#2980b9', '#8e44ad', '#c0392b', '#d35400'];
    return colors[index % colors.length];
  };

  const getInitials = (name) => name.split(' ').map(part => part[0]).join('').toUpperCase();

  const teamMembers = [
    {
      name: "Dr. Aisha Patel",
      role: "Chief Research Officer",
      bio: "With a Ph.D. in Computer Science and 10+ years in AI research...",
      color: generateColorBackground(0),
      linkedin: "https://linkedin.com/in/aisha-patel",
      twitter: "https://twitter.com/aishapatel"
    },
   
    {
      name: "Dr. John Doe",
      role: "Lead Data Scientist",
      bio: "Expert in machine learning and data analytics...",
      color: generateColorBackground(1),
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe"
    },
    {
      name: "Jane Smith",
      role: "Software Engineer",
      bio: "Passionate about building scalable web applications...",
      color: generateColorBackground(2),
      linkedin: "https://linkedin.com/in/janesmith",
      twitter: "https://twitter.com/janesmith"
    },
    {
      name: "Michael Brown",
      role: "UX/UI Designer",
      bio: "Designing user-friendly interfaces and experiences...",
      color: generateColorBackground(3),
      linkedin: "https://linkedin.com/in/michaelbrown",
      twitter: "https://twitter.com/michaelbrown"
    },
    {
      name: "Emily Davis",
      role: "Marketing Specialist",
      bio: "Expert in digital marketing strategies and social media...",
      color: generateColorBackground(4),
      linkedin: "https://linkedin.com/in/emilydavis",
      twitter: "https://twitter.com/emilydavis"
    },
    {
      name: "David Wilson",
      role: "Product Manager",
      bio: "Bridging the gap between technology and business...",
      color: generateColorBackground(5),
      linkedin: "https://linkedin.com/in/davidwilson",
      twitter: "https://twitter.com/davidwilson"
    },
    {
      name: "Sarah Johnson",
      role: "Data Analyst",
      bio: "Transforming data into actionable insights...",
      color: generateColorBackground(6),
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson"
    },
    {
      name: "Chris Lee",
      role: "DevOps Engineer",
      bio: "Ensuring smooth deployment and operation of applications...",
      color: generateColorBackground(7),
      linkedin: "https://linkedin.com/in/chrislee",
      twitter: "https://twitter.com/chrislee"
    }


    
  ];

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section ref={sectionRef} id="team" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ textAlign: 'center' }}
        >
          <h2 className="section-title">Our Team & Culture</h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
            Our nimble, multidisciplinary teams work collaboratively in open-plan labs...
          </p>

          <div style={teamGridStyle}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                style={teamMemberStyle}
                onClick={() => handleMemberClick(member)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleMemberClick(member)}
                aria-label={`More about ${member.name}`}
              >
                <div style={memberImageContainerStyle}>
                  <div style={{ ...memberAvatarStyle, backgroundColor: member.color }}>
                    <span style={initialsStyle}>{getInitials(member.name)}</span>
                  </div>
                </div>
                <div style={memberInfoStyle}>
                  <h3>{member.name}</h3>
                  <h4 style={{ color: '#00c2ff', marginBottom: '0.5rem' }}>{member.role}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
            style={modalBackdropStyle}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={modalContainerStyle}
            >
              <button onClick={closeModal} style={closeButtonStyle} aria-label="Close">
                <FontAwesomeIcon icon={faTimes} />
              </button>

              <div style={modalContentStyle}>
                <div style={modalImageContainerStyle}>
                  <div style={{ ...modalAvatarStyle, backgroundColor: selectedMember.color }}>
                    <span style={modalInitialsStyle}>{getInitials(selectedMember.name)}</span>
                  </div>
                </div>

                <div style={modalInfoStyle}>
                  <h2 id="modal-title" style={{ marginBottom: '0.5rem' }}>{selectedMember.name}</h2>
                  <h3 style={{ color: '#00c2ff', marginBottom: '1rem' }}>{selectedMember.role}</h3>
                  <p style={{ marginBottom: '1rem' }}>{selectedMember.bio}</p>
                  <div>
                    <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
                      <FontAwesomeIcon icon={faLinkedin} size="lg" />
                    </a>
                    <a href={selectedMember.twitter} target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection;

// ------------------------------
// ✅ Style Objects (same file)
// ------------------------------
const teamGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
};

const teamMemberStyle = {
  cursor: 'pointer',
  background: '#101010',
  padding: '1.5rem',
  borderRadius: '1rem',
  textAlign: 'center',
  transition: 'transform 0.3s',
};

const memberImageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
};

const memberAvatarStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const initialsStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
};

const memberInfoStyle = {
  color: '#fff',
};

const modalBackdropStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const modalContainerStyle = {
  backgroundColor: '#181818',
  color: '#fff',
  padding: '2rem',
  borderRadius: '1rem',
  maxWidth: '600px',
  width: '90%',
  boxShadow: '0 0 30px rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: '90vh',
  overflowY: 'auto',
  zIndex: 10000, // keep high zIndex for modal
};

const closeButtonStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '1.25rem',
  cursor: 'pointer',
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
};

const modalImageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const modalAvatarStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontSize: '2rem',
  fontWeight: 'bold',
};

const modalInitialsStyle = {
  fontSize: '2rem',
  fontWeight: '700',
};

const modalInfoStyle = {
  textAlign: 'center',
};

const iconLinkStyle = {
  color: '#00c2ff',
  margin: '0 0.5rem',
  textDecoration: 'none',
  fontSize: '1.25rem',
};


