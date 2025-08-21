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
	return base
		.replace(/[-_]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/\b\w/g, (c) => c.toUpperCase());
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
		const slug = `${category.toLowerCase()}-${toSlug(name)}`;
		return {
			slug,
			name,
			category,
			cover: url,
			images: [url],
		};
	}).sort((a, b) => a.name.localeCompare(b.name));

export default catalogueItems;