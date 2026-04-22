import Scene3D from '@/components/Scene3D';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import WhyMeSection from '@/components/WhyMeSection';
import QuickMissionsSection from '@/components/QuickMissionsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen noise">
      <Scene3D />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <WhyMeSection />
        <QuickMissionsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
