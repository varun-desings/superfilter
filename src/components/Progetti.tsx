import { Star, Quote } from 'lucide-react';
import catalogueItems from '@/data/catalogue';
const testimonialImage = '/placeholder.svg';

const Progetti = () => {
  const excerpt = (text?: string, len: number = 180) => {
    if (!text) return '';
    const t = String(text).replace(/\s+/g, ' ').trim();
    return t.length > len ? t.slice(0, len - 1) + '…' : t;
  };

  const featuredProducts = (catalogueItems as any[]).slice(0, 4);

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
                {`"J’ai rénové la maison de mon grand-père avec les claustras de Super Filtre, et le résultat est incroyable.
Ils ont redonné vie à la façade tout en respectant l’âme du lieu.
La lumière passe avec douceur, et les ombres créent une ambiance apaisante.
C’est à la fois moderne et chargé d’émotion. Merci Super Filtre pour cette belle transformation."`}
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

        {/* Featured Products Grid (replaces projects grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 stagger-children">
          {featuredProducts.map((item: any, index: number) => (
            <a
              key={item.slug}
              href="/products"
              className="card-elegant overflow-hidden animate-scale-in group cursor-pointer"
              style={{ ['--stagger' as any]: index }}
            >
              <div className="h-72 bg-muted overflow-hidden border-b border-border/50 relative">
                {item.cover ? (
                  <img
                    src={item.cover}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-contain bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="h-full w-full light-gradient" />
                )}
                {/* Category badge */}
                <span className="absolute top-2 left-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-medium border border-border">
                  {item.category}
                </span>
                {/* Images count */}
                {Array.isArray(item.images) && item.images.length > 0 && (
                  <span className="absolute top-2 right-2 px-3 py-1 rounded-full bg-background/80 backdrop-blur text-xs font-medium border border-border">
                    {item.images.length} photos
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="heading-sm text-primary mb-3">{item.name}</h3>
                {item.description && (
                  <p className="body-md mb-4 text-muted-foreground leading-relaxed">
                    {excerpt(item.description, 140)}
                  </p>
                )}
                <div className="pt-2 border-t border-border/30 text-sm text-muted-foreground">
                  Voir la fiche produit →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* See more button */}
        <div className="text-center mt-12 animate-fade-up">
          <a href="/products" className="btn-outline">
            Voir plus de produits
          </a>
        </div>
      </div>
    </section>
  );
};

export default Progetti;