import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackLink = ({ label = 'Retour' }: { label?: string }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleBack = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate('/');
		}
	};

	// Hide on home route
	if (location.pathname === '/') return null;

	return (
		<div className="mb-6">
			<button onClick={handleBack} className="inline-flex items-center gap-2 btn-outline px-4 py-2">
				<ArrowLeft size={16} />
				{label}
			</button>
		</div>
	);
};

export default BackLink;

