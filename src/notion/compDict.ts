import Paragraph from "@/notion/layout/components/base/Paragraph";
import Header1 from "@/notion/layout/components/base/Header1";
import Header2 from "@/notion/layout/components/base/Header2";
import Header3 from "@/notion/layout/components/base/Header3";
import Callout from "@/notion/layout/components/base/Callout";
import Quote from "@/notion/layout/components/base/Quote";
import Table from "@/notion/layout/components/base/Table";

export const componentDict = {
  paragraph: Paragraph,
  heading_1: Header1,
  heading_2: Header2,
  heading_3: Header3,
  table: Table,
  callout: Callout,
  quote: Quote,
};

export function addComponent(newComponents: {
  [key: string]: React.ComponentType<never>;
}) {
  Object.assign(componentDict, newComponents);
}
