import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const backgroundRef = useRef(null);
  
  useEffect(() => {
    if (!backgroundRef.current) return;
    
    // Create animated orbs
    const createOrbs = () => {
      const container = backgroundRef.current;
      const numOrbs = 8;
      const colors = [
        'rgba(0, 194, 255, 0.15)',
        'rgba(255, 62, 108, 0.15)',
        'rgba(255, 255, 255, 0.08)'
      ];
      
      // Clear any existing orbs
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Create new orbs
      for (let i = 0; i < numOrbs; i++) {
        const orb = document.createElement('div');
        
        // Random properties
        const size = Math.random() * 300 + 200;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        orb.style.position = 'absolute';
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.borderRadius = '50%';
        orb.style.backgroundColor = color;
        orb.style.filter = 'blur(80px)';
        orb.style.opacity = Math.random() * 0.3 + 0.1;
        orb.style.zIndex = '-1';
        
        // Random initial position
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.transform = 'translate(-50%, -50%)';
        
        // Add to container
        container.appendChild(orb);
        
        // Animate with GSAP
        gsap.to(orb, {
          x: `random(-50, 50)%`,
          y: `random(-50, 50)%`,
          duration: Math.random() * 20 + 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          onComplete: () => {
            if (container.contains(orb)) {
              container.removeChild(orb);
            }
          }
        });
      }
    };
    
    createOrbs();
    
    // Recreate orbs on window resize
    const handleResize = () => {
      createOrbs();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={backgroundRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default AnimatedBackground;