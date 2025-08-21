import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
	slug: string;
	name: string;
	cover?: string | null;
	quantity: number;
};

type CartContextValue = {
	items: CartItem[];
	addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
	removeFromCart: (slug: string) => void;
	increment: (slug: string) => void;
	decrement: (slug: string) => void;
	clear: () => void;
	totalItems: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'superfiltre.cart.v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [items, setItems] = useState<CartItem[]>([]);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch {}
	}, [items]);

	const addToCart: CartContextValue['addToCart'] = (item, qty = 1) => {
		setItems(prev => {
			const idx = prev.findIndex(i => i.slug === item.slug);
			if (idx >= 0) {
				const next = [...prev];
				next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
				return next;
			}
			return [...prev, { ...item, quantity: qty }];
		});
	};

	const removeFromCart = (slug: string) => setItems(prev => prev.filter(i => i.slug !== slug));
	const increment = (slug: string) => setItems(prev => prev.map(i => i.slug === slug ? { ...i, quantity: i.quantity + 1 } : i));
	const decrement = (slug: string) => setItems(prev => prev.flatMap(i => {
		if (i.slug !== slug) return [i];
		const q = i.quantity - 1;
		return q > 0 ? [{ ...i, quantity: q }] : [];
	}));
	const clear = () => setItems([]);

	const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

	const value: CartContextValue = { items, addToCart, removeFromCart, increment, decrement, clear, totalItems };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
};

