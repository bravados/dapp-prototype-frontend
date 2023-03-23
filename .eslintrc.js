module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  settings: {
    next: {
      rootDir: ['.'],
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'off', // this is here to allow hooks that seems to be not happening inside components, but are finally called inside components (chain).
  },
};
