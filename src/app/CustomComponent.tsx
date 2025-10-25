import BlockChild from "@/notion/layout/components/base/BlockChild";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function CustomComponent({
  block,
  blockChildren,
}: {
  block: BlockObjectResponse;
  blockChildren: BlockObjectResponse[] | undefined;
}) {
  if (block.type !== "callout") return null;

  return (
    <div className="flex border-4 text-sm m-8 p-4">
      <div>
        {blockChildren &&
          blockChildren.map((childBlock) => (
            <BlockChild key={childBlock.id} block={childBlock} />
          ))}
      </div>
    </div>
  );
}
