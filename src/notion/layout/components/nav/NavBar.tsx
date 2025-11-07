import { getToc } from "@/notion/notion";
import type { TocItem } from "@/notion/types";

import ToggleBlock from "@/notion/layout/components/nav/ToggleBlock";

export default async function NavBar() {
  const toc = await getToc();
  return (
    <div className="flex flex-col">
      <Toc content={toc} />
    </div>
  );
}

function Toc({ content }: { content: TocItem[] }) {
  return (
    <>
      {content.map((block) => {
        if (block.type === "page") {
          return (
            <div key={block.id} className="mb-2">
              <a
                href={`/${block.slug}`}
                className="text-sm text-gray hover:text-gray-800"
              >
                {block.title}
              </a>
            </div>
          );
        }
        return (
          <ToggleBlock
            key={block.id}
            title={block.title}
            slug={block.slug}
            blockChildren={block.children}
          />
        );
      })}
    </>
  );
}
