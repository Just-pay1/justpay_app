const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { mergeConfig } = require("@react-native/metro-config");

// Get default Expo config
const defaultConfig = getDefaultConfig(__dirname, { isCSSEnabled: true });
const { assetExts, sourceExts } = defaultConfig.resolver;

// Create SVG transformer config
const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
  },
};

// Merge default config with SVG config
const mergedConfig = mergeConfig(defaultConfig, svgConfig);

// Apply NativeWind configuration
module.exports = withNativeWind(mergedConfig, { input: "./global.css" });
