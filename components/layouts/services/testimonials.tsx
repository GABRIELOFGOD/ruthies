"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Amara Okafor",
      role: "Fashion Designer",
      content:
        "Ruthie completely changed how I see myself. The closet audit was a revelation. I didn't need more clothes, I needed more vision.",
      rating: 5,
      image: "/assets/hero.jpg",
    },
    {
      id: 2,
      name: "David Mensah",
      role: "Creative Director",
      content:
        "The personal shopping service for my wedding season was flawless. Every look felt bespoke to my identity.",
      rating: 5,
      image: "/assets/hero.jpg",
    },
  ];

  return (
    <section className="mt-12 md:mt-16 py-10 md:py-16 bg-emerald-600/5 border-t border-b border-white/10">
      <div className="px-4">
        <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-600 mb-8">
          Client Transformations
        </h2>

        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 no-scrollbar">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-[280px] md:min-w-[350px] flex-shrink-0 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 hover:border-emerald-600/50 transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="italic font-medium text-gray-300 leading-relaxed mb-6">
                &ldquo;{testimonial.content}&ldquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
