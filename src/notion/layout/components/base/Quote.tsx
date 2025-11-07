import RichText from "@/notion/layout/components/base/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Quote({
  text,
  className,
}: {
  text: RichTextItemResponse[];
  className: string;
}) {
  return (
    <div className={className}>
      <RichText richText={text} />
    </div>
  );
}
