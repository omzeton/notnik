const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
require("babel-polyfill");

module.exports = {
    entry: ["babel-polyfill", "./src/client/index.js"],
    output: {
        path: path.resolve(__dirname, "/dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(woff(2)?|eot|.md|ttf|ico|gif|png|jpg|jpeg|webp|svg|otf)$/i,
                type: "asset",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".vue", ".md"],
        alias: {
            "@": path.resolve(__dirname, "../src/client"),
            "@assets": path.resolve(__dirname, "../src/client/assets"),
            path: "path-browserify",
            stream: "stream-browserify",
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    globOptions: {
                        ignore: ["*.DS_Store", "favicon.ico", "template.html"],
                    },
                },
            ],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new VueLoaderPlugin(),
    ],
};
