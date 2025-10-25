import { notionConfig } from "@/notion/config";

import PageLayout from "@/app/layout/PageLayout";

export default async function Page() {
  return <PageLayout pageId={notionConfig.homePageId} />;
}
