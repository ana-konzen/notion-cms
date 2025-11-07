import { notionConfig } from "@/notion/config";

import PageLayout from "@/notion/layout/PageLayout";

import { changeClasses } from "@/notion/classes";

changeClasses([
  { quote: "text-cyan-600 border-l-2 border-cyan-600 text-sm m-8 pl-4 ml-12" },
]);

export default async function Page() {
  return <PageLayout pageId={notionConfig.homePageId} />;
}
