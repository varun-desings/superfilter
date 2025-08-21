import { Star, Quote } from 'lucide-react';
import products from '@/data/products';
const testimonialImage = '/placeholder.svg';

const Progetti = () => {
  const findProduct = (key: string) => {
    const lower = key.toLowerCase();
    return (products as any[]).find(p => p.slug.toLowerCase() === lower || p.name.toLowerCase() === lower || p.category.toLowerCase() === lower);
  };

  const excerpt = (text?: string, len: number = 180) => {
    if (!text) return '';
    const t = text.replace(/\s+/g, ' ').trim();
    return t.length > len ? t.slice(0, len - 1) + '…' : t;
  };

  const pickBuildingImage = (prod?: any): string | undefined => {
    if (!prod) return undefined;
    const imgs: string[] = Array.isArray(prod.images) ? prod.images : [];
    const whatsappImgs = imgs.filter((i) => /WhatsApp/i.test(i));
    if (whatsappImgs.length > 0) {
      return whatsappImgs[whatsappImgs.length - 1];
    }
    const jpgs = imgs.filter((i) => /\.(jpg|jpeg)$/i.test(i));
    if (jpgs.length > 0) return jpgs[jpgs.length - 1];
    return (prod as any).cover;
  };

  const unifiedDescription = `Le modèle Bibi propose une composition géométrique élégante, parfaite pour créer des espaces aérés sans cloisonner. Grâce à ses formes répétitives et équilibrées, il filtre la lumière et laisse circuler l’air, tout en apportant une dimension graphique forte à l’architecture.
Conçu pour un usage extérieur comme intérieur, Bibi s’adapte aux projets résidentiels et commerciaux, qu’il s’agisse de murs ajourés, de cloisons décoratives, de séparateurs de jardin ou de façades contemporaines. Réalisé en béton pressé à base de sable fin, il bénéficie d’une finition lisse double-face, assurant une qualité visuelle exceptionnelle sur chaque face.`;

  const projects = [
    {
      id: 1,
      title: "Villa Moderna Tunisi",
      category: "Résidentiel",
      description: unifiedDescription,
      beforeAfter: "Transformation villa des années 70",
      imageUrl: "/featured/WhatsApp%20Image%202025-07-30%20at%2009.31.44_8c0d490d.jpg",
      productSlug: 'mezzo'
    },
    {
      id: 2,
      title: "Centro Commerciale Cartagine",
      category: "Commercial", 
      description: unifiedDescription,
      beforeAfter: "Réduction des coûts énergétiques de 40 %",
      imageUrl: "/featured/WhatsApp%20Image%202025-07-31%20at%2023.52.53_46351326.jpg",
      productSlug: 'square'
    },
    {
      id: 3,
      title: "Residence Luxury Sidi Bou Said",
      category: "Résidentiel",
      description: unifiedDescription,
      beforeAfter: "Intégration architecturale parfaite",
      imageUrl: "/featured/WhatsApp%20Image%202025-07-30%20at%2011.15.23_98f8e9f0.jpg",
      productSlug: 'victoria'
    }
  ];

  return (
    <section id="progetti" className="py-24 shadow-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="heading-lg text-primary mb-6">Inspirez‑vous de nos réalisations</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Découvrez comment nous avons transformé des maisons grâce à notre savoir‑faire et à notre souci du détail.
          </p>
        </div>

        {/* Testimonial Highlight */}
        <div className="card-elegant p-6 sm:p-8 md:p-12 mb-16 animate-fade-up">
          <div className="mb-6 sm:mb-8 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 md:-mx-12 md:-mt-12">
            <div className="h-48 sm:h-64 md:h-80 lg:h-auto w-full overflow-hidden lg:overflow-visible rounded-t-2xl">
              <img
                src={testimonialImage}
                alt="Façade rénovée avec claustras Super Filtre"
                className="w-full h-full lg:h-auto object-cover lg:object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <Quote className="text-accent flex-shrink-0 mt-1 hidden sm:block" size={32} />
            <div className="flex-1">
              <blockquote className="text-lg sm:text-xl md:text-2xl text-primary mb-4 italic leading-relaxed">
                "J’ai rénové la maison de mon grand-père avec les claustras de Super Filtre, et le résultat est incroyable.
                Ils ont redonné vie à la façade tout en respectant l’âme du lieu.
                La lumière passe avec douceur, et les ombres créent une ambiance apaisante.
                C’est à la fois moderne et chargé d’émotion. Merci Super Filtre pour cette belle transformation."
              </blockquote>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="font-semibold text-primary">Hassen Jeljeli</span>
                <span className="text-muted-foreground text-sm">- Client Super Filtre</span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 stagger-children">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="card-elegant overflow-hidden animate-scale-in group cursor-pointer"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              {/* Project Image */}
              <div className="h-72 bg-muted overflow-hidden border-b border-border/50 relative">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="h-full w-full light-gradient" />
                )}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              
              <div className="p-6 sm:p-8">
                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                
                {/* Project Title */}
                <h3 className="heading-sm text-primary mb-3">{project.title}</h3>
                
                {/* Project Description */}
                <p className="body-md mb-4 text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                {/* Product Specifications */}
                {project.productSlug && (() => {
                  const product = (products as any[]).find(p => (p as any).slug === project.productSlug) as any;
                  if (product?.specs) {
                    return (
                      <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                        <h4 className="text-xs font-semibold text-primary mb-2">Spécifications du produit</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          {product.specs.width_mm && (
                            <div><span className="font-medium">Largeur:</span> {product.specs.width_mm / 10}cm</div>
                          )}
                          {product.specs.height_mm && (
                            <div><span className="font-medium">Hauteur:</span> {product.specs.height_mm / 10}cm</div>
                          )}
                          {product.specs.depth_mm && (
                            <div><span className="font-medium">Profondeur:</span> {product.specs.depth_mm / 10}cm</div>
                          )}
                          {product.specs.thickness_mm && (
                            <div><span className="font-medium">Épaisseur:</span> {product.specs.thickness_mm / 10}cm</div>
                          )}
                          {product.specs.weight_kg && (
                            <div><span className="font-medium">Poids:</span> {product.specs.weight_kg}kg</div>
                          )}
                        </div>
                        {product.specs.techniques && (
                          <div className="mt-2 text-xs">
                            <span className="font-medium text-primary">Techniques:</span> {product.specs.techniques}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}
                
                {/* Project Result */}
                <div className="pt-2 border-t border-border/30">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Résultat :</span> {project.beforeAfter}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-up">
          <p className="body-lg mb-6 text-muted-foreground">
            Vous souhaitez voir tous nos projets réalisés ?
          </p>
          <a href="#contatti" className="btn-outline">
            Demander le portfolio complet
          </a>
        </div>
      </div>
    </section>
  );
};

export default Progetti;