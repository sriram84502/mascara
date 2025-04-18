
import { ShoppingCart, Star } from "lucide-react";
import CTAButtons from "./CTAButtons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const HeroSection = () => {
  const [sectionRef, sectionAnim] = useScrollReveal("animate-fade-in", 0);
  const [headingRef, headingAnim] = useScrollReveal("animate-fade-in-up", 100);
  const [pRef, pAnim] = useScrollReveal("animate-fade-in-up", 200);
  const [btnRef, btnAnim] = useScrollReveal("animate-scale-in", 350);
  const [imgRef, imgAnim] = useScrollReveal("animate-scale-in", 500);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`w-full bg-gradient-to-br from-beige to-sand py-12 md:py-20 font-jakarta relative overflow-hidden ${sectionAnim}`}
      aria-label="Manscara Facewash hero"
    >
      <div className="container flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left space-y-7">
          <h1
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            className={`text-4xl md:text-5xl font-extrabold text-black leading-tight ${headingAnim}`}
          >
            Reveal <span className="text-accent">confidence</span> in every wash,<br className="hidden md:inline"/> with <span className="text-black">Manscara Facewash</span>
          </h1>
          <p
            ref={pRef as React.RefObject<HTMLParagraphElement>}
            className={`text-gray-500 text-lg font-medium max-w-xl mx-auto md:mx-0 ${pAnim}`}
          >
            The modern solution for oily and acne-prone skin &mdash; oil control, clarifying & uniquely crafted for bold skin health.
          </p>
          <div ref={btnRef as React.RefObject<HTMLDivElement>} className={btnAnim}>
            <CTAButtons />
          </div>
          <div className={`flex items-center gap-2 pt-2 justify-center md:justify-start`}>
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-base text-black font-bold">4.8/5</span>
            <span className="text-accent ml-1">(192 reviews)</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            ref={imgRef as React.RefObject<HTMLImageElement>}
            src="https://preview--manscara-color-commerce.lovable.app/lovable-uploads/24c4d1a3-6643-4f72-9433-7d1f90d36d85.png"
            alt="Product shot of Manscara Facewash for men, solution for oily and acne-prone skin"
            className={`w-[320px] h-[400px] object-contain rounded-xl shadow-card bg-gradient-to-t from-sand to-beige border-2 border-beige hover:scale-105 transition-transform duration-300 ${imgAnim}`}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
