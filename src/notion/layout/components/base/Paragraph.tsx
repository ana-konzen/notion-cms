import RichText from "@/notion/layout/components/base/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Paragraph({
  text,
  style,
}: {
  text: RichTextItemResponse[];
  style: string;
}) {
  return (
    <p className={style}>
      <RichText richText={text} />
    </p>
  );
}
