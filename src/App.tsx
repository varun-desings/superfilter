import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductsPage from "./pages/Products";
import NotFound from "./pages/NotFound";
import { CartProvider } from "@/contexts/CartContext";
import CartPage from "./pages/Cart";
import FloatingCart from "@/components/FloatingCart";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<CartProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<HashRouter>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/products" element={<ProductsPage />} />
						<Route path="/cart" element={<CartPage />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
					<FloatingCart />
				</HashRouter>
			</TooltipProvider>
		</CartProvider>
	</QueryClientProvider>
);

export default App;