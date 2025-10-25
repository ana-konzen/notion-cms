export const styles = {
  heading_1: "text-lg mb-4 relative mt-4",
  heading_2: "text-lg font-bold mb-2",
  heading_3: "font-bold mb-2",
  paragraph: "mb-4",
  quote: "text-red border-l-2 border-red text-sm m-8 pl-4 ml-12",
  callout: "flex bg-light-red text-sm m-8 p-4",
  table: "table-auto w-full font-sans text-sm",
};

export function modifyStyles([{ key, value }, ...rest]: {
  key: string;
  value: string;
}[]) {
  if (styles.hasOwnProperty(key)) {
    styles[key as keyof typeof styles] = value;
  }
  // Recursively modify styles for the rest of the array
  if (rest.length > 0) {
    modifyStyles(rest);
  }
}
