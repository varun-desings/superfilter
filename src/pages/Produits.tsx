import React from "react";

// Load all images from src/CATALOGUE
const assets = import.meta.glob("../CATALOGUE/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  as: "url",
});

function getImages(): Array<{ key: string; url: string }> {
  return Object.entries(assets)
    .map(([key, url]) => ({ key, url: String(url) }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

export default function Produits(): React.JSX.Element {
  const images = getImages();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container py-10">
        <h1 className="text-3xl font-playfair">Produits</h1>
        <p className="mt-2 text-muted-foreground">
          Using images from <code>src/CATALOGUE</code>.
        </p>

        {images.length === 0 ? (
          <div className="mt-8 text-muted-foreground">
            No images found. Add files to <code>src/CATALOGUE</code>.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map(({ key, url }) => (
              <figure key={key} className="rounded-lg overflow-hidden border">
                <img
                  src={url}
                  alt={key.split("/").pop() ?? "Image"}
                  className="w-full h-auto object-cover"
                />
                <figcaption className="p-3 text-sm text-muted-foreground truncate">
                  {key.replace("../", "")}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

