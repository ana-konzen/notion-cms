import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type Id = string;

export type CustomBlock = BlockObjectResponse & {
  children?: BlockObjectResponse[];
};

interface TocItemLayout {
  id: string;
  title: string;
  slug: string;
}

export interface TocPage extends TocItemLayout {
  page_id: string; // the id of the page the block links to
  type: "page";
}

export interface TocToggle extends TocItemLayout {
  children: TocPage[];
  type: "toggle";
}

export type TocItem = TocPage | TocToggle;

// //TocLink
// export interface TocChild {
//   id: string;
//   page_id: string; // the id of the page the block links to
//   title: string;
//   slug: string;
// }
