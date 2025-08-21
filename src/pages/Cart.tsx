import { useCart } from '@/contexts/CartContext';
import { Mail, Phone, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BackLink from '@/components/BackLink';
import Footer from '@/components/Footer';

const CartPage = () => {
	const { items, increment, decrement, removeFromCart, clear, totalItems } = useCart();
	const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
	const [sent, setSent] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const cartItems = items.map(i => `${i.name} (Qty: ${i.quantity})`).join('\n');
			const formData = new FormData();
			formData.append('access_key', '8788a892-b38f-4ef9-ae05-44b79506701c');
			formData.append('name', form.name);
			formData.append('email', form.email);
			formData.append('phone', form.phone);
			formData.append('message', `Cart Items:\n${cartItems}\n\nCustomer Message:\n${form.message}`);
			formData.append('subject', 'New Order Request');
			
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				body: formData
			});
			
			if (!response.ok) throw new Error('Request failed');
			setSent(true);
			clear();
		} catch (err) {
			console.error(err);
			alert('Failed to send your order. Please try again.');
		}
	};

	if (sent) {
		return (
			<div className="min-h-screen">
				<section className="py-24 bg-background">
					<div className="container mx-auto px-6 text-center">
						<h1 className="heading-lg text-primary mb-4">Commande envoyée</h1>
						<p className="body-lg">Merci ! Votre commande a été placée. Nous vous contacterons très bientôt.</p>
					</div>
				</section>
				<Footer />
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<section className="py-24 bg-background">
			<div className="container mx-auto px-6">
				<BackLink label="Retour" />
				<div className="text-center mb-16">
					<h1 className="heading-lg text-primary mb-2">Votre panier</h1>
					<p className="body-lg">Articles: {totalItems}</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
					<div className="space-y-4">
						{items.length === 0 ? (
							<p className="text-muted-foreground">Aucun article dans le panier.</p>
						) : (
							items.map(i => (
								<div key={i.slug} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
									{i.cover && <img src={i.cover} alt={i.name} className="w-16 h-16 object-cover rounded" />}
									<div className="flex-1">
										<div className="font-medium">{i.name}</div>
										<div className="mt-1 flex items-center gap-1 sm:gap-2 text-sm">
											<button className="px-2 py-1 border rounded" onClick={() => decrement(i.slug)}>-</button>
											<span>{i.quantity}</span>
											<button className="px-2 py-1 border rounded" onClick={() => increment(i.slug)}>+</button>
											<button className="ml-auto p-2 border rounded" onClick={() => removeFromCart(i.slug)}><Trash2 size={14} /></button>
										</div>
									</div>
								</div>
							))
						)}
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<h2 className="heading-sm text-primary">Coordonnées</h2>
						<div className="grid sm:grid-cols-2 gap-4">
													<input className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base" placeholder="Nom complet" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
						<input type="email" className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
						</div>
						<input className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base" placeholder="Téléphone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
						<textarea className="w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg min-h-32 text-sm sm:text-base" placeholder="Votre message (optionnel)" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
						<button type="submit" className="btn-accent inline-flex items-center gap-2">
							<Send size={16} />
							Envoyer la commande
						</button>
					</form>
				</div>
			</div>
		</section>
		<Footer />
		</div>
	);
};

export default CartPage;

