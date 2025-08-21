
import { Award, Recycle, Settings, Users } from 'lucide-react';

const ChiSiamo = () => {
  const features = [
    {
      icon: <Award className="text-accent" size={32} />,
      title: "Durabilité",
      description: "Nos brise-soleil en ciment armé garantissent une résistance et une longévité exceptionnelles."
    },
    {
      icon: <Settings className="text-accent" size={32} />,
      title: "Personnalisation",
      description: "Chaque projet est conçu pour répondre à des besoins architecturaux spécifiques."
    },
    {
      icon: <Recycle className="text-accent" size={32} />,
      title: "Éco‑responsabilité",
      description: "Des matériaux et des procédés productifs attentifs à l'environnement pour un avenir durable."
    },
    {
      icon: <Users className="text-accent" size={32} />,
      title: "Expérience",
      description: "Équipe d'artisans spécialisés avec plus de 5 ans d'expérience dans le secteur."
    }
  ];

  return (
    <section id="chi-siamo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="heading-lg text-primary mb-6">À propos</h2>
          <p className="body-lg max-w-3xl mx-auto">
            L’Élégance de l’Ombre avec CLAUSTRAH — Découvrez CLAUSTRAH, l’innovation en matière de brises soleil en béton . Nos
            designs uniques ne se contentent pas de protéger votre espace des rayons ardents du soleil, ils transforment chaque
            rayon en une œuvre d’art. Avec CLAUSTRAH, chaque jour est une nouvelle aventure visuelle, où la lumière et l’ombre
            dansent sur les murs de votre habitat, créant une ambiance à la fois dynamique et apaisante.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 stagger-children">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="card-elegant p-6 sm:p-8 text-center animate-scale-in"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-accent/10 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="heading-sm text-primary mb-4">{feature.title}</h3>
              <p className="body-md">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-accent/10 rounded-2xl p-8 md:p-12 animate-fade-up">
            <blockquote className="heading-md text-primary mb-6 italic">
              "Ne laissez pas le soleil dicter votre confort.<br />Avec CLAUSTRAH, prenez le contrôle de votre environnement lumineux."
            </blockquote>
            <p className="body-lg max-w-2xl mx-auto">
              Visitez notre site web ou contactez‑nous pour une consultation personnalisée et transformez votre espace dès aujourd’hui !
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChiSiamo;
