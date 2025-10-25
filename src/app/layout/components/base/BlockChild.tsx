import Paragraph from "@/app/layout/components/base/Paragraph";
import Header1 from "@/app/layout/components/base/Header1";
import Header2 from "@/app/layout/components/base/Header2";
import Header3 from "@/app/layout/components/base/Header3";
import Callout from "@/app/layout/components/base/Callout";
import Quote from "@/app/layout/components/base/Quote";
import Table from "@/app/layout/components/base/Table";
import CustomComponent from "@/app/layout/components/custom/CustomComponent";
import { CustomBlock } from "@/notion/types";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionConfig } from "@/notion/config";
import { styles } from "@/notion/styles";

const componentDict = {
  paragraph: Paragraph,
  heading_1: Header1,
  heading_2: Header2,
  heading_3: Header3,
  table: Table,
  callout: Callout,
  quote: Quote,
  CustomComponent,
};

export default function BlockChild({ block }: { block: CustomBlock }) {
  // Handle special "callout" blocks based on their first rich text content.
  if (block.type === "callout") {
    const calloutText = block.callout.rich_text[0]?.plain_text.trim();
    if (
      calloutText[0] === notionConfig.customMarker[0] &&
      calloutText[calloutText.length - 1] === notionConfig.customMarker[1]
    ) {
      const compName = calloutText.slice(1, -1);
      const Component = componentDict[compName as keyof typeof componentDict];
      if (Component) {
        return (
          <Component
            key={block.id}
            text={block.callout.rich_text as RichTextItemResponse[]}
            block={block}
            blockChildren={block.children}
            style={""}
          />
        );
      }
    }
  }

  // For other block types, check the component dictionary.
  const Component = componentDict[block.type as keyof typeof componentDict];
  if (Component) {
    const blockContent = block[block.type as keyof CustomBlock];
    if (!blockContent) return null;

    return (
      <Component
        key={block.id}
        text={
          blockContent &&
          typeof blockContent === "object" &&
          "rich_text" in blockContent
            ? (blockContent.rich_text as RichTextItemResponse[])
            : []
        }
        block={block}
        blockChildren={block.children}
        style={styles[block.type as keyof typeof styles]}
      />
    );
  }

  // Return null if no component matches.
  return null;
}
