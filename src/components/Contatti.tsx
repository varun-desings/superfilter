
import { Mail, Phone, Facebook, Instagram, MapPin, Send, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import products from '@/data/products';

const Contatti = () => {
  const { items, removeFromCart, increment, decrement, clear, totalItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Get full product details for cart items
  const cartItemsWithDetails = items.map(cartItem => {
    const product = products.find(p => p.slug === cartItem.slug);
    return {
      ...cartItem,
      category: product?.category || 'Unknown',
      description: product?.description || '',
      specs: product?.specs || {}
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare cart summary for email
      const cartSummary = cartItemsWithDetails.map(item => 
        `${item.name} (${item.category}) - Quantité: ${item.quantity}`
      ).join('\n');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `Nouvelle demande de devis - ${formData.name}`,
          cart_items: cartItemsWithDetails,
          cart_summary: cartSummary,
          total_items: totalItems,
          cart_details: `Produits sélectionnés:\n${cartSummary}\n\nTotal: ${totalItems} articles`
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        clear(); // Clear cart after successful submission
        console.log('Email sent successfully:', result);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contatti" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="heading-lg text-primary mb-6">Contact</h2>
          <p className="body-lg max-w-2xl mx-auto">
            Une question ou un projet ? Contactez‑nous pour une consultation personnalisée et transformez votre espace dès aujourd'hui.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-up">
            <h3 className="heading-md text-primary mb-8">Demander un devis</h3>
            
            {/* Cart Summary */}
            {totalItems > 0 && (
              <div className="mb-8 p-6 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-primary flex items-center gap-2">
                    <ShoppingCart size={20} />
                    Votre sélection ({totalItems} articles)
                  </h4>
                  <button 
                    onClick={clear}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Vider le panier
                  </button>
                </div>
                
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {cartItemsWithDetails.map((item) => (
                    <div key={item.slug} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                      <div className="flex items-center gap-3">
                        {item.cover && (
                          <img 
                            src={item.cover} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <div className="font-medium text-primary">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.category}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrement(item.slug)}
                          className="w-6 h-6 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => increment(item.slug)}
                          className="w-6 h-6 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.slug)}
                          className="ml-2 text-muted-foreground hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Ces produits seront inclus dans votre demande de devis
                  </div>
                </div>
              </div>
            )}
            
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✅ Votre message a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  ❌ Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                  Décrivez votre projet *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Parlez‑nous de votre projet, de vos besoins et de vos attentes..."
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-accent w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer la demande de devis
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="animate-slide-left">
            <h3 className="heading-md text-primary mb-8">Informations de contact</h3>
            
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Mail className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Email</h4>
                  <div className="space-y-2">
                    <a href="mailto:Superfiltre2@gnet.tn" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                      Superfiltre2@gnet.tn
                    </a>
                    <a href="mailto:ibtissembelili@gnet.tn" className="block text-muted-foreground hover:text-accent transition-colors duration-300">
                      ibtissembelili@gnet.tn
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Phone className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Téléphone</h4>
                  <a href="tel:+21623514440" className="text-muted-foreground hover:text-accent transition-colors duration-300">
                    +216 23 514 440
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <MapPin className="text-accent" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Adresse</h4>
                  <p className="text-muted-foreground">
                    Tunis, Tunisie<br />
                    Disponible sur tout le territoire national
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-primary mb-4">Suivez‑nous</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/claustrah" 
                    className="p-3 bg-accent/10 rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                  >
                    <Facebook size={24} />
                  </a>
                  <a 
                    href="https://www.instagram.com/claustrah" 
                    className="p-3 bg-accent/10 rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                  >
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="mt-12 card-elegant p-8">
              <h4 className="heading-sm text-primary mb-4">Consultation gratuite</h4>
              <p className="body-md mb-6">
                Nous offrons une consultation technique gratuite pour évaluer la faisabilité de votre projet et vous proposer la meilleure solution.
              </p>
              <button 
                onClick={() => window.open('tel:+21623514440')}
                className="w-full bg-primary text-white border-2 border-primary rounded-lg px-6 py-4 text-lg font-semibold hover:bg-primary/90 hover:border-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              >
                <Phone size={20} />
                Appeler maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contatti;
