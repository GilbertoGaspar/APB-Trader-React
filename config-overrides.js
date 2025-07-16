module.exports = function override(config) {
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  loaders.forEach(loader => {
    if (loader.test && loader.test.toString().includes('.scss')) {
      loader.use = loader.use.map(use => {
        if (use.loader && use.loader.includes('sass-loader')) {
          use.loader = require.resolve('sass-loader');
          use.options.implementation = require('sass');
        }
        return use;
      });
    }
  });
  return config;
};