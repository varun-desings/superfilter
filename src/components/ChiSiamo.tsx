
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
        <div className="text-center mb-10 sm:mb-12 animate-fade-up">
          <h2 className="heading-lg text-primary mb-6">À propos</h2>
          <div className="body-lg max-w-3xl mx-auto whitespace-pre-line text-muted-foreground">
            {`Fondée en 2003, STE SUPER FILTRE est une entreprise tunisienne reconnue dans le domaine des filtres, huiles et lubrifiants automobiles et industriels.
Grâce à des partenariats solides avec des marques internationales, nous garantissons à nos clients des produits fiables et certifiés.

Notre mission est simple : offrir des solutions de filtration et de lubrification qui assurent performance, sécurité et durabilité à vos équipements.
Basée à Ben Arous, nous accompagnons depuis plus de deux décennies les particuliers, professionnels et industriels en Tunisie.`}
          </div>
        </div>

        {/* Values */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <h3 className="heading-sm text-primary mb-4">Valeurs</h3>
          <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
            <li>✅ Qualité et fiabilité des produits</li>
            <li>✅ Partenariats stratégiques avec de grandes marques</li>
            <li>✅ Service client réactif et professionnel</li>
          </ul>
        </div>

        {/* Existing feature grid retained */}
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
              {"Ne laissez pas le soleil dicter votre confort.<br />Avec Super Filtre, prenez le contrôle de votre environnement lumineux."}
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
