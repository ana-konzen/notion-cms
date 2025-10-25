import { getToc, getContentParams } from "@/notion/notion";
import { notFound } from "next/navigation";

import PageLayout from "@/notion/layout/PageLayout";

// Pre-generates these pages at build time: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const toc = await getToc();
  const pageParams: { section: string; slug: string }[] = [];

  toc.forEach((block) => {
    block.children.map((child) => {
      pageParams.push({ section: block.slug, slug: child.slug });
    });
  });

  return pageParams;
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const pageParams = await params;
  const contentParams = await getContentParams();
  const foundParam = contentParams.find(
    (param) => param.slug === pageParams.slug
  );
  if (!foundParam) {
    notFound();
  }

  return <PageLayout pageId={foundParam.page_id} />;
}
