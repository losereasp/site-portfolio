// design-sync shim for next/link — renders a plain anchor so components
// that use <Link> bundle & render without a Next router context.
import React from "react";

type LinkProps = {
  href?: string | { pathname?: string };
  children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({ href, children, ...rest }: LinkProps) {
  const h = typeof href === "string" ? href : href?.pathname ?? "#";
  // drop next-only props that aren't valid DOM attributes
  const { prefetch, replace, scroll, shallow, locale, passHref, legacyBehavior, ...dom } =
    rest as Record<string, unknown>;
  return (
    <a href={h} {...(dom as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  );
}
