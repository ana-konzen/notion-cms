import { CustomBlock } from "@/notion/types";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { notionConfig } from "@/notion/config";
import { styles } from "@/notion/styles";

import { componentDict } from "@/notion/compDict";

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
