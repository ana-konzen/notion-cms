import { notionConfig } from "@/notion/config";

import PageLayout from "@/notion/layout/PageLayout";

import { addComponents } from "@/notion/compDict";
import CustomComponent from "@/app/CustomComponent";

addComponents({ CustomComponent });

export default async function Page() {
  return <PageLayout pageId={notionConfig.homePageId} />;
}
