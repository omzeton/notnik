const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
require("babel-polyfill");
require("dotenv").config();

module.exports = {
    entry: "./src/client/index.ts",
    output: {
        path: path.resolve(__dirname, "../dist/"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(woff(2)?|eot|.md|ttf|ico|gif|png|jpg|jpeg|webp|svg|otf)$/i,
                type: "asset",
            },
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
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
            {
                test: /\.(s[ac]|c)ss$/i,
                use: ["vue-style-loader", "css-loader", "postcss-loader", "sass-loader"],
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".ts", ".vue"],
        alias: {
            path: "path-browserify",
            stream: "stream-browserify",
            "@": path.resolve(__dirname, "../src/client"),
            "@components": path.resolve(__dirname, "../src/client/components"),
            "@assets": path.resolve(__dirname, "../src/client/assets"),
            "@server": path.resolve(__dirname, "../src/server"),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
    devServer: {
        stats: "minimal",
    },
};
