
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
    <section id="home" className="relative min-h-[60vh] sm:min-h-[70vh] py-10 sm:py-14 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Super Filtre hero background"
          className="w-full h-full object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-3 sm:px-6">
        <div className="max-w-4xl mx-auto sm:mx-0 break-words">
          {/* Content */}
          <div className="animate-fade-up text-white">
            {/* Main Title */}
            <div className="mb-6 sm:mb-8">
              <h1 className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] sm:leading-[1.15] tracking-[0.01em] mb-3 text-white/95">
                STE SUPER FILTRE
              </h1>
              <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.5] tracking-wide opacity-90 max-w-2xl mb-3">
                Depuis plus de 20 ans, spécialiste des filtres, huiles et lubrifiants en Tunisie.
              </p>
              <p className="font-inter text-base sm:text-lg md:text-xl leading-[1.5] tracking-wide opacity-90 max-w-2xl">
                Votre partenaire de confiance pour la performance et la longévité de vos moteurs.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-stretch sm:justify-start mt-6 sm:mt-8">
              <button 
                onClick={() => scrollToSection('progetti')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-5 sm:px-8 py-3 rounded-none font-medium tracking-wide text-sm sm:text-base md:text-lg uppercase hover:bg-gray-100 transition-all duration-300 group"
              >
                Voir nos produits
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => scrollToSection('chi-siamo')}
                className="w-full sm:w-auto inline-flex items-center justify-center border border-white/60 text-white px-5 sm:px-8 py-3 rounded-none font-medium tracking-wide text-sm sm:text-base md:text-lg uppercase hover:bg-white/10 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40"
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
