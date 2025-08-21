import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const CartMini = () => {
	const { items, totalItems, increment, decrement, removeFromCart, clear } = useCart();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className="relative p-2 rounded-full border border-border hover:bg-accent/10 transition">
					<ShoppingCart size={18} />
					{totalItems > 0 && (
						<span className="absolute -top-1 -right-1 text-[10px] bg-accent text-white rounded-full px-1.5 py-0.5">
							{totalItems}
						</span>
					)}
				</button>
			</SheetTrigger>
			<SheetContent className="w-96">
				<SheetHeader>
					<SheetTitle>Votre panier</SheetTitle>
				</SheetHeader>
				<div className="mt-4 space-y-4">
					{items.length === 0 ? (
						<p className="text-sm text-muted-foreground">Votre panier est vide.</p>
					) : (
						<>
							{items.map((i) => (
								<div key={i.slug} className="flex items-center gap-3 p-2 border border-border rounded-md">
									{Boolean(i.cover) && (
										<img src={i.cover as string} alt={i.name} className="w-12 h-12 object-cover rounded" />
									)}
									<div className="flex-1">
										<div className="text-sm font-medium">{i.name}</div>
										<div className="flex items-center gap-2 mt-1 text-sm">
											<button onClick={() => decrement(i.slug)} className="p-1 border rounded hover:bg-muted"><Minus size={14} /></button>
											<span>{i.quantity}</span>
											<button onClick={() => increment(i.slug)} className="p-1 border rounded hover:bg-muted"><Plus size={14} /></button>
											<button onClick={() => removeFromCart(i.slug)} className="ml-auto p-1 border rounded hover:bg-muted"><Trash2 size={14} /></button>
										</div>
									</div>
								</div>
							))}
							<div className="flex justify-between items-center pt-3 border-t">
								<div className="text-sm text-muted-foreground">Articles: {totalItems}</div>
								<button onClick={clear} className="btn-outline text-sm">Vider le panier</button>
							</div>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default CartMini;

