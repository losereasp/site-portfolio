import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "../../data/projects";
import WorkArchiveClient from "../WorkArchiveClient";

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug as keyof typeof PROJECTS_DATA];

  if (!project) {
    return {
      title: "Project Not Found — Iaroslav Marchenkov",
    };
  }

  const title = `${project.title} — Iaroslav Marchenkov`;
  const description = project.descriptionEn || project.description;
  const canonicalUrl = `https://losereasp.com/work/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: project.heroImage,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.heroImage],
    },
  };
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in PROJECTS_DATA)) {
    notFound();
  }

  return <WorkArchiveClient initialProjectSlug={slug} />;
}
