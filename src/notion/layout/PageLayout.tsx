import PageTitle from "@/notion/layout/components/base/PageTitle";
import BlockChild from "@/notion/layout/components/base/BlockChild";

import { getPageContent, getPageTitle } from "@/notion/notion";

export default async function PageLayout({ pageId }: { pageId: string }) {
  const pageContent = await getPageContent(pageId);
  const pageTitle = await getPageTitle(pageId);
  return (
    <>
      <PageTitle title={pageTitle} />
      {pageContent.map((block) => (
        <BlockChild key={block.id} block={block} />
      ))}
    </>
  );
}
