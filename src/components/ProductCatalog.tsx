
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProductCatalog = () => {
  const [sectionRef, sectionAnim] = useScrollReveal("animate-fade-in-up", 0);
  const [cardRef, cardAnim] = useScrollReveal("animate-scale-in", 200);
  const [imgRef, imgAnim] = useScrollReveal("animate-scale-in", 400);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`bg-white font-jakarta py-12 ${sectionAnim}`}
      aria-label="Product section"
    >
      <div className="container max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-between">
        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`flex-1 text-center sm:text-left ${cardAnim}`}
        >
          <h2 className="text-2xl font-bold mb-2 text-black">Manscara Facewash 100mL</h2>
          <p className="text-gray-600 text-base mb-4 max-w-md">
            <span className="font-medium">Oily <span className="text-black">|</span> Acne-Prone Skin</span><br />
            Effectively controls oil, unclogs pores and clarifies deeply without over-drying for a confident everyday look.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="bg-beige px-4 py-2 rounded-lg shadow-card border text-black font-semibold">₹299</span>
            <Button className="bg-black text-beige flex items-center gap-2 px-6 py-2 rounded-md shadow hover:bg-accent hover:text-black transition duration-300 transform hover:scale-105 font-semibold text-base animate-scale-in">
              <ShoppingCart className="w-5 h-5" /> Buy Now
            </Button>
          </div>
        </div>
        <div
          className="flex-1 flex flex-col gap-6 items-center"
        >
          <img
            ref={imgRef as React.RefObject<HTMLImageElement>}
            src="https://preview--manscara-color-commerce.lovable.app/lovable-uploads/24c4d1a3-6643-4f72-9433-7d1f90d36d85.png"
            alt="Manscara Facewash bottle product image"
            className={`w-[230px] h-[290px] object-contain rounded-xl border-2 border-beige shadow-card transition-transform duration-300 hover:scale-105 ${imgAnim}`}
          />
          <ul className="text-black opacity-90 text-sm space-y-1">
            <li>&#10003; Oil control & clarifying action</li>
            <li>&#10003; Suitable for all skin types</li>
            <li>&#10003; Dermatologically tested</li>
            <li>&#10003; Cruelty-free & vegan</li>
            <li>&#10003; 100% Paraben & SLS free</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
