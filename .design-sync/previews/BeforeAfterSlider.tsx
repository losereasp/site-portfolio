import BeforeAfterSlider from "../../src/app/BeforeAfterSlider";
import { UNLIT_IMG, LIT_IMG } from "../fixtures";

// Draggable before/after comparison — unlit clay render vs the final lit frame,
// with an orange handle. Static preview shows the 50/50 split.
export const UnlitVsLit = () => (
  <div style={{ width: 720 }}>
    <BeforeAfterSlider beforeImage={UNLIT_IMG} afterImage={LIT_IMG} />
  </div>
);
