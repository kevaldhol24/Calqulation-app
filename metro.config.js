const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable tree shaking and optimize bundle
config.transformer.minifierConfig = {
  mangle: {
    keep_fnames: true,
  },
  output: {
    ascii_only: true,
    quote_style: 3,
    wrap_iife: true,
  },
  sourceMap: false,
  toplevel: false,
  warnings: false,
  ecma: 8,
};

// Optimize asset handling
config.resolver.assetExts.push(
  // Add any additional asset extensions you need
  'bin',
  'txt',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'svg'
);

// Add platform-specific extensions for better tree shaking
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

// Enable asset plugins for optimization
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

// Optimize for production
if (process.env.NODE_ENV === 'production') {
  // Disable debugger in production
  config.transformer.stripSources = true;
  
  // Enable asset optimization
  config.transformer.enableAssetOptimization = true;
  
  // Reduce bundle size by removing console statements
  config.transformer.removeConsole = true;
}

module.exports = config;
