
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-24 sm:pb-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/products/SQUARE/WhatsApp%20Image%202025-08-03%20at%2019.03.58_7e108c3c.jpg"
          alt="Super Filtre hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto sm:mx-0 mt-16 sm:mt-24 lg:mt-32">
          {/* Content */}
          <div className="animate-fade-up text-white">
            {/* Main Title - Elegant and sophisticated */}
            <div className="mb-16 sm:mb-20">
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-[0.02em] mb-8 sm:mb-10 text-white/95">
                L'Élégance de l'Ombre
              </h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4 sm:gap-8">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.1em] opacity-80 mb-3 sm:mb-0 text-white/90">
                  avec
                </span>
                <span className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[0.01em] text-white drop-shadow-lg">
                  Super Filtre
                </span>
              </div>
            </div>
            
            {/* Subtitle - Refined and elegant */}
            <div className="mb-16 sm:mb-20">
              <p className="font-inter text-base sm:text-lg md:text-xl font-medium tracking-[0.15em] uppercase opacity-90 mb-6 sm:mb-8 text-white/85">
                Super Filtre
              </p>
              <div className="w-20 h-px bg-gradient-to-r from-white/70 via-white/50 to-transparent mb-6 sm:mb-8"></div>
              <p className="font-inter text-sm sm:text-base md:text-lg font-light tracking-[0.08em] opacity-85 max-w-md text-white/90 leading-relaxed">
                l'élégance maîtrisée de la lumière
              </p>
            </div>
            
            {/* Description - Clean and readable */}
            <div className="mb-12 sm:mb-16">
              <p className="font-inter text-sm sm:text-base md:text-lg leading-relaxed tracking-wide opacity-90 max-w-2xl">
                Super Filtre crée des brises soleil en béton armé qui allient esthétique, 
                fonctionnalité et durabilité. Chaque pièce est pensée pour jouer avec la 
                lumière et projeter des ombres uniques, apportant caractère et harmonie à vos 
                espaces.
              </p>
            </div>
            
            {/* Stats - Elegant grid with subtle design */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
              <div className="text-center group">
                <div className="font-playfair text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 text-white/90">
                  5
                </div>
                <div className="text-xs sm:text-sm opacity-70 font-medium tracking-wide uppercase">
                  Des années d'expérience
                </div>
              </div>
              <div className="text-center group">
                <div className="font-playfair text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 text-white/90">
                  120+
                </div>
                <div className="text-xs sm:text-sm opacity-70 font-medium tracking-wide uppercase">
                  Projets terminés
                </div>
              </div>
              <div className="text-center group">
                <div className="font-playfair text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 text-white/90">
                  10+
                </div>
                <div className="text-xs sm:text-sm opacity-70 font-medium tracking-wide uppercase">
                  Artisans qualifiés
                </div>
              </div>
              <div className="text-center group">
                <div className="font-playfair text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3 text-white/90">
                  100%
                </div>
                <div className="text-xs sm:text-sm opacity-70 font-medium tracking-wide uppercase">
                  Satisfaction des clients
                </div>
              </div>
            </div>

            {/* CTA Buttons - Refined and elegant */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-10 md:gap-12 justify-center sm:justify-start">
              <button 
                onClick={() => scrollToSection('progetti')}
                className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-none font-medium tracking-wide text-sm uppercase hover:bg-gray-100 transition-all duration-300 group"
              >
                Découvrir nos projets
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => scrollToSection('chi-siamo')}
                className="inline-flex items-center justify-center border border-white/60 text-white px-8 py-4 rounded-none font-medium tracking-wide text-sm uppercase hover:bg-white/10 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40"
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
