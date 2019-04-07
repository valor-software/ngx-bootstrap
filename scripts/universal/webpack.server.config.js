const path = require('path');
const webpack = require('webpack');
const WebpackConfigFactory = require('@nestjs/ng-universal')
  .WebpackConfigFactory;

let webpackConfig = WebpackConfigFactory.create(webpack, {
  server: './scripts/universal/server.ts',
  prerender: './scripts/universal/prerender.ts'
});

webpackConfig.output = {
  path: path.join(__dirname, '../../demo/dist'),
  filename: '[name].js'
};

webpackConfig.module = {
  rules: [
    {
      test: /\.ts$/,
      loader: 'ts-loader'
    }
  ]
};

module.exports = webpackConfig;
