import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/tools",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
