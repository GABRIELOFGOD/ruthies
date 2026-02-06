import Announcement from "@/components/layouts/home/announcement";
import Categories from "@/components/layouts/home/categories";
import Features from "@/components/layouts/home/features";
import Gallery from "@/components/layouts/home/gallery";
import Hero from "@/components/layouts/home/hero";
import Newsletter from "@/components/layouts/home/newsletter";
import QuoteSection from "@/components/layouts/home/quote";
import Footer from "@/components/layouts/home/footer";

export default function Home() {
  return (
    <div>
      <Announcement />
      <Hero />
      <Categories />
      <Features />
      <QuoteSection />
      <Gallery />
      <Newsletter />
      <Footer />
    </div>
  );
}
