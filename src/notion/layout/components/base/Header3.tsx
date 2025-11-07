import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header3({
  text,
  className,
}: {
  text: RichTextItemResponse[];
  className: string;
}) {
  return (
    <h3 className={className}>
      {text
        .filter((item) => item.annotations.color !== "gray")
        .map((item) => item.plain_text)}
    </h3>
  );
}
