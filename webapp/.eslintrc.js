const generatedFiles = ["**/__generated__", "schema.ts"];

module.exports = {
  root: true,
  extends: ["@frontendlive", "next"],
  ignorePatterns: ["*.js", ...generatedFiles],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  settings: {
    react: {
      version: "detect",
    },
    polyfills: ["fetch"],
  },
};
