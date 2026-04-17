export const PATHS = {
  ASSETS: "/assets",
  IMAGES: "/assets/images",
  ICONS: "/assets/icons",
  NEWS_API: {
    BASE_URL: "https://newsapi.org/v2",
    KEY: "f13b65083542451eae651fb001dd66fd",
    ENDPOINTS: {
      TOP_HEADLINES: "/top-headlines",
      EVERYTHING: "/everything",
    },
  },
} as const;
