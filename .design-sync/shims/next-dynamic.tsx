// design-sync shim for next/dynamic — returns a lightweight placeholder
// component instead of code-splitting/lazy-loading. Heavy dynamically-imported
// widgets (e.g. the Three.js AssetViewer) can't render statically in a preview,
// so we substitute a neutral placeholder that keeps the parent layout intact.
import React from "react";

export default function dynamic(_loader?: unknown, _options?: unknown) {
  return function DynamicPlaceholder() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          minHeight: 200,
          background: "#111",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "monospace",
          fontSize: 12,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        3D asset
      </div>
    );
  };
}
