export type CatalogueItem = {
	slug: string;
	name: string;
	category: string;
	cover: string;
	images: string[];
};

// Import all image assets under src/CATALOGUE (all) and only Capture5.* under src/ACCEUIL
const catalogueFiles = import.meta.glob('/src/CATALOGUE/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,svg,SVG,gif,GIF}', { eager: true, import: 'default' }) as Record<string, string>;
const accueilFiles = import.meta.glob('/src/ACCEUIL/**/Capture5.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,svg,SVG,gif,GIF}', { eager: true, import: 'default' }) as Record<string, string>;
const files = { ...catalogueFiles, ...accueilFiles } as Record<string, string>;

const EXCLUDED_PATH_REGEX = /partnerrr/i;
const EXCLUDED_FILE_REGEXES: RegExp[] = [
	/\/src\/CATALOGUE\/MANN FILTRE\/71S-pVk2d-L\._AC_SL1500_\.(?:png|jpe?g|webp|gif|svg)$/i,
];

function toSlug(input: string): string {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '');
}

function fileNameToName(fileName: string): string {
	const base = fileName.replace(/\.[^.]+$/, '');
	// Normalize separators
	let norm = base.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
	// Drop leading hash-like ids (hex/uuid-looking) and SKUs at the start
	norm = norm.replace(/^([a-f0-9]{8,}|[a-z0-9]{4,})\b\s*/i, '');
	// If still starts with a short alphanumeric code followed by name, drop it (e.g., B085011)
	norm = norm.replace(/^[a-z0-9]{5,}\b\s*/i, '');
	// Remove Amazon-like resolution suffix tokens such as 'AC SL1500'
	norm = norm.replace(/\bac\s*sl\s*\d+\b/gi, '').replace(/\s{2,}/g, ' ').trim();
	// Title case
	return norm.replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractCategoryFromPath(path: string): string {
	// path like /src/CATALOGUE/HELIX/New folder/xxx.jpg or /src/ACCEUIL/Capture5.PNG
	const parts = path.split('/').filter(Boolean);
	const roots = ['CATALOGUE', 'ACCEUIL'];
	const rootIdx = parts.findIndex(p => roots.includes(p));
	if (rootIdx >= 0) {
		const root = parts[rootIdx].toUpperCase();
		const next = parts[rootIdx + 1];
		// For CATALOGUE, use the first subfolder as category
		if (root === 'CATALOGUE' && next && !next.includes('.')) {
			return next.toUpperCase();
		}
		// For ACCEUIL, use the root name
		if (root === 'ACCEUIL') {
			return root;
		}
		// Fallback: if next looks like a file (contains a dot), use the root; otherwise use next
		return (next && !next.includes('.') ? next : root).toUpperCase();
	}
	return 'AUTRE';
}

export const catalogueItems: CatalogueItem[] = Object.entries(files)
	.filter(([absPath]) => !EXCLUDED_PATH_REGEX.test(absPath) && !EXCLUDED_FILE_REGEXES.some((r) => r.test(absPath)))
	.map(([absPath, url]) => {
		const pathParts = absPath.split('/');
		const file = pathParts[pathParts.length - 1];
		let category = extractCategoryFromPath(absPath);
		let name = fileNameToName(file);
		// Override ACCEUIL/Capture5 card name
		if (/\/src\/ACCEUIL\/.+\/Capture5\.[^.]+$/i.test(absPath) || /\/src\/ACCEUIL\/Capture5\.[^.]+$/i.test(absPath)) {
			name = 'Shell Spirax S4 TXM';
		}
		// Keep only the 61ZF4lAEncL MANN image as W 1022
		if (/\/src\/CATALOGUE\/MANN FILTRE\/61ZF4lAEncL\._AC_SL1500_\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'mann filter oil filter W 1022';
		}
		// MOTUL 5L image rename
		if (/\/src\/CATALOGUE\/MOTUL\/motul-x-clean-8100-5w-40-5-l-front\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Motul 8100 X-Clean 5W40 5L';
		}
		// MOTUL 1L image rename
		if (/\/src\/CATALOGUE\/MOTUL\/motul-5w40-8100-1l\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Motul 8100 X-CLEAN 5W40 – 1 L Front';
		}
		// Donaldson filter rename
		if (/\/src\/CATALOGUE\/donaldson filter\/64e8c9dcf25dfe3f312a82e0-b085011-donaldson-air-filter-primary\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Donaldson Air Filter Primary';
		}
		// CATALOGUE root WhatsApp image -> Delo 600 ADF SAE 10W-30
		if (/\/src\/CATALOGUE\/WhatsApp Image 2025-08-22 at 02\.55\.16_e4f15ec2\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Delo 600 ADF SAE 10W-30';
		}
		// CATALOGUE root WhatsApp image -> dasty plastic Renewer for car 750ml
		if (/\/src\/CATALOGUE\/WhatsApp Image 2025-08-22 at 02\.57\.22_18b3e4c6\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'dasty plastic Renewer for car 750ml';
		}
		// CATALOGUE root WhatsApp image -> Donaldson
		if (/\/src\/CATALOGUE\/WhatsApp Image 2025-08-22 at 03\.00\.57_e5ba6f63\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Donaldson';
		}
		// CATALOGUE root WhatsApp image -> Castrol  mengnatec stop-start 5W-30 A5
		if (/\/src\/CATALOGUE\/WhatsApp Image 2025-08-22 at 03\.03\.31_5d83b510\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Castrol  mengnatec stop-start 5W-30 A5';
		}
		// CATALOGUE root WhatsApp image -> filter a air moteur cylindrique
		if (/\/src\/CATALOGUE\/WhatsApp Image 2025-08-22 at 03\.07\.08_e174a28e\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'filter a air moteur cylindrique';
		}
		// CATALOGUE root WhatsApp image -> Ensemble filter a air moteur primaire et secondaire
		if (/\/src\/CATALOGUE\/WhatsApp Image 2025-08-22 at 03\.08\.16_f661eb39\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Ensemble filter a air moteur primaire et secondaire';
		}
		
		// Category overrides
		if (/\/src\/CATALOGUE\/donaldson filter\/64e8c9dcf25dfe3f312a82e0-b085011-donaldson-air-filter-primary\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			category = 'DONALDSON FILTER';
		}
		
		const slug = `${category.toLowerCase()}-${toSlug(name)}`;
		return {
			slug,
			name,
			category,
			cover: url,
			images: [url],
		};
	})
	// Remove any items with missing or placeholder name
	.filter((it) => Boolean(it.name && it.name.trim() && it.name.trim() !== '.'))
	.sort((a, b) => a.name.localeCompare(b.name));

export default catalogueItems;