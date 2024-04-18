export default {
  plugins: {
    "postcss-import": {},
    "postcss-mixins": {},
    "postcss-nested": {},
    "postcss-nesting": {},
    "postcss-preset-env": {},
    "postcss-assets": {
      loadPaths: ["src/assets/"], // Specify the directories where your assets are located
      basePath: "/", // Specify the base path for URLs
      relative: true, // Use relative URLs
    },
    "postcss-normalize": {},
    autoprefixer: {},
    cssnano: {},
  },
};
