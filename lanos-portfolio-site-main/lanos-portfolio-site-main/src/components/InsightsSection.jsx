import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const InsightsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
    // Reset the subscribed state after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };

  const blogPosts = [
    {
      title: "The Future of AR in Educational Settings",
      excerpt: "Exploring how augmented reality is transforming classroom experiences and enhancing student engagement across various subjects.",
      date: "May 15, 2024",
      image: "/images/blog/ar-education.jpg",
      link: "#"
    },
    {
      title: "AI-Driven Personalization in Learning",
      excerpt: "How machine learning algorithms are creating truly adaptive learning experiences tailored to individual student needs and learning styles.",
      date: "April 28, 2024",
      image: "/images/blog/ai-learning.jpg",
      link: "#"
    },
    {
      title: "Gamification Techniques for Technical Training",
      excerpt: "Implementing game mechanics in professional development programs to increase knowledge retention and employee motivation.",
      date: "April 10, 2024",
      image: "/images/blog/gamification.jpg",
      link: "#"
    }
  ];

  const newsItems = [
    {
      title: "Lanos Smart Goggle Wins 2025 Sagar Innovation Award",
      date: "June 2, 2025",
      excerpt: "Our flagship AR educational device recognized for breakthrough technology and impact on STEM education.",
      link: "#"
    },
    {
      title: "New Research Partnership with MIT Media Lab Announced",
      date: "May 20, 2025",
      excerpt: "Collaborative initiative to develop next-generation educational technologies using AI and mixed reality.",
      link: "#"
    },
    {
      title: "Lanos Institute Expands Operations in Sagar Tech Hub",
      date: "April 15, 2025",
      excerpt: "New facility will create 500 additional jobs and feature state-of-the-art R&D laboratories.",
      link: "#"
    }
  ];

  return (
    <section ref={sectionRef} id="insights" style={{ padding: '8rem 0' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Insights & News</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', marginTop: '4rem' }}>
            {/* Latest News */}
            <motion.div variants={itemVariants}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center' }}>Latest News</h3>
              
              <div style={newsContainerStyle}>
                {newsItems.map((item, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    style={newsItemStyle}
                  >
                    <div style={newsContentStyle}>
                      <span style={newsDateStyle}>{item.date}</span>
                      <h4 style={newsTitleStyle}>{item.title}</h4>
                      <p style={newsExcerptStyle}>{item.excerpt}</p>
                      <a href={item.link} style={readMoreStyle}>
                        Read Full Story
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                          <path d="M5 12H19" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                    {index === 0 && (
                      <div style={featuredBadgeStyle}>
                        Featured
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Blog & Newsletter */}
            <motion.div variants={itemVariants} style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Blog & Newsletter</h3>
              <p style={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
                Subscribe to our monthly "Lanos Insights" for deep dives on AR/AI in EdTech and stay updated with the latest innovations.
              </p>
              
              {/* Newsletter Subscription */}
              <div style={subscriptionContainerStyle}>
                <form onSubmit={handleSubscribe} className="subscription-form" style={subscriptionFormStyle}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={inputStyle}
                  />
                  <button type="submit" style={buttonStyle}>
                    Subscribe
                  </button>
                </form>
                {subscribed && (
                  <p style={{ color: '#00c2ff', marginTop: '1rem' }}>
                    Thank you for subscribing to Lanos Insights!
                  </p>
                )}
              </div>
              
              {/* Blog Posts */}
              <div style={blogGridStyle}>
                {blogPosts.map((post, index) => (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    style={blogCardStyle}
                  >
                    <div style={{
                      ...blogImageStyle,
                      backgroundImage: `url(${post.image})`,
                    }}></div>
                    <div style={blogContentStyle}>
                      <span style={blogDateStyle}>{post.date}</span>
                      <h4 style={blogTitleStyle}>{post.title}</h4>
                      <p style={blogExcerptStyle}>{post.excerpt}</p>
                      <a href={post.link} style={readMoreStyle}>
                        Read More
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '0.5rem' }}>
                          <path d="M5 12H19" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 5L19 12L12 19" stroke="#00c2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Styles
const subscriptionContainerStyle = {
  maxWidth: '600px',
  margin: '0 auto 4rem',
  padding: '2rem',
  backgroundColor: 'rgba(30, 30, 30, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.05)'
};

const subscriptionFormStyle = {
  width: '100%'
};

const inputStyle = {
  flex: '1',
  padding: '0.75rem 1rem',
  borderRadius: '5px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  color: 'white',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.75rem 1.5rem',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#00c2ff',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: '#00a0d6'
  }
};

const blogGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '2rem',
  marginTop: '2rem'
};

const blogCardStyle = {
  backgroundColor: 'rgba(30, 30, 30, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const blogImageStyle = {
  width: '100%',
  height: '180px',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

const blogContentStyle = {
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
};

const blogDateStyle = {
  color: '#00c2ff',
  fontSize: '0.9rem',
  marginBottom: '0.5rem'
};

const blogTitleStyle = {
  fontSize: '1.3rem',
  marginBottom: '1rem',
  lineHeight: '1.4'
};

const blogExcerptStyle = {
  fontSize: '0.95rem',
  marginBottom: '1.5rem',
  flex: '1'
};

const readMoreStyle = {
  display: 'flex',
  alignItems: 'center',
  color: '#00c2ff',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  marginTop: 'auto'
};

const newsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  maxWidth: '900px',
  margin: '0 auto'
};

const newsItemStyle = {
  backgroundColor: 'rgba(30, 30, 30, 0.6)',
  backdropFilter: 'blur(10px)',
  borderRadius: '10px',
  padding: '1.5rem',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  ':hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
  }
};

const newsContentStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const newsDateStyle = {
  color: '#00c2ff',
  fontSize: '0.9rem',
  marginBottom: '0.5rem'
};

const newsTitleStyle = {
  fontSize: '1.3rem',
  marginBottom: '0.75rem',
  lineHeight: '1.4'
};

const newsExcerptStyle = {
  fontSize: '0.95rem',
  marginBottom: '1rem'
};

const featuredBadgeStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  backgroundColor: '#00c2ff',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

export default InsightsSection; 