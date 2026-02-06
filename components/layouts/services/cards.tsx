"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  tag: string;
  features: string[];
  cta: string;
  variant: "primary" | "secondary";
}

const ServicesCards = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-12">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-gray-700 rounded-2xl"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 space-y-4 md:space-y-6 py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Curated Services
          </h2>
          <div className="h-1 w-12 bg-emerald-600 mt-3"></div>
        </div>
        <span className="text-xs text-gray-400 font-medium hidden md:inline">
          SCROLL TO EXPLORE
        </span>
      </div>

      {/* Service Cards */}
      {services.map((service) => (
        <div
          key={service.id}
          className={`flex flex-col gap-5 rounded-2xl border p-6 md:p-8 relative overflow-hidden group transition-all ${
            service.variant === "primary"
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          {/* Gradient Blob Background */}
          {service.variant === "primary" && (
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl group-hover:bg-emerald-600/20 transition-all duration-700"></div>
          )}

          <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-2 flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                {service.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-400">
                {service.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="text-right min-w-fit">
              <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-600">
                {service.tag}
              </span>
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                ${service.price}
              </span>
            </div>
          </div>

          {/* Features List */}
          {service.features.length > 0 && (
            <div className="relative z-10 space-y-3">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="text-emerald-600 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-sm md:text-base text-gray-300 font-light">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="relative z-10 pt-2">
            <Button
              className={`w-full py-4 md:py-5 font-bold text-base rounded-lg transition-all ${
                service.variant === "primary"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              {service.cta}
              <span className="ml-2">→</span>
            </Button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServicesCards;
