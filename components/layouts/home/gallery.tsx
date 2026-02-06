import Image from "next/image";

const Gallery = () => {
  const galleryImages = [
    { id: 1, src: "/assets/hero.jpg", alt: "Gallery 1" },
    { id: 2, src: "/assets/hero.jpg", alt: "Gallery 2" },
    { id: 3, src: "/assets/hero.jpg", alt: "Gallery 3" },
    { id: 4, src: "/assets/hero.jpg", alt: "Gallery 4" },
    { id: 5, src: "/assets/hero.jpg", alt: "Gallery 5" },
    { id: 6, src: "/assets/hero.jpg", alt: "Gallery 6" },
  ];

  return (
    <section className="py-12 md:py-16 bg-black">
      <div className="mx-auto w-[94%] md:w-[90%] lg:w-[80%]">
        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2">
          AS SEEN ON YOU
        </h2>
        <p className="text-sm text-gray-400 mb-8">#RuthieAfrica</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
