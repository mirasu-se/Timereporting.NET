const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    // Entry points for different modules
    applicationCommon: path.resolve(__dirname, '../src/js/applicationCommon.js'),
    applicationVendor: path.resolve(__dirname, '../src/js/applicationVendor.js'),
    previewTimeReportModule: path.resolve(__dirname, '../src/js/presentation/views/timereport/previewTimeReportModule.js'),
    createTimeReportModule: path.resolve(__dirname, '../src/js/presentation/views/timereport/createTimeReportModule.js'),
    previewWorkplaceModule: path.resolve(__dirname, '../src/js/presentation/views/workplace/previewWorkplaceModule.js'),
    createWorkplaceModule: path.resolve(__dirname, '../src/js/presentation/views/workplace/createWorkplaceModule.js'),
  },
  output: {
    // Output configuration
    path: path.resolve(__dirname, '../../../../Timereporting.Web/wwwroot'),
    filename: 'js/[name]/[name].js',
  },
  optimization: {
    splitChunks: {
      // Enable code splitting for better caching
      chunks: 'all',
      name: (cacheGroupKey) => cacheGroupKey,
    },
  },
  plugins: [
    // Provide jQuery globally to modules
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    // Copy files from Source directory to output directory
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve('./src/assets'), to: './' },
      ],
    }),
  ],
  resolve: {
    alias: {
      // Define an alias for the Source directory
      '~': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      // Rule for processing the styling technologies
      {
        test: /\.(scss)$/, // Match files with .scss extension
        use: [
          'style-loader', // Inject CSS to page
          'css-loader', // Translates CSS into CommonJS modules
          'sass-loader' // Compiles Sass to CSS
        ],
      },      
      // Rule for processing the Bootstrap icons
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]'
        }
      },
      // Rule for processing the Bootstrap JS
      {
        test: /bootstrap\.js$/,
        use: {
          loader: 'imports-loader',
          options: {
            type: 'commonjs',
            imports: ['jquery']
          }
        }
      },
      // Rule for processing images
      {
        test: /\.(ico|jpg|jpeg|png|gif|webp|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
