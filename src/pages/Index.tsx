
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ChiSiamo from '@/components/ChiSiamo';
import Progetti from '@/components/Progetti';
import Contatti from '@/components/Contatti';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ChiSiamo />
        <Progetti />
        <Contatti />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
