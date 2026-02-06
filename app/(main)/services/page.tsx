import ServicesHero from "@/components/layouts/services/hero";
import ServicesCards from "@/components/layouts/services/cards";
import Testimonials from "@/components/layouts/services/testimonials";
import Lookbook from "@/components/layouts/services/lookbook";
import ServicesCTA from "@/components/layouts/services/cta";

export const metadata = {
  title: "Styling Services - Ruthie Africa",
  description:
    "Professional styling services tailored to your unique aesthetic",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <ServicesHero />
      <ServicesCards />
      <Testimonials />
      <Lookbook />
      <ServicesCTA />
    </main>
  );
}
