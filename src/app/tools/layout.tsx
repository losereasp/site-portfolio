import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
