import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import partnersImage from '@/ACCEUIL/Partners.JPG';
import partnerrImage from '@/ACCEUIL/partnerr.JPG';
import partnerrrImage from '@/ACCEUIL/partnerrr.jpg';
import partnerssImage from '@/ACCEUIL/partnerss.JPG';

const Footer = () => {
	return (
		<footer className="bg-primary text-primary-foreground py-16">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
					{/* Brand */}
					<div className="lg:col-span-2">
						<div className="heading-sm mb-4">STE SUPER FILTRE</div>
						<p className="text-primary-foreground/80 mb-6 max-w-md whitespace-pre-line">{`ADEL ASKRI — General Manager\n2003 année de création\nCASTROL / CATERPILAR`}</p>
					</div>

					{/* Partners */}
					<div>
						<h4 className="font-semibold mb-4">Partenaires</h4>
						<ul className="space-y-2 text-primary-foreground/80 mb-4">
							<li>U.S.P</li>
							<li>EDT</li>
							<li>G.A.M</li>
							<li>C.M.A</li>
							<li>PUR FILTRE</li>
							<li>STE COMPTOIR DES FILTRES SFAX</li>
							<li>AR FILTER BORJ CEDRIA</li>
							<li>SOTUGRAISSE</li>
							<li>AQULA CHIMIE</li>
							<li>AFRILUB</li>
							<li>WIXFILTER</li>
						</ul>
						<div className="flex gap-4 justify-center items-center">
							<div className="w-1/3">
								<img 
									src={partnersImage} 
									alt="Nos partenaires" 
									className="w-full h-24 object-contain rounded-lg shadow-md bg-white"
								/>
							</div>
							<div className="w-1/3">
								<img 
									src={partnerrImage} 
									alt="Nos partenaires" 
									className="w-full h-24 object-contain rounded-lg shadow-md bg-white"
								/>
							</div>
							<div className="w-1/3">
								<img 
									src={partnerrrImage} 
									alt="Nos partenaires" 
									className="w-full h-24 object-contain rounded-lg shadow-md bg-white"
								/>
							</div>
						</div>
						<div className="mt-4 flex justify-center">
							<img
								src={partnerssImage}
								alt="Nos partenaires"
								className="w-1/3 h-24 object-contain rounded-lg shadow-md bg-white"
							/>
						</div>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="font-semibold mb-4">Contact</h4>
						<div className="space-y-3 text-primary-foreground/80">
							<div className="">Adresse: 24 avenue de france, Ben Arous 2013</div>
							<div className="flex items-center gap-3">
								<Mail size={16} />
								<a href="mailto:Superfiltre2@gnet.tn" className="hover:text-primary-foreground transition-colors duration-300">
									Superfiltre2@gnet.tn
								</a>
							</div>
							<div className="flex items-center gap-3">
								<Mail size={16} />
								<a href="mailto:ibtissembelili@gnet.tn" className="hover:text-primary-foreground transition-colors duration-300">
									ibtissembelili@gnet.tn
								</a>
							</div>
							<div className="flex items-center gap-3">
								<Phone size={16} />
								<a href="tel:25557143" className="hover:text-primary-foreground transition-colors duration-300">
									25557143
								</a>
							</div>
							<div className="flex items-center gap-3">
								<Phone size={16} />
								<a href="tel:79391964" className="hover:text-primary-foreground transition-colors duration-300">
									79391964
								</a>
							</div>
						</div>
									</div>



				{/* Bottom Bar */}
					<div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-primary-foreground/60 text-sm">
							© 2024 STE SUPER FILTRE. Tous droits réservés.
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