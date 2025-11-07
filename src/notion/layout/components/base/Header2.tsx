import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header2({
  text,
  className,
}: {
  text: RichTextItemResponse[];
  className: string;
}) {
  return (
    <h2 className={className}>
      {text
        .filter((item) => item.annotations.color !== "gray")
        .map((item) => item.plain_text)}
    </h2>
  );
}
