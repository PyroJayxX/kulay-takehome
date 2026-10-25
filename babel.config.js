module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // jsxImportSource lets nativewind handle className
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // nativewind preset for tailwind transforms
      "nativewind/babel",
    ],
  };
};