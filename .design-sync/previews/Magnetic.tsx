import Magnetic from "../../src/app/Magnetic";

// Magnetic wraps any element so it eases toward the cursor on hover. Static
// preview shows the wrapped content at rest (the pull is a hover interaction).
export const OnButton = () => (
  <div style={{ background: "#F0F0EE", padding: 48, display: "flex", justifyContent: "center" }}>
    <Magnetic>
      <button
        className="font-mono uppercase tracking-widest text-sm px-8 py-4 bg-black text-white border-b-[3px] border-[#FF5F1F]"
        style={{ cursor: "pointer" }}
      >
        Get in touch
      </button>
    </Magnetic>
  </div>
);

export const OnLogo = () => (
  <div style={{ background: "#F0F0EE", padding: 48, display: "flex", justifyContent: "center" }}>
    <Magnetic>
      <span className="font-primary uppercase text-6xl tracking-tight text-[#FF5F1F]">LSRSP</span>
    </Magnetic>
  </div>
);
