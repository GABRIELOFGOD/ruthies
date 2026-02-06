import { Button } from "@/components/ui/button";
import { Share2, Mail, AtSign } from "lucide-react";

const ServicesCTA = () => {
  return (
    <section className="mt-8 py-12 md:py-16 px-4 bg-white/5 border-t border-white/10 text-center">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready for your transformation?
        </h3>
        <p className="text-sm md:text-base text-gray-400 mb-8">
          Join the waitlist for exclusive 2024 styling slots.
        </p>

        <Button className="px-8 md:px-10 py-4 md:py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg shadow-emerald-600/30 text-base md:text-lg">
          Book Initial Consultation
        </Button>

        {/* Social Links */}
        <div className="mt-12 md:mt-16 flex justify-center gap-6">
          <button className="text-gray-400 hover:text-emerald-600 transition">
            <Share2 size={20} />
          </button>
          <button className="text-gray-400 hover:text-emerald-600 transition">
            <Mail size={20} />
          </button>
          <button className="text-gray-400 hover:text-emerald-600 transition">
            <AtSign size={20} />
          </button>
        </div>

        {/* Copyright */}
        <p className="mt-8 md:mt-12 text-[10px] text-gray-500 tracking-[0.2em] uppercase">
          © 2024 Ruthie Africa Studio
        </p>
      </div>
    </section>
  );
};

export default ServicesCTA;
