import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/HeaderUpdated'
import Footer from './components/Footer'
import Home from './pages/Home'
import StudentRegistration from './pages/StudentRegistration'
import ProfessionalRegistration from './pages/ProfessionalRegistration'
import InstitutionRegistration from './pages/InstitutionRegistration'
import Event from './pages/Event'

// Import form components
import GamifiedLearningForm from './pages/forms/GamifiedLearningForm'
import EnterpriseTrainingForm from './pages/forms/EnterpriseTrainingForm'
import ConsultingServicesForm from './pages/forms/ConsultingServicesForm'
import CurriculumDesignForm from './pages/forms/CurriculumDesignForm'
import RDInnovationsForm from './pages/forms/RDInnovationsForm'
import EventRegistrationForm from './pages/forms/EventRegistrationForm'
import ScholarshipExamForm from './pages/ScholarshipExamForm'

import './App.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize any global animations here
    const ctx = gsap.context(() => {
      // Animate elements with the .fade-in class
      gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.fromTo(element, 
          { opacity: 0, y: 50 }, 
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=100',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });

    return () => ctx.revert(); // Clean up animations
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-benefits" element={<StudentRegistration />} />
          <Route path="/professional-benefits" element={<ProfessionalRegistration />} />
          <Route path="/institution-benefits" element={<InstitutionRegistration />} />
          <Route path="/event" element={<Event />} />
          
          {/* Form routes */}
          <Route path="/gamified-learning" element={<GamifiedLearningForm />} />
          <Route path="/enterprise-training" element={<EnterpriseTrainingForm />} />
          <Route path="/consulting-services" element={<ConsultingServicesForm />} />
          <Route path="/curriculum-design" element={<CurriculumDesignForm />} />
          <Route path="/rd-innovations" element={<RDInnovationsForm />} />
          <Route path="/event/register" element={<EventRegistrationForm />} />
          <Route path="/scholarship-exam" element={<ScholarshipExamForm />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
