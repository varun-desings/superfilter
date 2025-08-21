
import { ArrowRight } from 'lucide-react';
import products from '@/data/products';

const Prodotti = () => {
  const homepageItems = (products as any[]).slice(0, 8);

  const popularProducts = [
    "Brise-Soleil Orizzontali Classic",
    "Sistema Verticale Premium", 
    "Soluzione Ibrida Modulare",
    "Design Geometrico Avanzato"
  ];

  return (
    <section id="prodotti" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="heading-lg text-primary mb-6">Produits les plus vendus</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Les plus recherchés — Des brises soleil en béton  alliant esthétique, fonctionnalité et durabilité.
          </p>
        </div>

        {/* Main Products Grid (homepage preview) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 stagger-children">
          {homepageItems.map((item, index) => (
            <div key={item.slug} className="card-elegant overflow-hidden animate-scale-in group cursor-pointer" style={{ '--stagger': index } as React.CSSProperties}>
              {item.cover && (
                <div className="h-40 bg-muted flex items-center justify-center overflow-hidden">
                  <img src={item.cover} alt={item.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-[16px] md:text-[20px] font-bold text-primary mb-1">{item.name}</h3>
                <div className="mt-1 text-[12px] md:text-[14px] text-muted-foreground"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Products Section */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 animate-fade-up">
          <div className="text-center mb-8">
            <h3 className="heading-md text-primary mb-4">les plus recherchés</h3>
            <p className="body-md">Nos bestsellers plébiscités par nos clients</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularProducts.map((product, index) => (
              <div 
                key={index}
                className="bg-background rounded-lg p-4 text-center shadow-architectural hover:shadow-deep transition-all duration-300 cursor-pointer"
              >
                <h4 className="font-semibold text-primary mb-2">{product}</h4>
                <div className="w-8 h-1 gold-gradient rounded-full mx-auto"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a href="/products" className="btn-accent">Voir tout</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prodotti;
