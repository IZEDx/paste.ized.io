const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin("style.css");
const extractHtml = new ExtractTextPlugin("index.html");

module.exports = {
    entry: './src/main.ts',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'paste.js',
        publicPath: '/dist/'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.sass', '.pug']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {  }
            }
        ],
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.sass$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "resolve-url-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.html$/,
                use: extractHtml.extract("html-loader")
            },
            {
                test: /\.js$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        extractSass, extractHtml
    ],
    externals: {
        'fs': true,
        'path': true
    }
};