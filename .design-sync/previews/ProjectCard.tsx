import ProjectCard from "../../src/app/ProjectCard";
import { FROST_CORE, STANLEY } from "../fixtures";

// Portfolio work card — hero render with an idle title overlay; hover reveals
// the category, description and software tags (hover state not shown statically).
export const Featured = () => (
  <div style={{ width: 640, height: 380 }}>
    <ProjectCard id="frost-core" data={FROST_CORE} onClick={() => {}} isFeatured className="w-full h-full" />
  </div>
);

export const Standard = () => (
  <div style={{ width: 440, height: 320 }}>
    <ProjectCard id="stanley-bottle" data={STANLEY} onClick={() => {}} className="w-full h-full" />
  </div>
);
