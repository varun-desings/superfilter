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