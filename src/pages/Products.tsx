import products from '@/data/products';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowRight, Menu, X } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BackLink from '@/components/BackLink';
import Footer from '@/components/Footer';

const ImagesCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
	const [api, setApi] = useState<CarouselApi | null>(null);
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;
		setCount(api.scrollSnapList().length);
		const onSelect = () => setCurrent(api.selectedScrollSnap());
		onSelect();
		api.on('select', onSelect);
		api.on('reInit', onSelect);
		return () => {
			api.off('select', onSelect);
			api.off('reInit', onSelect);
		};
	}, [api]);

	return (
		<div>
			<Carousel opts={{ align: 'start', loop: true }} setApi={setApi}>
				<CarouselContent>
					{(images || []).map((src: string) => (
						<CarouselItem key={src}>
							<div className="bg-muted rounded overflow-hidden h-48 sm:h-64 lg:h-72 flex items-center justify-center">
								<img src={src} alt={alt} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="-left-2 sm:-left-3 h-8 w-8 sm:h-10 sm:w-10" />
				<CarouselNext className="-right-2 sm:-right-3 h-8 w-8 sm:h-10 sm:w-10" />
			</Carousel>
			{count > 1 && (
				<div className="mt-3 flex items-center justify-center gap-2">
					{Array.from({ length: count }).map((_, i) => (
						<button
							key={i}
							type="button"
							className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-colors ${i === current ? 'bg-accent' : 'bg-muted-foreground/30'}`}
							aria-label={`Aller à l'image ${i + 1}`}
							onClick={() => api?.scrollTo(i)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const ProductsPage = () => {
	const { addToCart, totalItems } = useCart();
	const navigate = useNavigate();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const excerpt = (text?: string, len: number = 160) => {
		if (!text) return '';
		const t = String(text).replace(/\s+/g, ' ').trim();
		return t.length > len ? t.slice(0, len - 1) + '…' : t;
	};

	const extractPrimarySizeInches = (text?: string): string => {
		if (!text) return '';
		const mmFrom = (val: string, unit: string) => {
			const v = parseFloat(val.replace(',', '.'));
			const u = unit.toLowerCase();
			if (u === 'mm') return v;
			if (u === 'cm') return v * 10;
			if (u === 'm') return v * 1000;
			return v;
		};
		const toInches = (mm: number) => mm / 25.4;
		const fmtIn = (inch: number) => `${parseFloat(inch.toFixed(1))}"`;
		const t = String(text);
		const dims = t.match(/(\d+[\.,]?\d*)\s*(mm|cm|m)\s*[x×]\s*(\d+[\.,]?\d*)\s*(mm|cm|m)(?:\s*[x×]\s*(\d+[\.,]?\d*)\s*(mm|cm|m))?/i);
		if (dims) {
			const a = toInches(mmFrom(dims[1], dims[2]));
			const b = toInches(mmFrom(dims[3], dims[4]));
			const c = dims[5] ? toInches(mmFrom(dims[5], dims[6])) : NaN;
			const maxDim = Math.max(a, b, isNaN(c) ? -Infinity : c);
			return fmtIn(maxDim);
		}
		const single = t.match(/(height|hauteur|altezza|altura|width|largeur|larghezza|depth|profondeur)\s*[:\-]?\s*(\d+[\.,]?\d*)\s*(mm|cm|m)/i);
		if (single) {
			return fmtIn(toInches(mmFrom(single[2], single[3])));
		}
		return '';
	};

	const buildTitle = (item: any): string => {
		if (item?.slug === 'bibi' || item?.slug === 'square' || item?.slug === 'victoria' || item?.slug === 'done3d' || item?.slug === 'done' || item?.slug === 'mezzo') return String(item?.name || '');
		const size = extractPrimarySizeInches(item?.description);
		const parts = [item?.name, size && size, 'Cement Breeze Block'].filter(Boolean);
		return parts.join(' ');
	};

	const buildDimensionsCm = (item: any): string => {
		const toCmFromMm = (mm?: number) => (typeof mm === 'number' && isFinite(mm)) ? Math.round(mm / 10) : null;
		const wSpec = toCmFromMm(item?.specs?.width_mm);
		const hSpec = toCmFromMm(item?.specs?.height_mm);
		const dSpec = toCmFromMm(item?.specs?.depth_mm);
		if (wSpec && hSpec) {
			const parts = [wSpec, hSpec];
			if (dSpec) parts.push(dSpec);
			return `${parts.join(' × ')} cm`;
		}
		const t: string = String(item?.description || '');
		const m = t.match(/(\d+[\.,]?\d*)\s*(mm|cm|m)\s*[x×]\s*(\d+[\.,]?\d*)\s*(mm|cm|m)(?:\s*[x×]\s*(\d+[\.,]?\d*)\s*(mm|cm|m))?/i);
		if (m) {
			const toCm = (val: string, unit: string) => {
				const v = parseFloat(val.replace(',', '.'));
				const u = unit.toLowerCase();
				if (u === 'mm') return v / 10;
				if (u === 'cm') return v;
				if (u === 'm') return v * 100;
				return v;
			};
			const a = Math.round(toCm(m[1], m[2]));
			const b = Math.round(toCm(m[3], m[4]));
			const c = m[5] ? Math.round(toCm(m[5], m[6])) : null;
			return `${[a, b].concat(c ? [c] : []).join(' × ')} cm`;
		}
		return '';
	};

	const extractThicknessMm = (item: any): string | null => {
		const fromSpecs: number | undefined = item?.specs?.thickness_mm;
		if (typeof fromSpecs === 'number' && fromSpecs > 0) return `${fromSpecs}mm`;
		const t: string = String(item?.description || '');
		const m = t.match(/(?:thickness|épaisseur|epaisseur|spessore)\s*[:\-]?\s*(\d+[\.,]?\d*)\s*(mm|cm|m)/i);
		if (m) {
			const val = parseFloat(m[1].replace(',', '.'));
			const unit = m[2].toLowerCase();
			const mm = unit === 'mm' ? val : unit === 'cm' ? val * 10 : unit === 'm' ? val * 1000 : val;
			return `${Math.round(mm)}mm`;
		}
		return null;
	};

	const extractWeightKg = (item: any): string | null => {
		const fromSpecs: number | undefined = item?.specs?.weight_kg;
		if (typeof fromSpecs === 'number' && fromSpecs > 0) return `${fromSpecs}kg`;
		const t: string = String(item?.description || '');
		const m = t.match(/(?:weight|poids|peso)\s*[:\-]?\s*(\d+[\.,]?\d*)\s*(kg|kilograms?|kilogrammes?)/i);
		if (m) {
			const val = parseFloat(m[1].replace(',', '.'));
			return `${val}kg`;
		}
		return null;
	};

	const extractWidthHeightMm = (item: any): string | null => {
		const wSpec: number | undefined = item?.specs?.width_mm;
		const hSpec: number | undefined = item?.specs?.height_mm;
		if (typeof wSpec === 'number' && typeof hSpec === 'number' && wSpec > 0 && hSpec > 0) {
			return `${Math.round(wSpec)}×${Math.round(hSpec)}mm`;
		}
		const t: string = String(item?.description || '');
		const dims = t.match(/(\d+[\.,]?\d*)\s*(mm|cm|m)\s*[x×]\s*(\d+[\.,]?\d*)\s*(mm|cm|m)/i);
		if (dims) {
			const toMm = (val: string, unit: string) => {
				const v = parseFloat(val.replace(',', '.'));
				const u = unit.toLowerCase();
				if (u === 'mm') return v;
				if (u === 'cm') return v * 10;
				if (u === 'm') return v * 1000;
				return v;
			};
			const w = toMm(dims[1], dims[2]);
			const h = toMm(dims[3], dims[4]);
			return `${Math.round(w)}×${Math.round(h)}mm`;
		}
		return null;
	};

	const buildStockLine = (item: any): string => {
		// If structured stock fields exist in future, include them; for now, show Samples Available.
		const parts: string[] = [];
		if (item?.stockSqFt) parts.push(`${item.stockSqFt} SF in Stock`);
		if (Array.isArray(item?.upcomingStock)) {
			for (const u of item.upcomingStock) {
				if (u && u.amount && u.month) parts.push(`${u.amount} SF ${u.month}`);
			}
		}
		const thickness = extractThicknessMm(item);
		const weight = extractWeightKg(item);
		if (thickness) parts.push(`${thickness} Thick`);
		if (weight) parts.push(weight);
		return parts.join(' | ');
	};

	const formatDimensions = (specs: any) => {
		if (!specs) return '';
		const w = specs.width_mm ? `${specs.width_mm / 10}cm` : undefined;
		const h = specs.height_mm ? `${specs.height_mm / 10}cm` : undefined;
		const d = specs.depth_mm ? `${specs.depth_mm / 10}cm` : undefined;
		const parts = [w, h, d].filter(Boolean);
		return parts.length > 0 ? parts.join(' × ') : '';
	};

	// Minimal: compute ordered array by provided sequence (no styling changes)
	const normalize = (s: string) => s?.toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
	const alias: Record<string, string> = { toeur: "tozeur", tegla: "telga" };
	const desiredOrder = [
		"bibi",
		"square",
		"victoria",
		"done3d",
		"done",
		"mezzo",
		"trap",
		"trapx",
		"fino",
		"fleur",
		"petal",
		"45",
		"jk1",
		"jk2",
		"scarpa",
		"jk3",
		"jk4",
		"jk30",
		"jk25",
		"tozeur",
		"triangle",
		"venicien",
		"delta",
		"telga",
	];
	const byKey: Record<string, any> = {};
	for (const p of products as any[]) { const k = normalize(p.slug || p.name || ""); if (k) byKey[k] = p; }
	const ordered = desiredOrder.map(k => byKey[k]).filter(Boolean);

	return (
		<div className="min-h-screen">
			{/* Mobile Header */}
			<div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
				<div className="flex items-center justify-between px-4 py-3">
					{/* Logo on Left */}
					<div className="flex items-center">
						<img 
							src="/favicon.jpg" 
							alt="CLAUSTRAH Logo" 
							className="w-8 h-8 rounded object-cover mr-2"
						/>
						<span className="text-lg font-bold text-primary">Claustrah</span>
					</div>
					
					{/* Menu Button on Right */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="p-2 rounded-lg hover:bg-muted transition-colors"
						aria-label="Toggle mobile menu"
					>
						{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
				
				{/* Mobile Navigation Menu */}
				{isMobileMenuOpen && (
					<div className="px-4 pb-4 border-t border-border bg-background/95 backdrop-blur">
						<nav className="space-y-3 pt-4">
							<a href="/" className="block py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
								Accueil
							</a>
							<a href="/products" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
								Produits
							</a>
							<a href="/about" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
								À propos
							</a>
							<a href="/contact" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
								Contact
							</a>
							<div className="pt-2 border-t border-border">
								<a href="/cart" className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
									<ShoppingCart size={16} />
									Panier ({totalItems})
								</a>
							</div>
						</nav>
					</div>
				)}
			</div>

			{/* PC Header */}
			<div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
				<div className="container mx-auto px-6">
					<div className="flex items-center justify-between py-4">
						{/* Logo on Left */}
						<div className="flex items-center">
							<img 
								src="/favicon.jpg" 
								alt="CLAUSTRAH Logo" 
								className="w-10 h-10 rounded object-cover mr-3"
							/>
							<span className="text-xl font-bold text-primary">Claustrah</span>
						</div>
						
						{/* Navigation Links */}
						<nav className="flex items-center space-x-8">
							<a href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
								Accueil
							</a>
							<a href="/products" className="text-sm font-medium text-primary">
								Produits
							</a>
							<a href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
								À propos
							</a>
							<a href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
								Contact
							</a>
							<a href="/cart" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
								<ShoppingCart size={16} />
								Panier ({totalItems})
							</a>
						</nav>
					</div>
				</div>
			</div>

			<section className="py-24 bg-background lg:pt-[120px] pt-32">
				<div className="container mx-auto px-4 sm:px-6">
					<BackLink label="Retour" />
					<div className="text-center mb-12 sm:mb-16 animate-fade-up">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">Catalogue des produits</h1>
						<p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-muted-foreground px-4">
							Découvrez nos modèles classés par catégorie. Chaque pièce joue avec la lumière pour créer des ambiances uniques.
						</p>
					</div>

					<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 stagger-children">
						{ordered.map((item: any, index: number) => (
							<Dialog key={item.slug}>
								<DialogTrigger asChild>
									<div className="card-elegant overflow-hidden animate-scale-in cursor-pointer group" style={{ ['--stagger' as any]: index }}>
										{item.cover && (
											<div className="relative h-48 sm:h-56 lg:h-64 bg-muted flex items-center justify-center overflow-hidden">
												<img src={item.cover} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
												{/* Category badge */}
												<span className="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full bg-background/80 backdrop-blur px-2 sm:px-3 py-1 text-xs font-medium border border-border">
													{item.category || item.name}
												</span>
												{Array.isArray(item.images) && item.images.length > 0 && (
													<span className="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full bg-background/80 backdrop-blur px-2 sm:px-3 py-1 text-xs font-medium border border-border">
														{item.images.length} photos
													</span>
												)}
											</div>
										)}
										<div className="p-3 sm:p-4 lg:p-6 xl:p-8">
											<h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-primary mb-1 sm:mb-2 leading-tight">{buildTitle(item)}</h3>
											{item.slug === 'bibi' ? (
												<div className="mt-1 text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
													{"Technologie de Synthèse\n\nPure Plus (Gaz Naturel)\n\nAPI SN PLUS; ACEA A3/B3/B4\n\nMB 229.3; VW 501.01/505.00; RENAULT RN0700/RN0710"}
												</div>
											) : item.slug === 'square' ? (
												<div className="mt-1 text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
													{"Minérale\n\nAPI SL/CF; ACEA A3/B3\n\nMB 229.1; VW 501.01/505.00"}
												</div>
											) : item.slug === 'victoria' ? (
												<div className="mt-1 text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
													{"Semi-Synthèse\n\nAPI SN/CF; ACEA A3/B3/B4\n\nVW 501.01/505.00; MB 229.1; RENAULT RN 0700"}
												</div>
											) : item.slug === 'done3d' ? (
												<div className="mt-1 text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
													{"Synthèse\n\nAPI SL/CF; ACEA A3/B3"}
												</div>
											) : item.slug === 'done' ? (
												<div className="mt-1 text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
													{"100% Synthèse\n\nMID SAPS\n\nACEA C2/C3; API SP\n\n✔ BMW Longlife-04; MB 229.52/229.51/229.31; VW 505.00/505.01\nFiat 9.55535-S1/S3; Opel OV0401547; GM Dexos 2; P.S.A B71 2290 (<2018)"}
												</div>
											) : item.slug === 'mezzo' ? (
												<div className="mt-1 text-xs sm:text-sm text-muted-foreground whitespace-pre-line">
													{"100% Synthèse\n\nPure Plus (Gaz Naturel)\n\nACEA C5\n\nAPI SN\n✔ VW 508.00/509.00\n\n✔ Porsche C20"}
												</div>
											) : (
												<>
													{buildDimensionsCm(item) && (
														<div className="mt-1 text-xs sm:text-sm text-muted-foreground">{buildDimensionsCm(item)}</div>
													)}
													<div className="mt-1 text-xs sm:text-sm text-muted-foreground">{buildStockLine(item)}</div>
													{item?.specs && (
														<div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1">
															{(item.specs.width_mm || item.specs.height_mm || item.specs.depth_mm) && (
																<span>Dimensions: {formatDimensions(item.specs)}</span>
															)}
															{item.specs.thickness_mm && (
																<span>Épaisseur: {item.specs.thickness_mm / 10}cm</span>
															)}
															{item.specs.weight_kg && (
																<span>Poids: {item.specs.weight_kg}kg</span>
															)}
														</div>
													)}
												</>
											)}
											<div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-3">
												<button className="btn-accent flex items-center justify-center gap-2 w-full text-sm sm:text-base py-2 sm:py-3" onClick={(e) => { e.stopPropagation(); addToCart({ slug: item.slug, name: item.name, cover: item.cover || undefined }); toast.success('Aggiunto al carrello'); }}>
													<ShoppingCart size={16} />
													Ajouter au panier
												</button>
												<button className="btn-outline flex items-center justify-center gap-2 w-full text-sm sm:text-base py-2 sm:py-3">
													Voir plus
													<ArrowRight size={14} />
												</button>
											</div>
										</div>
									</div>
								</DialogTrigger>
								<DialogContent className="max-w-[95vw] sm:max-w-4xl md:max-w-5xl mx-2">
									<div className="space-y-4">
										<h3 className="heading-sm text-primary sticky top-0 bg-background/80 backdrop-blur z-10 py-1">{item.name}</h3>
										<ImagesCarousel images={item.images || []} alt={item.name} />
										{item.slug === 'bibi' ? (
											<p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{"Technologie de Synthèse\n\nPure Plus (Gaz Naturel)\n\nAPI SN PLUS; ACEA A3/B3/B4\n\nMB 229.3; VW 501.01/505.00; RENAULT RN0700/RN0710"}
											</p>
										) : item.slug === 'square' ? (
											<p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{"Minérale\n\nAPI SL/CF; ACEA A3/B3\n\nMB 229.1; VW 501.01/505.00"}</p>
										) : item.slug === 'victoria' ? (
											<p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{"Semi-Synthèse\n\nAPI SN/CF; ACEA A3/B3/B4\n\nVW 501.01/505.00; MB 229.1; RENAULT RN 0700"}</p>
										) : item.slug === 'done3d' ? (
											<p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{"Synthèse\n\nAPI SL/CF; ACEA A3/B3"}</p>
										) : item.slug === 'done' ? (
											<p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{"100% Synthèse\n\nMID SAPS\n\nACEA C2/C3; API SP\n\n✔ BMW Longlife-04; MB 229.52/229.51/229.31; VW 505.00/505.01\nFiat 9.55535-S1/S3; Opel OV0401547; GM Dexos 2; P.S.A B71 2290 (<2018)"}</p>
										) : item.slug === 'mezzo' ? (
											<p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{"100% Synthèse\n\nPure Plus (Gaz Naturel)\n\nACEA C5\n\nAPI SN\n✔ VW 508.00/509.00\n\n✔ Porsche C20"}</p>
										) : (
											<p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{item.description}</p>
										)}
										{item?.specs && item.slug !== 'bibi' && (
											<div className="mt-2 text-xs text-muted-foreground space-y-1">
												<div className="font-medium text-primary/90">Spécifications</div>
												<ul className="list-disc pl-5">
													{(item.specs.width_mm || item.specs.height_mm || item.specs.depth_mm) && (
														<li>Dimensions: {formatDimensions(item.specs)}</li>
													)}
													{item.specs.thickness_mm && <li>Épaisseur: {item.specs.thickness_mm / 10}cm</li>}
													{item.specs.weight_kg && <li>Poids: {item.specs.weight_kg}kg</li>}
													{item.specs.dimensions_text && <li>Notation: {item.specs.dimensions_text}</li>}
													{item.specs.techniques && <li>Techniques: {item.specs.techniques}</li>}
												</ul>
											</div>
										)}
										<div className="flex flex-col sm:flex-row gap-3 pt-2">
											<button className="btn-accent flex items-center gap-2" onClick={() => { addToCart({ slug: item.slug, name: item.name, cover: item.cover || undefined }); toast.success('Aggiunto al carrello'); }}>
												<ShoppingCart size={16} />
												Ajouter au panier
											</button>
											<button className="btn-outline inline-flex items-center gap-2" onClick={() => navigate('/cart')}>
												Aller au panier ({totalItems})
												<ArrowRight size={14} />
											</button>
										</div>
									</div>
								</DialogContent>
							</Dialog>
						))}
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ProductsPage;