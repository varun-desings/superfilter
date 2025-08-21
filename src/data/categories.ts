export const CATALOGUE_CATEGORIES: string[] = [
	'DONALDSON FILTER',
	'MOTUL',
	'SHELL',
	'HELIX',
	'MANN FILTRE',
];

export function deriveCategory(productName?: string): string {
	const upper = String(productName || '').toUpperCase();
	for (const cat of CATALOGUE_CATEGORIES) {
		if (upper.includes(cat)) return cat;
	}
	return 'AUTRE';
}

export default CATALOGUE_CATEGORIES;