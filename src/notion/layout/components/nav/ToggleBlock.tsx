"use client";
import classNames from "classnames";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { TocChild } from "@/notion/types";
import Link from "next/link";

import { useState } from "react";

interface ToggleBlockProps {
  title: string;
  slug: string;
  blockChildren: TocChild[];
}

export default function ToggleBlock({
  title,
  slug,
  blockChildren,
}: ToggleBlockProps) {
  const [visible, setVisible] = useState(true);

  const itemClass = classNames({
    hidden: !visible,
    block: visible,
  });

  const arrowClass = classNames({
    "size-4": true,
  });

  return (
    <div className={"text-sm"}>
      <div
        className={`mb-2 mt-4 font-bold select-none cursor-pointer flex pb-1 justify-between`}
        onClick={() => setVisible(!visible)}
      >
        {title}
        {visible ? (
          <ChevronUpIcon className={arrowClass} />
        ) : (
          <ChevronDownIcon className={arrowClass} />
        )}
      </div>
      <div className={`${itemClass} ml-2 border-l pl-4 flex flex-col`}>
        {blockChildren.map((child) => {
          return (
            <Link href={`/${slug}/${child.slug}`} key={child.id}>
              {child.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
