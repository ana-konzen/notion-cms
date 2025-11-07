import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header1({
  text,
  className,
}: {
  text: RichTextItemResponse[];
  className: string;
}) {
  return (
    <h1 className={className}>
      {text
        .filter((item) => item.annotations.color !== "gray")
        .map((item) => item.plain_text)}
    </h1>
  );
}
