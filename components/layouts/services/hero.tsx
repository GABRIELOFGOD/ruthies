// import Image from "next/image";

const ServicesHero = () => {
  return (
    <header className="relative px-4 py-6 md:py-8">
      <div
        className="relative min-h-[480px] md:min-h-[500px] rounded-2xl overflow-hidden flex flex-col justify-end p-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(20, 30, 30, 0) 0%, rgba(20, 30, 30, 0.9) 100%), url("/assets/hero.jpg")`,
        }}
      >
        <div className="absolute inset-0 pattern-overlay opacity-10"></div>
        <div className="relative z-10 space-y-3">
          <span className="inline-block px-4 py-2 bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase rounded-full">
            Bespoke Styling
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Elevate Your
            <br />
            <span className="text-emerald-600 italic">Aesthetic.</span>
          </h1>
          <p className="text-gray-300 max-w-sm text-sm md:text-base font-light leading-relaxed pt-2">
            Professional styling tailored to your unique personality and
            high-end lifestyle.
          </p>
        </div>
      </div>
    </header>
  );
};

export default ServicesHero;
