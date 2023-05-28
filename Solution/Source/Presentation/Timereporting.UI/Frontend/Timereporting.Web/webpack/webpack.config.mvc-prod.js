const Webpack = require('webpack');
const { merge } = require('webpack-merge')  
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common-mvc.js');

module.exports = merge(common, {
    mode: 'production', // Set the mode to production
    devtool: 'source-map', // Generate source maps for better debugging
    stats: 'errors-only', // Show only error messages in the console output
    bail: true, // Stop compilation on the first error
    output: {
        filename: 'js/[name]/[name].min.js', // Define the output filename for bundled JavaScript
        chunkFilename: 'js/[name]/[name].min.js', // Define chunk filenames
    },
    externals: {
        jquery: 'jQuery' // Specify external dependencies
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'), // Define environment variables
        }),
        new Webpack.optimize.ModuleConcatenationPlugin(), // Enable module concatenation for better performance
        new MiniCssExtractPlugin({
            filename: 'css/[name]/[name].min.css', // Extract CSS into separate files
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/, // Apply rules to JavaScript files
                exclude: /node_modules/, // Exclude the node_modules directory
                use: 'babel-loader', // Use Babel for transpilation
            },
            {
                test: /\.s?css/i, // Apply rules to SCSS and CSS files
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'], // Use loaders for CSS processing
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
});
