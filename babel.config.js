module.exports = function (api) {
  api.cache(true);
  
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove console statements in production
      ...(isProduction 
        ? [
            ['transform-remove-console', { exclude: ['error', 'warn'] }],
            ['transform-remove-debugger']
          ] 
        : []
      ),
      // Optimize imports
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './',
            '@components': './components',
            '@screens': './screens',
            '@utils': './utils',
            '@constants': './constants',
            '@context': './context',
            '@hooks': './hooks',
            '@navigation': './navigation',
          },
        },
      ],
    ],
  };
};
