import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
// Import SplitText only if you have access to GSAP Club Plugins
import SplitText from 'gsap/SplitText';

const HeroSection = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const particlesRef = useRef(null);
  const orbsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);

    // Create animated orbs
    const createOrbs = () => {
      if (!orbsRef.current) return;
      while (orbsRef.current.firstChild) {
        orbsRef.current.removeChild(orbsRef.current.firstChild);
      }

      const numOrbs = 6;
      const colors = ['rgba(0, 194, 255, 0.2)', 'rgba(255, 62, 108, 0.2)', 'rgba(255, 255, 255, 0.1)'];

      for (let i = 0; i < numOrbs; i++) {
        const orb = document.createElement('div');
        const size = Math.random() * 400 + 200;
        const color = colors[Math.floor(Math.random() * colors.length)];

        orb.style.position = 'absolute';
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.borderRadius = '50%';
        orb.style.background = color;
        orb.style.filter = 'blur(80px)';
        orb.style.zIndex = '0';
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.transform = 'translate(-50%, -50%)';

        orbsRef.current.appendChild(orb);

        gsap.to(orb, {
          x: `random(-30, 30)vw`,
          y: `random(-30, 30)vh`,
          duration: Math.random() * 15 + 15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          onRepeat: () => {
            gsap.to(orb, {
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              duration: 3
            });
          }
        });
      }
    };

    // Create animated particles
    const createParticles = () => {
      if (!particlesRef.current) return;
      while (particlesRef.current.firstChild) {
        particlesRef.current.removeChild(particlesRef.current.firstChild);
      }

      const numParticles = 100;
      const colors = ['#00c2ff', '#ff3e6c', '#ffffff'];

      for (let i = 0; i < numParticles; i++) {
        createNewParticle(colors);
      }
    };

    const createNewParticle = (colors) => {
      if (!particlesRef.current) return;
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.6 + 0.2;

      particlesRef.current.appendChild(particle);

      gsap.to(particle, {
        y: `random(-100, 100)vh`,
        x: `random(-100, 100)vw`,
        opacity: 0,
        duration,
        delay,
        ease: 'power1.inOut',
        onComplete: () => {
          if (particlesRef.current?.contains(particle)) {
            particlesRef.current.removeChild(particle);
            createNewParticle(colors);
          }
        }
      });
    };

    // Animate text
    const textAnimation = () => {
      if (!textRef.current) return;
      const splitText = new SplitText(textRef.current, { type: 'chars, words' });
      gsap.from(splitText.chars, {
        opacity: 0,
        y: 20,
        rotationX: -90,
        stagger: 0.02,
        duration: 1,
        ease: 'back.out'
      });
    };

    createOrbs();
    createParticles();
    textAnimation();

    return () => {
      if (orbsRef.current) {
        while (orbsRef.current.firstChild) {
          orbsRef.current.removeChild(orbsRef.current.firstChild);
        }
      }
      if (particlesRef.current) {
        while (particlesRef.current.firstChild) {
          particlesRef.current.removeChild(particlesRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <section 
      id="hero"
      ref={heroRef}
      style={{
        minHeight: '100vh',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--primary-color)',
        marginTop: '-60px', // Offset the navbar height
        paddingTop: '60px' // Add padding to compensate for the negative margin
      }}
    >
      <div ref={orbsRef} style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none' // Prevent orbs from interfering with interactions
      }} />
      <div ref={particlesRef} style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none' // Prevent particles from interfering with interactions
      }} />
      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 2,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            style={{ padding: '2rem 0' }}
          >
            <h1 ref={textRef} style={{ marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
              <span style={{ 
                fontWeight: 800, 
                letterSpacing: '1px', 
                WebkitFontSmoothing: 'antialiased', 
                textRendering: 'optimizeLegibility',
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                <span style={{ color: 'var(--accent-color)' }}>Lanos</span>
                <span style={{ margin: '0 1rem' }}>–</span>
                <span>Agile</span>
                <span style={{ margin: '0 0.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>EdTech</span>
                <span style={{ margin: '0 0.5rem' }}>&amp;</span>
                <span style={{ margin: '0 0.5rem', color: 'var(--accent-color)', fontWeight: 600 }}>R&amp;D</span>
                <span>StartUp</span>
              </span>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1.5 }}
                style={{
                  position: 'absolute',
                  height: '4px',
                  background: 'linear-gradient(to right, transparent, var(--accent-color), transparent)',
                  bottom: '-10px',
                  left: 0,
                  borderRadius: '2px'
                }}
              />
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ fontSize: '1.2rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}
          >
            Founded in February 2024 in Sagar, Madhya Pradesh, Lanos is a lean, innovation-obsessed startup tackling education and emerging technology challenges through integrated research and development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem' }}
          >
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }} className="btn btn-outline">
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
