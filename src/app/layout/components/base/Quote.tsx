import RichText from "@/app/layout/components/base/RichText";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Quote({
  text,
  style,
}: {
  text: RichTextItemResponse[];
  style: string;
}) {
  return (
    <div className={style}>
      <RichText richText={text} />
    </div>
  );
}
