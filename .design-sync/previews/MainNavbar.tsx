import MainNavbar from "../../src/app/MainNavbar";

// Fixed top navigation — magnetic "LSRSP" wordmark + section links, with an
// orange underline accent. Two surfaces: over dark hero art, and light mode.
export const OverDark = () => (
  <div style={{ position: "relative", minHeight: 160, background: "#0a0a0a" }}>
    <MainNavbar />
  </div>
);

export const LightMode = () => (
  <div style={{ position: "relative", minHeight: 160, background: "#F0F0EE" }}>
    <MainNavbar lightMode />
  </div>
);
