import Image from "next/image";
import Link from "next/link";

const Lookbook = () => {
  const galleryImages = [
    {
      id: 1,
      src: "/assets/hero.jpg",
      alt: "Avant-garde African fashion styling",
      tall: true,
    },
    {
      id: 2,
      src: "/assets/hero.jpg",
      alt: "Vibrant patterns and textures",
      tall: false,
    },
    {
      id: 3,
      src: "/assets/hero.jpg",
      alt: "Modern African street style",
      tall: false,
    },
    {
      id: 4,
      src: "/assets/hero.jpg",
      alt: "Editorial fashion composition",
      tall: true,
    },
  ];

  return (
    <section className="px-4 py-12 md:py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight italic text-white">
          The Lookbook
        </h2>
        <Link
          href="#"
          className="text-xs font-bold text-emerald-600 border-b border-emerald-600 pb-1 hover:text-emerald-500"
        >
          VIEW ALL
        </Link>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {/* Column 1 */}
        <div className="space-y-3 md:space-y-4">
          <div className="rounded-lg overflow-hidden h-64 md:h-80 bg-gray-700 group cursor-pointer">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              width={500}
              height={500}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
            />
          </div>
          <div className="rounded-lg overflow-hidden h-48 md:h-56 bg-gray-700 group cursor-pointer">
            <Image
              src={galleryImages[1].src}
              alt={galleryImages[1].alt}
              width={500}
              height={300}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-3 md:space-y-4">
          <div className="rounded-lg overflow-hidden h-48 md:h-56 bg-gray-700 group cursor-pointer">
            <Image
              src={galleryImages[2].src}
              alt={galleryImages[2].alt}
              width={500}
              height={300}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
            />
          </div>
          <div className="rounded-lg overflow-hidden h-64 md:h-80 bg-gray-700 group cursor-pointer">
            <Image
              src={galleryImages[3].src}
              alt={galleryImages[3].alt}
              width={500}
              height={500}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
