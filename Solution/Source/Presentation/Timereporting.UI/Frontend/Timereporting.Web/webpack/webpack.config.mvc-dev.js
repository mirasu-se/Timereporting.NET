const Webpack = require('webpack');
const Path = require('path');
const { merge } = require('webpack-merge'); 
const common = require('./webpack.common-mvc.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    mode: 'development', // Set the mode to development
    devtool: "source-map", // Generate source maps for better debugging
    output: {
        chunkFilename: 'js/[name]/[name].js', // Define chunk filenames
    },
    watch: true, // Enable watch mode
    watchOptions: {
        aggregateTimeout: 300, // Delay before triggering a recompilation
        poll: 1000, // Check for file changes every second
        ignored: /node_modules/, // Ignore changes in the node_modules directory
    },
    externals: {
        jquery: 'jQuery' // Specify external dependencies
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // Define environment variables
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]/[name].css', // Extract CSS into separate files
        }),
        new BundleAnalyzerPlugin(), // Analyze bundle sizes
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/, // Apply rules to JavaScript files
                include: Path.resolve(__dirname, '../src'), // Specify source directory
                enforce: 'pre', // Apply this rule before others
                loader: 'eslint-loader', // Use ESLint for linting
                options: {
                    emitWarning: true, // Emit warnings instead of errors for linting issues
                }
            },
            {
                test: /\.(js)$/, // Apply rules to JavaScript files
                include: Path.resolve(__dirname, '../src'), // Specify source directory
                loader: 'babel-loader' // Use Babel for transpilation
            },
            {
                test: /\.s?css$/i, // Apply rules to SCSS and CSS files
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] // Use loaders for CSS processing
            }
        ]
    }
});