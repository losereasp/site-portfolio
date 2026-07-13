// Shared preview fixtures — realistic data drawn from the repo's own
// src/app/data/projects.ts, plus on-brand SVG placeholder art (data-URIs, so
// previews are fully self-contained: the repo's real /public renders can't
// resolve at file:// or on claude.ai/design).

// Use literal `#` in the SVG; encodeURIComponent encodes it exactly once.
const svg = (w: number, h: number, inner: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${inner}</svg>`,
  )}`;

// Cinematic real-time environment (FROST CORE vibe): cold dark with an orange horizon.
export const ENV_IMG = svg(
  800,
  500,
  `<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
     <stop offset='0' stop-color='#0a161b'/><stop offset='0.75' stop-color='#040607'/>
   </linearGradient></defs>
   <rect width='800' height='500' fill='url(#g)'/>
   <ellipse cx='400' cy='470' rx='320' ry='120' fill='#FF5F1F' opacity='0.28'/>
   <rect y='352' width='800' height='2' fill='#FF5F1F' opacity='0.55'/>
   <g fill='#12262e'><rect x='120' y='150' width='40' height='210'/><rect x='300' y='90' width='70' height='270'/><rect x='470' y='140' width='50' height='220'/><rect x='620' y='110' width='60' height='250'/></g>`,
);

// Premium product render (STANLEY BOTTLE vibe): warm dark with a rim light.
export const PRODUCT_IMG = svg(
  800,
  500,
  `<defs><radialGradient id='r' cx='0.5' cy='0.45' r='0.7'>
     <stop offset='0' stop-color='#241a12'/><stop offset='1' stop-color='#070605'/>
   </radialGradient></defs>
   <rect width='800' height='500' fill='url(#r)'/>
   <rect x='355' y='120' width='90' height='260' rx='16' fill='#151210'/>
   <rect x='362' y='120' width='10' height='260' rx='6' fill='#FF5F1F' opacity='0.7'/>
   <ellipse cx='400' cy='400' rx='150' ry='26' fill='#000000' opacity='0.6'/>`,
);

// Unlit / clay render (BEFORE state): flat neutral grey, no lighting.
export const UNLIT_IMG = svg(
  800,
  400,
  `<rect width='800' height='400' fill='#8a8a88'/>
   <g fill='#767674'><rect x='120' y='120' width='90' height='200'/><rect x='320' y='80' width='150' height='240'/><rect x='560' y='140' width='110' height='180'/></g>
   <rect width='800' height='400' fill='#ffffff' opacity='0.04'/>`,
);

// Lit / final render (AFTER state): same composition, cinematic lighting + accent.
export const LIT_IMG = svg(
  800,
  400,
  `<defs><linearGradient id='l' x1='0' y1='0' x2='1' y2='1'>
     <stop offset='0' stop-color='#1a2a30'/><stop offset='1' stop-color='#070a0b'/>
   </linearGradient></defs>
   <rect width='800' height='400' fill='url(#l)'/>
   <g fill='#0d1a1f'><rect x='120' y='120' width='90' height='200'/><rect x='320' y='80' width='150' height='240'/><rect x='560' y='140' width='110' height='180'/></g>
   <ellipse cx='400' cy='380' rx='300' ry='90' fill='#FF5F1F' opacity='0.3'/>
   <rect x='320' y='80' width='6' height='240' fill='#FF5F1F' opacity='0.6'/>`,
);

export const FROST_CORE = {
  title: "FROST CORE",
  category: "REAL-TIME ENVIRONMENT",
  thematicHeader: "Climate Shift",
  description:
    "A dense cinematic environment built in Unreal Engine 5, inspired by the grim atmosphere of Frostpunk — high-contrast lighting and heavy set dressing.",
  software: ["Unreal Engine", "Blender", "Substance Painter", "After Effects"],
  heroImage: ENV_IMG,
  beforeImage: UNLIT_IMG,
  afterImage: LIT_IMG,
  modelPath: "/generator_site_final.glb",
  assets: [ENV_IMG, PRODUCT_IMG, LIT_IMG],
};

export const STANLEY = {
  title: "STANLEY BOTTLE",
  category: "CGI & 3D MOTION",
  description:
    "A product-visualization and look-development study of the iconic Stanley Tumbler — premium materials, high-fidelity light play, detailed cinematography.",
  software: ["Cinema 4D", "Redshift", "After Effects"],
  heroImage: PRODUCT_IMG,
  assets: [PRODUCT_IMG, ENV_IMG],
};
