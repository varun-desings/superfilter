
import { ArrowRight } from 'lucide-react';
import heroBg from '@/ACCEUIL/Capture3.PNG';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-2 pb-2 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Super Filtre hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto sm:mx-0 mt-0 sm:mt-16 lg:mt-24">
          {/* Content */}
          <div className="animate-fade-up text-white">
            {/* Main Title */}
            <div className="mb-6 sm:mb-12">
              <h1 className="font-playfair text-6xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] sm:leading-[1.15] tracking-[0.02em] mb-4 sm:mb-6 text-white/95">
                STE SUPER FILTRE
              </h1>
              <p className="font-inter text-xl sm:text-base md:text-lg leading-[1.3] sm:leading-relaxed tracking-wide opacity-90 max-w-2xl">
                Depuis plus de 20 ans, spécialiste des filtres, huiles et lubrifiants en Tunisie.
              </p>
              <p className="mt-3 sm:mt-3 font-inter text-xl sm:text-base md:text-lg leading-[1.3] sm:leading-relaxed tracking-wide opacity-90 max-w-2xl">
                Votre partenaire de confiance pour la performance et la longévité de vos moteurs.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 md:gap-12 justify-center sm:justify-start mt-6 sm:mt-0">
              <button 
                onClick={() => scrollToSection('progetti')}
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 sm:py-4 rounded-none font-medium tracking-wide text-lg sm:text-sm uppercase hover:bg-gray-100 transition-all duration-300 group mt-8 sm:mt-0"
              >
                						Voir nos produits
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => scrollToSection('chi-siamo')}
                className="inline-flex items-center justify-center border border-white/60 text-white px-10 py-4 sm:py-4 rounded-none font-medium tracking-wide text-lg sm:text-sm uppercase hover:bg-white/10 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 mt-8 sm:mt-0"
              >
                À propos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
