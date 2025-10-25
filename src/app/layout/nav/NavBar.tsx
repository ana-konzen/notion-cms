import { getToc } from "@/notion/notion";
import type { TocItem } from "@/notion/types";

import ToggleBlock from "@/app/layout/nav/ToggleBlock";
import Link from "next/link";

export default async function NavBar() {
  const toc = await getToc();
  return (
    <div className="z-10 hidden border-r border-r-gray md:block h-screen fixed p-4 w-64">
      <Link href="/">
        <h1 className="font-bold mb-4">Notion Example</h1>
      </Link>
      <div className="flex flex-col">
        <Toc content={toc} />
      </div>
    </div>
  );
}

function Toc({ content }: { content: TocItem[] }) {
  return (
    <>
      {content.map((block) => {
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
