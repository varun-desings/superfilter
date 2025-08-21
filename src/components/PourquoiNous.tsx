
import { Award, Settings, Recycle, Users, Sun, Headset } from 'lucide-react';

const PourquoiNous = () => {
  const features = [
    {
      icon: <Users className="text-accent" size={32} />,
      title: "Savoir‑faire",
      description: "Équipe d’artisans spécialisés, finitions haut de gamme et contrôle qualité — résidentiel & commercial.",
      tags: ["Artisans spécialisés", "Qualité contrôlée"]
    },
    {
      icon: <Sun className="text-accent" size={32} />,
      title: "Confort lumineux",
      description: "Jeux d’ombres dynamiques, lumière naturelle maîtrisée et ventilation pour un bien‑être quotidien.",
      tags: ["Jeux d’ombres", "Ventilation"]
    },
    {
      icon: <Headset className="text-accent" size={32} />,
      title: "Accompagnement",
      description: "Conseil de conception, fabrication et suivi de pose — un interlocuteur unique à chaque étape.",
      tags: ["Conseil", "Suivi de pose"]
    }
  ];

  return (
    <section id="pourquoi-nous" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="heading-lg text-primary mb-6">Pourquoi nous choisir</h2>
          <p className="body-lg max-w-3xl mx-auto">
            Des brise‑soleil en béton qui allient performance, esthétique et responsabilité. Voici ce qui nous distingue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card-elegant p-8 text-center animate-scale-in hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-accent/10 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="heading-sm text-primary mb-4">{feature.title}</h3>
              <p className="body-md">{feature.description}</p>
              {Array.isArray((feature as any).tags) && (
                <div className="flex flex-wrap justify-center gap-2 mt-5">
                  {(feature as any).tags.map((tag: string) => (
                    <span key={tag} className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PourquoiNous;

