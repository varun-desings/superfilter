export type CatalogueItem = {
	slug: string;
	name: string;
	category: string;
	cover: string;
	images: string[];
};

// Import all image assets under src/CATALOGUE as URLs at build time
const files = import.meta.glob('/src/CATALOGUE/**/*.{png,jpg,jpeg,webp,svg,gif}', { eager: true, import: 'default' }) as Record<string, string>;

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
	// path like /src/CATALOGUE/HELIX/New folder/xxx.jpg
	const parts = path.split('/').filter(Boolean);
	const idx = parts.indexOf('CATALOGUE');
	if (idx >= 0 && parts[idx + 1]) return parts[idx + 1].toUpperCase();
	return 'AUTRE';
}

export const catalogueItems: CatalogueItem[] = Object.entries(files).map(([absPath, url]) => {
	const pathParts = absPath.split('/');
	const file = pathParts[pathParts.length - 1];
	const category = extractCategoryFromPath(absPath);
	const name = fileNameToName(file);
	return {
		slug: `${category.toLowerCase()}-${toSlug(name)}`,
		name,
		category,
		cover: url,
		images: [url],
	};
}).sort((a, b) => a.name.localeCompare(b.name));

export default catalogueItems;