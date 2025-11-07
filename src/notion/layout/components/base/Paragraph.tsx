import RichText from "@/notion/layout/components/base/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Paragraph({
  text,
  className,
}: {
  text: RichTextItemResponse[];
  className: string;
}) {
  return (
    <p className={className}>
      <RichText richText={text} />
    </p>
  );
}
