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
		// If there is a subfolder under the root, use that as category for CATALOGUE; for ACCEUIL without subfolder, use root name
		if (next && next.includes('.')) {
			return root; // next is a file, so no subfolder
		}
		return (next ?? root).toUpperCase();
	}
	return 'AUTRE';
}

export const catalogueItems: CatalogueItem[] = Object.entries(files)
	.filter(([absPath]) => !EXCLUDED_PATH_REGEX.test(absPath))
	.map(([absPath, url]) => {
		const pathParts = absPath.split('/');
		const file = pathParts[pathParts.length - 1];
		const category = extractCategoryFromPath(absPath);
		let name = fileNameToName(file);
		// Override ACCEUIL/Capture5 card name
		if (/\/src\/ACCEUIL\/.+\/Capture5\.[^.]+$/i.test(absPath) || /\/src\/ACCEUIL\/Capture5\.[^.]+$/i.test(absPath)) {
			name = 'Shell Spirax S4 TXM';
		}
		// Overrides
		if (/\/src\/CATALOGUE\/MANN FILTRE\/61ZF4lAEncL\._AC_SL1500_\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'mann filter oil filter W 1022';
		}
		if (/\/src\/CATALOGUE\/MANN FILTRE\/71S-pVk2d-L\._AC_SL1500_\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'mann filter oil filter W 1022';
		}
		if (/\/src\/CATALOGUE\/MOTUL\/motul-5w40-8100-1l\.(?:png|jpe?g|webp|gif|svg)$/i.test(absPath)) {
			name = 'Motul 8100 X-Clean 5W40';
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