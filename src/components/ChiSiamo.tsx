
import { Award, Recycle, Settings, Users } from 'lucide-react';

const ChiSiamo = () => {
  const features = [
    {
      icon: <Award className="text-accent" size={32} />,
      title: "Qualité et fiabilité",
      description: "Des produits certifiés et performants, sélectionnés pour leur durabilité."
    },
    {
      icon: <Settings className="text-accent" size={32} />,
      title: "Partenariats stratégiques",
      description: "Collaboration avec de grandes marques pour garantir conformité et fiabilité."
    },
    {
      icon: <Users className="text-accent" size={32} />,
      title: "Service client réactif",
      description: "Accompagnement rapide et professionnel pour particuliers et industriels."
    }
  ];

  return (
    <section id="chi-siamo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 sm:mb-12 animate-fade-up">
          <h2 className="heading-lg text-primary mb-6">À propos</h2>
          <div className="body-lg max-w-3xl mx-auto whitespace-pre-line text-muted-foreground">
            {`En quelques mots, vous comprenez que le patron de la Société Super Filtre maîtrise son sujet au point de vous faire gagner de l’argent, en venant vous approvisionner chez lui. Comment ? Découvrez-le dans ce reportage inédit !

Un bandeau jaune vif surplombe la façade de STE SUPER FILTRE, un bandeau sur lequel vous retrouvez le nom de la société et aussi celui de Shell, parce que le distributeur que l’on vient voir, exerce également une activité dans le lubrifiant. Mais quand vous entrez dans le magasin, l’effet très flashy du bandeau s’estompe rapidement pour laisser place à une société de distribution très classique, où l’on est loin de soupçonner que nous sommes chez l’un des plus grands spécialistes du filtre pour poids lourd. Pourtant, Adel Askri n’était pas destiné à exercer ce métier, et c’est peut-être pour cela qu’il a su trouver la plus-value attachée à l’activité de la filtration poids lourds et engins. En effet, ses études l’ont conduit à l’obtention d’une maîtrise de marketing international, qui s’est traduite rapidement par des stages dans le secteur bancaire. Cela lui a suffi pour comprendre que passer sa vie derrière un bureau ou un ordinateur n’était pas fait pour lui ! Une semaine après avoir terminé sa maîtrise, un ami de la famille lui propose de faire un essai dans la vente de pièces détachées pour les engins. Ses premiers pas dans le secteur de la pièce de rechange se concrétisent par des fonctions de responsable commercial, puis de directeur commercial, toujours dans ce secteur. Et c’est en 2003, qu’il ouvre son propre bureau (20 m², il commence raisonnablement !) et choisit le secteur de la filtration..`}
          </div>
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

      </div>
    </section>
  );
};

export default ChiSiamo;
