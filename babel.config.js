module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          unstable_allowlist: ['expo-router']
        }
      ]
    ],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};