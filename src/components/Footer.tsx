import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-primary text-primary-foreground py-16">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
					{/* Brand */}
					<div className="lg:col-span-2">
						<div className="heading-sm mb-4">CLAUSTRAH</div>
						<p className="text-primary-foreground/80 mb-6 max-w-md">CLAUSTRAH crée des brises soleil en béton armé qui allient esthétique, fonctionnalité et durabilité.</p>
						<div className="flex gap-4">
							<a 
								href="https://www.facebook.com/claustrah" 
								className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all duration-300"
							>
								<Facebook size={20} />
							</a>
							<a 
								href="https://www.instagram.com/claustrah" 
								className="p-3 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all duration-300"
							>
								<Instagram size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-semibold mb-4">Liens rapides</h4>
						<ul className="space-y-2 text-primary-foreground/80">
							<li><a href="#home" className="hover:text-primary-foreground transition-colors duration-300">Accueil</a></li>
							<li><a href="#chi-siamo" className="hover:text-primary-foreground transition-colors duration-300">À propos</a></li>
							<li><a href="#prodotti" className="hover:text-primary-foreground transition-colors duration-300">Produits</a></li>
							<li><a href="#progetti" className="hover:text-primary-foreground transition-colors duration-300">Projets</a></li>
							<li><a href="#contatti" className="hover:text-primary-foreground transition-colors duration-300">Contact</a></li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="font-semibold mb-4">Contact</h4>
						<div className="space-y-3 text-primary-foreground/80">
							<div className="flex items-center gap-3">
								<Mail size={16} />
								<a href="mailto:info@claustrah.com" className="hover:text-primary-foreground transition-colors duration-300">
									info@claustrah.com
								</a>
							</div>
							<div className="flex items-center gap-3">
								<Phone size={16} />
								<a href="tel:+21623514440" className="hover:text-primary-foreground transition-colors duration-300">
									+216 23 514 440
								</a>
							</div>
						</div>
					</div>

					{/* Bottom Bar */}
					<div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-primary-foreground/60 text-sm">
							© 2024 CLAUSTRAH. Tous droits réservés.
						</p>
						<div className="flex gap-6 text-sm text-primary-foreground/60">
							<a href="#" className="hover:text-primary-foreground transition-colors duration-300">Politique de confidentialité</a>
							<a href="#" className="hover:text-primary-foreground transition-colors duration-300">Conditions d’utilisation</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;