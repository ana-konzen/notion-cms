export const notionConfig = {
  homePageId: "",
  tocId: "",
  customMarker: ["<", ">"], // Symbol to identify custom components in callouts
  add: function ({
    homePageId,
    tocId,
    customMarker,
  }: {
    homePageId?: string;
    tocId?: string;
    customMarker?: [string, string];
  }) {
    if (homePageId) {
      this.homePageId = homePageId;
    }
    if (tocId) {
      this.tocId = tocId;
    }
    if (customMarker) {
      this.customMarker = customMarker;
    }
  },
};

// export function configNotion({
//   homePageId,
//   tocId,
//   customMarker,
// }: {
//   homePageId?: string;
//   tocId?: string;
//   customMarker?: [string, string];
// }) {
//   if (homePageId) {
//     notionConfig.homePageId = homePageId;
//   }
//   if (tocId) {
//     notionConfig.tocId = tocId;
//   }
//   if (customMarker) {
//     notionConfig.customMarker = customMarker;
//   }
// }
