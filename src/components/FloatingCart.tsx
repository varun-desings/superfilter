import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingCart = () => {
	const { totalItems } = useCart();
	const navigate = useNavigate();

	return (
		<button
			onClick={() => navigate('/cart')}
			className="fixed left-4 bottom-4 z-50 bg-background/95 backdrop-blur border shadow-architectural hover:shadow-deep transition-all rounded-xl px-4 py-3 flex items-center gap-3"
			aria-label="Ouvrir le panier"
		>
			<div className="relative">
				<ShoppingCart size={18} />
				<span className="absolute -top-2 -right-2 text-[10px] bg-accent text-white rounded-full px-1.5 py-0.5">
					{totalItems}
				</span>
			</div>
			<span className="text-sm font-medium">Panier</span>
		</button>
	);
};

export default FloatingCart;

