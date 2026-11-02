import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/work",
  },
};

export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
