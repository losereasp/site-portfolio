// design-sync shim for next/image — renders a plain <img> so components
// bundle & render without Next's image optimization pipeline.
import React from "react";

type ImgSrc = string | { src: string };
type ImageProps = {
  src?: ImgSrc;
  alt?: string;
} & Record<string, unknown>;

export default function Image({ src, alt = "", ...rest }: ImageProps) {
  const s = typeof src === "string" ? src : src?.src ?? "";
  // strip next-only props so React doesn't warn about unknown DOM attrs
  const {
    fill,
    priority,
    quality,
    placeholder,
    blurDataURL,
    loader,
    sizes,
    unoptimized,
    onLoadingComplete,
    loading,
    ...dom
  } = rest;
  const style = fill
    ? { position: "absolute" as const, inset: 0, width: "100%", height: "100%", ...(dom.style as object) }
    : (dom.style as object);
  return <img src={s} alt={alt} {...(dom as React.ImgHTMLAttributes<HTMLImageElement>)} style={style} />;
}
