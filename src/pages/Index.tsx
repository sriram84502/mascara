
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import AboutProduct from "@/components/AboutProduct";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-beige min-h-screen font-jakarta pb-10 flex flex-col">
      <header>
        <Navbar />
      </header>
      <main>
        <HeroSection />
        <ProductCatalog />
        <AboutProduct />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
