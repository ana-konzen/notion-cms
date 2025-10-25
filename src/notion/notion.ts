// "use server";
import "dotenv/config";

import { Client } from "@notionhq/client";

import { notionConfig } from "@/notion/config";

import { createSlug } from "@/util";

import type { Id, CustomBlock, TocChild, TocItem } from "@/notion/types";

// import types from notion
import type {
  GetPageParameters,
  PartialPageObjectResponse,
  PageObjectResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

function isFullPage(
  response: PageObjectResponse | PartialPageObjectResponse
): response is PageObjectResponse {
  return "properties" in response;
}
function isFullBlock(
  block: BlockObjectResponse | PartialBlockObjectResponse
): block is BlockObjectResponse {
  return "type" in block;
}

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

export async function getBlockChildren(
  block_id: Id
): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 100,
  });

  // Recursively fetch all children blocks
  const allChildren = await Promise.all(
    response.results.filter(isFullBlock).map(async (block: CustomBlock) => {
      if (block.has_children) {
        block.children = await getBlockChildren(block.id);
      }
      return block;
    })
  );

  return allChildren;
}

export async function getPageContent(block_id: Id): Promise<CustomBlock[]> {
  const blocks = await getBlockChildren(block_id);
  const blocksWithChildren = await Promise.all(
    blocks.map(async (block: CustomBlock) => {
      if (block.has_children) {
        block.children = await getBlockChildren(block.id);
      }
      return block;
    })
  );
  return blocksWithChildren;
}

export async function getPageTitle(
  page_id: GetPageParameters | Id
): Promise<string> {
  const params = typeof page_id === "string" ? { page_id } : page_id;
  const response = await notion.pages.retrieve(params);
  if (!isFullPage(response)) {
    throw new Error("Expected full page");
  }
  if (!(response.properties.title.type === "title")) {
    throw new Error("Expected title to be of type title");
  }
  return response.properties.title.title[0].plain_text.trim();
}

// TocSection

/**
 *
 */

export async function getToc(): Promise<TocItem[]> {
  const blocks = await getBlockChildren(notionConfig.tocId);
  const toc: TocItem[] = [];

  for (const block of blocks) {
    // ignore sections without content
    if (!block.has_children) continue;
    // only pay attention to "toggle" blocks
    if (block.type !== "toggle") continue;

    // prepare the children of the block
    const blockChildren = await getBlockChildren(block.id);
    const children: TocChild[] = [];
    for (const child of blockChildren) {
      // ignore everything but page links
      if (child.type !== "link_to_page") continue;
      // link_to_pages can link to pages or databases, we only want pages
      if (child.link_to_page.type !== "page_id") continue;

      // load the title of the linked page + build the TOC child
      const childTitle = await getPageTitle(child.link_to_page.page_id);
      children.push({
        id: child.id,
        title: childTitle,
        slug: createSlug(childTitle),
        page_id: child.link_to_page.page_id,
      });
    }

    // create the TOC item and add it
    toc.push({
      title: block.toggle.rich_text[0].plain_text,
      slug: createSlug(block.toggle.rich_text[0].plain_text),
      id: block.id,
      children: children,
    });
  }

  return toc;
}

export async function getContentParams() {
  const toc = await getToc();

  return toc.flatMap((block) =>
    block.children
      ? block.children.map((child) => {
          return {
            parent_slug: block.slug,
            page_id: child.page_id,
            title: child.title,
            slug: child.slug,
          };
        })
      : []
  );
}
