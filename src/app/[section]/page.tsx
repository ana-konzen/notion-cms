import { getContentParams } from "@/notion/notion";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/notion/layout/PageLayout";

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const pageParams = await params;
  const contentParams = await getContentParams();

  const foundParam = contentParams.find(
    (param) =>
      param?.slug === pageParams.section ||
      param?.parent_slug === pageParams.section
  );

  if (!foundParam) {
    notFound();
  }

  if (!foundParam.hasParent) {
    return <PageLayout pageId={foundParam.page_id} />;
  }

  const navLinks = contentParams.filter(
    (param) => param?.parent_slug === pageParams.section
  );

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link?.page_id}
          className="text-red font-bold font-sans"
          href={`/${link?.parent_slug}/${link?.slug}`}
        >
          {link?.title}
        </Link>
      ))}
    </>
  );
}
