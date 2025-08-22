import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import logoImg from './components/WhatsApp Image 2025-08-22 at 02.52.50_2329ead5.jpg'

// Set favicon dynamically using bundled logo image
(() => {
  try {
    const head = document.head;
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      head.appendChild(link);
    }
    link.href = logoImg;

    // Also update social preview images
    let og = document.querySelector("meta[property='og:image']") as HTMLMetaElement | null;
    if (!og) {
      og = document.createElement('meta');
      og.setAttribute('property', 'og:image');
      head.appendChild(og);
    }
    og.setAttribute('content', logoImg);

    let tw = document.querySelector("meta[name='twitter:image']") as HTMLMetaElement | null;
    if (!tw) {
      tw = document.createElement('meta');
      tw.setAttribute('name', 'twitter:image');
      head.appendChild(tw);
    }
    tw.setAttribute('content', logoImg);
  } catch {}
})();

createRoot(document.getElementById("root")!).render(<App />);
