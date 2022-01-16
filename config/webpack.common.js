const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
require("babel-polyfill");
require("dotenv").config();

module.exports = {
    entry: "./src/client/index.js",
    output: {
        path: path.resolve(__dirname, "../dist/"),
        filename: "[name].[fullhash].bundle.js",
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
            "@": path.resolve(__dirname, "../src/client"),
            "@assets": path.resolve(__dirname, "../src/client/assets"),
            path: "path-browserify",
            stream: "stream-browserify",
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.MONGO_USER": JSON.stringify(process.env.MONGO_USER),
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    globOptions: {
                        ignore: ["favicon.ico", "template.html"],
                    },
                },
            ],
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};
