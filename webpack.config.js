const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');

const extractSass = new ExtractTextPlugin("style.css");
const extractHtml = new ExtractTextPlugin("index.html");

module.exports = {
    entry: './src/index.tsx',
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
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {  }
            },
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
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
            }
        ]
    },
    plugins: [
        extractSass, extractHtml,
        new WebpackShellPlugin({
            onBuildStart: [ 
                'echo "Webpack Start"' 
            ], 
            onBuildEnd: [ 
                'echo "Webpack End"' 
            ]
        })
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};