import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-[92vh] md:h-[85vh] lg:h-screen overflow-hidden">
      <Image
        src="/assets/hero.jpg"
        alt="Hero"
        fill
        className="object-cover w-full h-full"
      />

      {/* Centered card overlay to match mobile design */}
      <div className="absolute inset-0 flex items-end md:items-center justify-center z-20">
        <div className="w-[92%] md:w-3/4 lg:w-2/3 max-w-4xl mb-6 md:mb-0">
          <div className="bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm rounded-2xl p-6 md:p-10 text-center text-white shadow-xl border border-white/10">
            <h1 className="font-extrabold italic text-3xl sm:text-4xl md:text-6xl leading-tight">
              The New Heritage
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg opacity-90">
              Honoring the craft. Redefining the future. Explore our latest
              contemporary silhouettes
            </p>

            <div className="mt-6 flex justify-center">
              <Button
                size="lg"
                className="rounded-full px-6 py-3 flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700"
              >
                <span className="text-base md:text-lg">Shop collection</span>
                <ArrowRightIcon size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
