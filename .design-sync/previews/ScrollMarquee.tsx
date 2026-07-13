import ScrollMarquee from "../../src/app/ScrollMarquee";

// Scroll-linked horizontal marquee. The scrub is driven by scroll position;
// the static preview shows the repeating headline band it renders.
const Word = () => (
  <span className="font-primary uppercase text-5xl md:text-7xl tracking-tight text-black">
    CG ARTIST <span className="text-[#FF5F1F]">✦</span> 3D GENERALIST
  </span>
);

export const Headline = () => (
  <div style={{ background: "#F0F0EE" }}>
    <ScrollMarquee direction={1}>
      <Word />
    </ScrollMarquee>
  </div>
);
