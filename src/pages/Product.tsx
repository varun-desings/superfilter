import React from "react";

// Eagerly import all images in src/CATALOGUE (jpg/png/webp/avif)
// If the folder is missing now, this will simply render empty until assets are added
const catalogueImages = import.meta.glob("../CATALOGUE/**/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  as: "url",
});

function getImageEntries(): Array<{ key: string; url: string }> {
  return Object.entries(catalogueImages)
    .map(([key, url]) => ({ key, url: String(url) }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

export default function Product(): React.JSX.Element {
  const images = getImageEntries();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container py-10">
        <h1 className="text-3xl font-playfair">Products</h1>
        <p className="mt-2 text-muted-foreground">
          Images are loaded from <code>src/CATALOGUE</code>.
        </p>

        {images.length === 0 ? (
          <div className="mt-8 text-muted-foreground">
            No images found. Add product images to <code>src/CATALOGUE</code>.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map(({ key, url }) => (
              <figure key={key} className="rounded-lg overflow-hidden border">
                <img src={url} alt={key.split("/").pop() ?? "Product image"} className="w-full h-auto object-cover" />
                <figcaption className="p-3 text-sm text-muted-foreground truncate">{key.replace("../", "")}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

