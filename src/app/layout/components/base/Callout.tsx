import RichText from "@/app/layout/components/base/RichText";
import BlockChild from "@/app/layout/components/base/BlockChild";
import {
  RichTextItemResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export default function Callout({
  text,
  block,
  blockChildren,
  style,
}: {
  text: RichTextItemResponse[];
  block: BlockObjectResponse;
  blockChildren: BlockObjectResponse[] | undefined;
  style: string;
}) {
  if (block.type !== "callout") return null;
  const emoji =
    block.callout.icon?.type === "emoji" ? block.callout.icon.emoji : null;

  return (
    <div className={style}>
      <div className="mr-4 text-xl">{emoji}</div>
      <div>
        <RichText richText={text} />
        {blockChildren &&
          blockChildren.map((childBlock) => (
            <BlockChild key={childBlock.id} block={childBlock} />
          ))}
      </div>
    </div>
  );
}
