
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutProduct = () => {
  const [sectionRef, sectionAnim] = useScrollReveal("animate-fade-in", 0);
  const [leftRef, leftAnim] = useScrollReveal("animate-fade-in-up", 100);
  const [rightRef, rightAnim] = useScrollReveal("animate-scale-in", 350);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`bg-beige font-jakarta py-12 ${sectionAnim}`}
      aria-labelledby="about-manscara-heading"
    >
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-10">
        <div
          ref={leftRef as React.RefObject<HTMLDivElement>}
          className={`flex-1 ${leftAnim}`}
        >
          <h3 id="about-manscara-heading" className="text-2xl font-bold mb-5 text-black">About Manscara Facewash</h3>
          <p className="text-gray-700 mb-4">
            Developed for men, Manscara Facewash is expert-grade for oily and acne-prone skin. Its gentle formula deeply cleanses pores, controls excess oil, and clarifies the skin without harsh dryness.
          </p>
          <ul className="list-disc pl-6 text-black text-base opacity-90">
            <li>Advanced oil control with <b>Zinc PCA</b> & botanical extracts</li>
            <li>Clarifies skin & prevents breakouts</li>
            <li>Non-drying, daily use for lasting freshness</li>
            <li>Zero parabens, SLS, or artificial dyes</li>
          </ul>
        </div>
        <div
          ref={rightRef as React.RefObject<HTMLDivElement>}
          className={`flex-1 flex flex-col items-center ${rightAnim}`}
        >
          <div className="w-48 h-48 bg-white rounded-full shadow-card flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
            <img
              src="https://preview--manscara-color-commerce.lovable.app/lovable-uploads/24c4d1a3-6643-4f72-9433-7d1f90d36d85.png"
              alt="Circular display image of Manscara Facewash for men"
              className="w-32 h-40 object-contain"
            />
          </div>
          <div className="bg-black/90 text-beige p-4 rounded-lg text-sm shadow-card text-center max-w-xs mt-2">
            <b>Manscara:</b> Crafted for confidence, powered by science.
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutProduct;
