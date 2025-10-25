import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header1({
  text,
  style,
}: {
  text: RichTextItemResponse[];
  style: string;
}) {
  return (
    <h1 className={style}>
      {text
        .filter((item) => item.annotations.color !== "gray")
        .map((item) => item.plain_text)}
    </h1>
  );
}
