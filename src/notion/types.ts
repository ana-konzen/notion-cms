import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type Id = string;

export type CustomBlock = BlockObjectResponse & {
  children?: BlockObjectResponse[];
};

export interface TocItem {
  id: string;
  title: string;
  slug: string;
  children: TocChild[];
}

//TocLink
export interface TocChild {
  id: string;
  page_id: string; // the id of the page the block links to
  title: string;
  slug: string;
}
