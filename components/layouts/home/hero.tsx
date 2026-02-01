import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <Image
        src="/assets/hero.jpg"
        alt="Hero"
        fill
        className="object-cover relative w-full h-auto"
      />
      <div className="absolute h-full bg-linear-to-b from-primary/20 via-black/80 to-black/90 z-20 w-[80%] mx-auto">
        <div className="flex flex-col gap-5 justify-end items-center h-full py-20 px-6">
          <h1 className="text-white md:text-8xl text-6xl font-extrabold italic text-center">The New Heritage</h1>
          <p className="text-white text-xl text-center">Honring the craft. Redefining the future. Explore our latest contemporary sihouettes</p>
          <Button
            size="lg"
            className="rounded-full mt-5 flex gap-3 h-16"
          >
            <span className="text-lg my-auto">Shop collection</span>
            <ArrowRightIcon className="my-auto" size={25} />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
