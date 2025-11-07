export const classes = {
  heading_1: "text-lg mb-4 relative mt-4",
  heading_2: "text-lg font-bold mb-2",
  heading_3: "font-bold mb-2",
  paragraph: "mb-4 text-sm",
  quote: "text-red border-l-2 border-red text-sm m-8 pl-4 ml-12",
  callout: "flex bg-light-red text-sm m-8 p-4",
  table: "table-auto w-full font-sans text-sm",
};

export const customClasses = [
  // Examples:
  // { condition: background === "yellow", className: "bg-yellow-100" },
  // { condition: background === "yellow" && text === "red", className: "text-4xl" },
];

type Classes = typeof classes;

export function changeClasses(
  updates: Partial<Record<keyof Classes, string>>[]
) {
  for (const update of updates) {
    Object.entries(update).forEach(([key, value]) => {
      if (key in classes && value) {
        classes[key as keyof Classes] = value;
      }
    });
  }
}

export function getClass(componentType: keyof Classes) {
  return classes[componentType];
}
