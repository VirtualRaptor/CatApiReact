// config-overrides.js
const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-react-jsx',
  ),
);
