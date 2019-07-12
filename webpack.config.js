const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

// modules
const sass = require('./webpack/sass');
const pug = require('./webpack/pug');
const favicon = require('./webpack/favicon');
const fonts = require('./webpack/fonts');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const devserver = require('./webpack/devserver');
const svgSprite = require('./webpack/svgSprite');
const pngSprite = require('./webpack/pngSprite');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};

const commonConfig = (argv) => {
  const {mode} = argv;
  return merge([
    {
      entry: {
        app: path.join(PATHS.src, 'index.js')
      },
      optimization: {
        splitChunks: {
          cacheGroups: {
            app: {
              chunks: "initial",
              minChunks: 2
            },
            vendor: {
              test: /node_modules/,
              chunks: "initial",
              name: "vendor",
              priority: 10,
              enforce: true
            }
          }
        }
      },
      output: {
        filename: mode === 'production' ? './js/[name].[hash].js' : './js/[name].js',
        path: PATHS.dist
      },
      resolve: {
        modules: ['node_modules', 'images']
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
      ]
    },
    pug(),
    fonts(),
    images(argv),
    babel(),
    sass(argv),
    svgSprite(),
    pngSprite(),
    favicon()
  ])
};

module.exports = ((env, argv) => {
  const {mode} = argv;
  if (mode === 'production') {
    return merge([
      {
        plugins: [
          new CleanWebpackPlugin(),
          // new BundleAnalyzerPlugin()
        ]
      },
      commonConfig(argv),
    ])
  } else if (mode === 'development') {
    return merge([
      commonConfig(argv),
      devserver(),
      {
        devtool: 'eval-sourcemap'
      }
    ])
  }
});

// todos
// toDo svg icon generator (investigate if it is possible to generate css file with icons viewboxes) (2)
// toDo detectors (isIe, js-on) (1)
// toDo setUp base components (forms) (1)
// toDo open webpack analyzer by separate command (2)
// toDo make async font loading (2)
// toDo find good stylelint config (3)

