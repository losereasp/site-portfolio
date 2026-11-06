import type { Metadata } from "next";
import WorkArchiveClient from "./WorkArchiveClient";

export const metadata: Metadata = {
  title: "Archive // Selected Works — Iaroslav Marchenkov",
  description: "Comprehensive archive of CGI, Houdini proceduralism, motion design, and automotive visualization projects.",
  alternates: {
    canonical: "https://losereasp.com/work",
  },
};

export default function WorkPage() {
  return <WorkArchiveClient />;
}
