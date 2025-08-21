import products from '@/data/products';
import catalogueItems from '@/data/catalogue';
import CATEGORIES, { deriveCategory as deriveCategoryFromName } from '@/data/categories';
import logoImg from '@/components/Ste Super Filtre.jpg';
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
	const [activeCategory, setActiveCategory] = useState<string>('Tous');
	
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
		if (item?.slug === 'bibi' || item?.slug === 'square' || item?.slug === 'victoria' || item?.slug === 'done3d' || item?.slug === 'done' || item?.slug === 'mezzo' || item?.slug === 'trap' || item?.slug === 'trapx' || item?.slug === 'fino') return String(item?.name || '');
		const size = extractPrimarySizeInches(item?.description);
		const parts = [item?.name, size && size].filter(Boolean);
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
	// Using catalogue items directly; sections below will group by category
		// Using catalogueItems directly as the data source; one card per file already


	const ordered = catalogueItems as any[];

	const categories = Array.from(new Set((ordered as any[]).map((it) => it?.category || deriveCategoryFromName(it?.name)))).sort();
	const baseOptions = Array.from(new Set([...CATEGORIES, ...categories])).sort();
	const categoryOptions = ['Tous', ...baseOptions];
	const filtered = activeCategory === 'Tous' ? ordered : (ordered as any[]).filter((it) => (it?.category || deriveCategoryFromName(it?.name)) === activeCategory);

	const getCustomDescription = (item: any): string | null => {
		const n = String(item?.name || '').toLowerCase();
		// Shell Helix Ultra 5W40 - 209L (drum) base variant (no parentheses)
		if (n.includes('helix ultra') && n.includes('5w40') && !n.includes('ect') && !n.includes('(')) {
			return 'Viscosité: 5W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 209 L (drum)';
		}
		// Shell Helix Ultra 5W40 (1) - specific variant 5L
		if (n.includes('helix ultra') && n.includes('5w40') && !n.includes('ect') && n.includes('(1')) {
			return 'Viscosité: 5W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 5 L';
		}
		// Shell Helix Ultra 5W40 (2) - specific variant 1L
		if (n.includes('helix ultra') && n.includes('5w40') && !n.includes('ect') && n.includes('(2')) {
			return 'Viscosité: 5W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 1 L';
		}
		// Shell Helix Ultra 5W40
		if (n.includes('helix ultra') && n.includes('5w40') && !n.includes('ect')) {
			return 'Synthétique\n\nConditionnements : 1L / 5L';
		}
		// Shell Helix Ultra ECT 5W30 - 1L base variant (no parentheses)
		if (n.includes('helix ultra') && n.includes('ect') && n.includes('5w30') && !n.includes('(')) {
			return 'Viscosité: 5W-30\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 1 L';
		}
		// Shell Helix Ultra ECT 5W30 (1) - specific variant 5L
		if (n.includes('helix ultra') && n.includes('ect') && n.includes('5w30') && n.includes('(1')) {
			return 'Viscosité: 5W-30\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 5 L';
		}
		// Shell Helix Ultra ECT 5W30
		if (n.includes('helix ultra') && n.includes('ect') && n.includes('5w30')) {
			return 'Synthétique\n\nConditionnements: 1L / 5L';
		}
		// Shell Rimula R4 X 15W40 - 20L base variant (no parentheses)
		if (n.includes('rimula') && n.includes('r4') && n.includes('15w40') && !n.includes('(')) {
			return 'Viscosité: 15W-40\n\nMarque: Shell\n\nType de véhicule: Moteurs diesel pour véhicules lourds et utilitaires\n\n\n\ Volvo VDS-3\n\nVolume : 20 L';
		}
		// Shell Rimula R4 X 15W40 (1) - specific variant 5L
		if (n.includes('rimula') && n.includes('r4') && n.includes('15w40') && n.includes('(1')) {
			return 'Viscosité: 15W-40\n\nMarque: Shell\n\nType de véhicule: Moteurs diesel pour véhicules lourds et utilitaires\n\nVolume: 5 L';
		}
		// Shell Rimula R4 X 15W40 (2) - specific variant 209L
		if (n.includes('rimula') && n.includes('r4') && n.includes('15w40') && n.includes('(2')) {
			return 'Viscosité: 15W-40\n\nMarque: Shell\n\nType de véhicule: Moteurs diesel pour véhicules lourds et utilitaires\n\nVolume: 209 L';
		}
		// Shell Helix HX7 10W40 - 209L (drum) base variant (no parentheses)
		if (n.includes('helix hx7') && n.includes('10w40') && !n.includes('(')) {
			return 'Viscosité: 10W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 209 L (drum)';
		}
		// Shell Helix HX7 10W40 (1) - specific variant 5L
		if (n.includes('helix hx7') && n.includes('10w40') && n.includes('(1')) {
			return 'Viscosité: 10W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 5 L';
		}
		// Shell Helix HX7 10W40 (2) - specific variant 1L
		if (n.includes('helix hx7') && n.includes('10w40') && n.includes('(2')) {
			return 'Viscosité: 10W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 1 L';
		}
		// Shell Helix HX7 10W40
		if (n.includes('helix hx7') && n.includes('10w40')) {
			return 'Semi-synthétique\n\nConditionnements: 1L / 5L';
		}
		// Shell Helix HX5 15W40 (1) - specific variant 20L
		if (n.includes('helix hx5') && n.includes('15w40') && n.includes('(1')) {
			return 'Viscosité: 15W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 20 L';
		}
		// Shell Helix HX5 15W40 (2) - specific variant 4L
		if (n.includes('helix hx5') && n.includes('15w40') && n.includes('(2')) {
			return 'Viscosité: 15W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 4 L';
		}
		// Shell Helix HX5 15W40 (3) - specific variant 3L
		if (n.includes('helix hx5') && n.includes('15w40') && n.includes('(3')) {
			return 'Viscosité: 15W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 3 L';
		}
		// Shell Helix HX5 15W40
		if (n.includes('helix hx5') && n.includes('15w40')) {
			return 'Viscosité: 15W-40\n\nMarque: Shell\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 5 L';
		}
		// Shell Spirax S2 A 80W90 - 209L (drum) base variant (no parentheses)
		if (n.includes('spirax') && n.includes('s2') && n.includes('a') && n.includes('80w90') && !n.includes('(')) {
			return 'Viscosité: 80W-90\n\nMarque: Shell\n\nType de véhicule: Transmission et ponts pour véhicules lourds et utilitaires\n\nVolume: 209 L (drum)';
		}
		// Shell Spirax S2 ATF D2 - 1L base variant (no parentheses)
		if (n.includes('spirax') && n.includes('s2') && n.includes('atf') && n.includes('d2') && !n.includes('(')) {
			return 'Type: Huile de transmission automatique (ATF)\n\nMarque: Shell\n\nApplication: Boîtes automatiques et systèmes hydrauliques légers\n\nVolume: 1 L';
		}
		// Shell Spirax S2 ATF D2 (1) - specific variant 20L
		if (n.includes('spirax') && n.includes('s2') && n.includes('atf') && n.includes('d2') && n.includes('(1')) {
			return 'Type: Huile de transmission automatique (ATF)\n\nMarque: Shell\n\nApplication: Boîtes automatiques et systèmes hydrauliques légers\n\nVolume: 20 L';
		}
		// Shell Spirax S2 ATF D2 (2) - specific variant 209L
		if (n.includes('spirax') && n.includes('s2') && n.includes('atf') && n.includes('d2') && n.includes('(2')) {
			return 'Type: Huile de transmission automatique (ATF)\n\nMarque: Shell\n\nApplication: Boîtes automatiques et systèmes hydrauliques légers\n\nVolume: 209 L (drum)';
		}
		// Shell Spirax S2 G 90 - 90L base variant (no parentheses)
		if (n.includes('spirax') && n.includes('s2') && n.includes('g') && n.includes('90') && !n.includes('(')) {
			return 'Viscosité: 90\n\nMarque: Shell\n\nType de véhicule: Transmission et ponts pour véhicules lourds et utilitaires\n\nVolume: 90 L';
		}
		// Shell Spirax S2 G 90 (1) - specific variant 2L
		if (n.includes('spirax') && n.includes('s2') && n.includes('g') && n.includes('90') && n.includes('(1')) {
			return 'Viscosité: 90\n\nMarque: Shell\n\nType de véhicule: Transmission et ponts pour véhicules lourds et utilitaires\n\nVolume: 2 L';
		}
		// Shell Spirax S4 TXM
		if (n.includes('spirax') && n.includes('s4') && n.includes('txm')) {
			return 'Type: Huile de transmission automatique / synchrone\n\nMarque: Shell\n\nApplication: Boîtes de vitesses et transmissions industrielles\n\nVolume: 20 L';
		}
		// Shell Tellus S2 M68
		if (n.includes('tellus') && n.includes('s2') && n.includes('m68')) {
			return 'Viscosité: ISO VG 68\n\nMarque: Shell\n\nType de fluide: Huile hydraulique industrielle\n\nPoint d’éclair: 235 °C (approx.)\n\nFabricant: Shell\n\nVolume: 208,2 L (55 gallons)';
		}
		// Shell Tellus S2 M46 (3) - specific variant 1L
		if (n.includes('tellus') && n.includes('s2') && n.includes('m46') && n.includes('(3')) {
			return 'Viscosité: ISO VG 46\n\nMarque: Shell\n\nType de fluide: Huile hydraulique industrielle\n\nPoint d’éclair: 230 °C (approx.)\n\nFabricant: Shell\n\nVolume: 1 L (1000 ml)';
		}
		// Shell Tellus S2 M46 (1) - specific variant 20L
		if (n.includes('tellus') && n.includes('s2') && n.includes('m46') && n.includes('(1')) {
			return 'Viscosité: ISO VG 46\n\nMarque: Shell\n\nType de fluide: Huile hydraulique industrielle\n\nPoint d’éclair: 230 °C (approx.)\n\nFabricant: Shell\n\nVolume: 20 L';
		}
		// Shell Tellus S2 M46 (2) - specific variant 5L
		if (n.includes('tellus') && n.includes('s2') && n.includes('m46') && n.includes('(2')) {
			return 'Viscosité: ISO VG 46\n\nMarque: Shell\n\nType de fluide: Huile hydraulique industrielle\n\nPoint d’éclair: 230 °C (approx.)\n\nFabricant: Shell\n\nVolume: 5 L (5000 ml)';
		}
		// Shell Tellus S2 M46
		if (n.includes('tellus') && n.includes('s2') && n.includes('m46')) {
			return 'Viscosité: ISO VG 46\n\nMarque: Shell\n\nType de fluide: Huile hydraulique industrielle\n\nPoint d’éclair: 230 °C (approx.)\n\nFabricant: Shell\n\nVolume: 208,2 L (55 gallons)';
		}
		// Motul 8100 X-Clean 5W40 5L (specific variant)
		if (n.includes('motul') && n.includes('8100') && n.includes('x-clean') && n.includes('5w40') && (n.includes(' 5l') || n.endsWith('5l'))) {
			return 'Viscosité: 5W-40\n\nMarque: Motul\n\nType de véhicule: Voitures particulières, SUV et utilitaires légers\n\nVolume: 5 L';
		}
		// Motul 8100 X-Clean 5W40 1L (specific variant)
		if (n.includes('motul') && n.includes('8100') && n.includes('x-clean') && n.includes('5w40') && (n.includes(' 1 l') || n.includes('1l') || (n.includes('front') && n.includes('1')))) {
			return 'Viscosité: 5W-40\n\nMarque: Motul\n\nVolume: 1 L';
		}
		// Motul 8100 X-Clean 5W40
		if (n.includes('motul') && n.includes('8100') && n.includes('x-clean') && n.includes('5w40')) {
			return 'Viscosité : 5W-40\n\nMarque : Motul\n\nType de véhicule : Voitures particulières, SUV et utilitaires légers\n\nPoint d’éclair : 228 °C\n\nFabricant : Motul\n\nVolume : 5 L (5000 ml)';
		}
		// Donaldson Air Filter Primary
		if (n.includes('donaldson') && n.includes('air') && n.includes('filter') && n.includes('primary')) {
			return 'Type: Filtre à air primaire\n\nMarque: Donaldson\n\nFonction: Protège le moteur en filtrant la poussière et les particules\n\nApplication: Véhicules légers, camions et machines industrielles (selon modèle)\n\nVolume / Taille: Selon référence spécifique';
		}
		// MANN-FILTER W 1022 (Oil Filter)
		if (
			n.includes('mann') &&
			(n.includes('w 1022') || n.includes('w1022') || n.includes('w-1022')) &&
			(n.includes('oil filter') || n.includes('filtre à huile') || n.includes('filter'))
		) {
			return 'Type: Filtre à huile\n\nMarque: MANN-FILTER\n\nRéférence: W 1022\n\nFonction: Élimine les impuretés et particules de l’huile pour protéger le moteur\n\nApplication: Véhicules particuliers et utilitaires légers (selon compatibilité)';
		}
		return null;
	};
	
	return (
		<div className="min-h-screen">
			{/* Mobile Header */}
			<div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
				<div className="flex items-center justify-between px-4 py-3">
					{/* Logo on Left */}
					<div className="flex items-center">
						<img 
							src={logoImg} 
							alt="Super Filtre Logo" 
							className="w-8 h-8 rounded object-cover mr-2"
						/>
						<span className="text-lg font-bold text-primary">Super Filtre</span>
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
							src={logoImg} 
							alt="Super Filtre Logo" 
							className="w-10 h-10 rounded object-cover mr-3"
						/>
							<span className="text-xl font-bold text-primary">Super Filtre</span>
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
						<h1 className="heading-lg text-primary mb-3 sm:mb-4">Catalogue des produits</h1>
						<p className="text-sm sm:text-base lg:text-lg max-w-3xl mx-auto text-muted-foreground px-4">
							Découvrez nos modèles classés par catégorie. Chaque pièce joue avec la lumière pour créer des ambiances uniques.
						</p>
					</div>

					{/* Category Filters */}
					<div className="mb-6 sm:mb-8 flex gap-2 flex-wrap justify-center">
						{categoryOptions.map((cat) => (
							<button
								key={cat}
								onClick={() => setActiveCategory(cat)}
								className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${activeCategory === cat ? 'bg-accent text-white border-accent' : 'bg-background text-primary border-border hover:bg-muted'}`}
							>
								{cat}
							</button>
						))}
					</div>

					{/* Grouped Sections */}
					{(activeCategory === 'Tous' ? baseOptions : [activeCategory]).map((cat) => {
						const items = (ordered as any[]).filter((it) => (it?.category || deriveCategoryFromName(it?.name)) === cat);
						if (items.length === 0) return null;
						return (
							<section key={cat} className="mb-10 sm:mb-14">
								<h2 className="text-lg sm:text-xl font-semibold text-primary mb-4 sm:mb-6">{cat}</h2>
								<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 stagger-children">
									{items.map((item: any, index: number) => (
										<Dialog key={item.slug}>
											<DialogTrigger asChild>
												<div className="card-elegant overflow-hidden animate-scale-in cursor-pointer group" style={{ ['--stagger' as any]: index }}>
													{item.cover && (
														<div className="relative h-48 sm:h-56 lg:h-64 bg-muted flex items-center justify-center overflow-hidden">
															<img src={item.cover} alt={item.name} className="max-w-full max-h-full object-contain" />
															{/* Category badge */}
															<span className="absolute top-2 sm:top-3 left-2 sm:left-3 rounded-full bg-background/80 backdrop-blur px-2 sm:px-3 py-1 text-xs font-medium border border-border">
																{item?.category || deriveCategoryFromName(item?.name)}
															</span>
															{Array.isArray(item.images) && item.images.length > 0 && (
																<span className="absolute top-2 sm:top-3 right-2 sm:right-3 rounded-full bg-background/80 backdrop-blur px-2 sm:px-3 py-1 text-xs font-medium border border-border">
																	{item.images.length} photos
																</span>
															)}
														</div>
													)}
																						<div className="p-3 sm:p-4 lg:p-6 xl:p-8">
										<h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-inter font-bold text-primary mb-2 sm:mb-3 leading-tight">{buildTitle(item)}</h3>
										{getCustomDescription(item) ? (
											<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{getCustomDescription(item) as string}</div>
														) : item.slug === 'bibi' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"Technologie de Synthèse\n\nPure Plus (Gaz Naturel)\n\nVW 501.01/505.00; RENAULT RN0700/RN0710"}
															</div>
														) : item.slug === 'acceuil-shell-spirax-s4-txm' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"Protection contre l'usure & oxydation\n\nHaute stabilité thermique et longue durée\n\n📦 Disponible en 20L et 209L"}
															</div>
														) : item.slug === 'square' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"Minérale"}
															</div>
														) : item.slug === 'victoria' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"Semi-Synthèse"}
															</div>
														) : item.slug === 'done3d' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"Synthèse"}
															</div>
														) : item.slug === 'done' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"100% Synthèse\n\nMID SAPS"}
															</div>
														) : item.slug === 'mezzo' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"100% Synthèse\n\nPure Plus (Gaz Naturel)"}
															</div>
														) : item.slug === 'trap' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"Minérale"}
															</div>
														) : item.slug === 'trapx' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"100% Synthèse\n\nLONG LIFE"}
															</div>
														) : item.slug === 'fino' ? (
															<div className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
																{"5W-40\n\nMarque : Motul\n\nCompatibilité : Voiture, SUV, Camion\n\nPoint d'éclair : 228°C (442°F)"}
															</div>
														) : (
															<></>
														)}
														<div className="mt-4 sm:mt-5 flex flex-col gap-2 sm:gap-3">
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
													{/* reuse same conditional description blocks here (already exist below) */}
													{getCustomDescription(item) ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{getCustomDescription(item) as string}</p>
													) : item.slug === 'bibi' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"Technologie de Synthèse\n\nPure Plus (Gaz Naturel)\n\nVW 501.01/505.00; RENAULT RN0700/RN0710"}
														</p>
													) : item.slug === 'acceuil-shell-spirax-s4-txm' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"Protection contre l'usure & oxydation\n\nHaute stabilité thermique et longue durée\n\n📦 Disponible en 20L et 209L"}
														</p>
													) : item.slug === 'square' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"Minérale"}</p>
													) : item.slug === 'victoria' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"Semi-Synthèse"}</p>
													) : item.slug === 'done3d' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"Synthèse"}</p>
													) : item.slug === 'done' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"100% Synthèse\n\nMID SAPS"}</p>
													) : item.slug === 'mezzo' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"100% Synthèse\n\nPure Plus (Gaz Naturel)"}</p>
													) : item.slug === 'trap' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"Minérale"}</p>
													) : item.slug === 'trapx' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"100% Synthèse\n\nLONG LIFE"}</p>
													) : item.slug === 'fino' ? (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{"5W-40\n\nMarque : Motul\n\nCompatibilité : Voiture, SUV, Camion\n\nPoint d’éclair : 228°C (442°F)"}</p>
													) : (
														<p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">{item.description}</p>
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
							</section>
						);
					})}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default ProductsPage;
