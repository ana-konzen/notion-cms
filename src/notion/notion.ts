// "use server";
import "dotenv/config";

import { Client } from "@notionhq/client";

import { notionConfig } from "@/notion/config";

import { createSlug } from "@/notion/util";

import type {
  Id,
  CustomBlock,
  TocItem,
  TocPage,
  TocToggle,
} from "@/notion/types";

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
    const tocItem =
      block.type === "toggle"
        ? await getTocToggle(block)
        : block.type === "link_to_page"
        ? await getTocPage(block)
        : undefined;

    if (!tocItem) continue;
    toc.push(tocItem);
  }

  return toc;
}

async function getTocPage(
  block: BlockObjectResponse
): Promise<TocPage | undefined> {
  // ignore everything but page links
  if (block.type !== "link_to_page") return;
  // link_to_pages can link to pages or databases, we only want pages
  if (block.link_to_page.type !== "page_id") return;

  // load the title of the linked page + build the TOC item
  const pageTitle = await getPageTitle(block.link_to_page.page_id);
  return {
    id: block.id,
    title: pageTitle,
    slug: createSlug(pageTitle),
    page_id: block.link_to_page.page_id,
    type: "page",
  };
}

async function getTocToggle(
  block: BlockObjectResponse
): Promise<TocToggle | undefined> {
  // only pay attention to "toggle" blocks
  if (block.type !== "toggle") return;

  // ignore sections without content
  if (!block.has_children) return;

  // prepare the children of the block
  const blockChildren = await getBlockChildren(block.id);
  const children: TocPage[] = [];
  for (const child of blockChildren) {
    const childTocItem = await getTocPage(child);
    children.push(childTocItem!);
  }

  return {
    title: block.toggle.rich_text[0].plain_text,
    slug: createSlug(block.toggle.rich_text[0].plain_text),
    id: block.id,
    children: children,
    type: "toggle",
  };
}

export async function getContentParams() {
  const toc = await getToc();

  return toc.flatMap((block) => {
    if (block.type === "page") {
      return {
        page_id: (block as TocPage).page_id,
        title: block.title,
        slug: block.slug,
        hasParent: false,
        parent_slug: "",
      };
    }
    if (block.type === "toggle") {
      return (block as TocToggle).children.map((child) => {
        return {
          parent_slug: block.slug,
          page_id: child.page_id,
          title: child.title,
          slug: child.slug,
          hasParent: true,
        };
      });
    }

    // "children" in block
    //   ? block.children.map((child) => {
    //       return {
    //         parent_slug: block.slug,
    //         page_id: child.page_id,
    //         title: child.title,
    //         slug: child.slug,
    //       };
    //     })
    //   : []
  });
}
