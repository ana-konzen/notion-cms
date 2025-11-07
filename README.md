# Notion as CMS

This is a simple integration of Notion as a CMS, using Next as a framework.

This repo contains the custom library integrating Notion (src/notion) and an
example website (src/app).

I used some Tailwind mixed with vanilla css.

You can access the Notion page used to make the website
[here](https://www.notion.so/Test-Page-2975ddb24d8a80488119c7600e19d8f3?source=copy_link).
And the table of contents
[here](https://www.notion.so/Table-of-Contents-2975ddb24d8a80dcb9c1ef9bd0b2f033).

The example website is deployed [here](https://notion-cms-roan.vercel.app/).

## Features

Currently, only tables, callouts, and blockquotes are supported. I'm adding
support for images, videos, and columns soon.

You can create custom components with callouts, check the example to learn how
to do it.

You can create a table of contents with Notion's toggle list. Make sure the
contents inside the list are only **links to pages**.

If you have any suggestions feel free to get in touch with me or create a pull
request!

## Getting Started

Follow
[this tutorial](https://developers.notion.com/docs/create-a-notion-integration#getting-started)
to set up your Notion integration and get an API key.

Once you have your key, add it to your .env file like so:

```
NOTION_KEY=ntn_1234567890
```

**Make sure NOTION_KEY is written exactly as is!**

You also need two page IDs: one for your landing page, and another for your
table of contents (where you'll host your other pages).

You can find a page's IDs by looking at its URL:

notion .so /Table-of-Contents-**2975ddb24d8a80dcb9c1ef9bd0b2f033** **<--this**
**is the pageID!**

In your layout.tsx, use notionConfig to add your main page and TOC ids, like so:

```
import { notionConfig } from "@/notion/config";

notionConfig.add({
  homePageId: "2975ddb24d8a80488119c7600e19d8f3",
  tocId: "2975ddb24d8a80dcb9c1ef9bd0b2f033",
});
```
