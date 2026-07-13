// design-sync bundle entry — named re-exports so each app component lands on
// window.<GLOBAL>.<Name>. The repo's components are default exports; the
// converter's synth entry (`export *`) can't see defaults, so we name them here.
export { default as Footer } from "../src/app/Footer";
export { default as ProjectCard } from "../src/app/ProjectCard";
export { default as MainNavbar } from "../src/app/MainNavbar";
export { default as BeforeAfterSlider } from "../src/app/BeforeAfterSlider";
export { default as ProjectOverlay } from "../src/app/ProjectOverlay";
export { default as LocalTime } from "../src/app/LocalTime";
export { default as Magnetic } from "../src/app/Magnetic";
export { default as ScrollMarquee } from "../src/app/ScrollMarquee";
export { default as LoadingScreen } from "../src/app/LoadingScreen";
