import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export default function Header2({
  text,
  style,
}: {
  text: RichTextItemResponse[];
  style: string;
}) {
  return (
    <h2 className={style}>
      {text
        .filter((item) => item.annotations.color !== "gray")
        .map((item) => item.plain_text)}
    </h2>
  );
}
