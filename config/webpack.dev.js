const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, ".env.development"),
});

const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
    mode: "development",
    target: "web",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            additionalData: '@import "@/styles/_variables.scss";',
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": "http://localhost:2828",
        },
        hot: true,
        port: 1234,
    },
    optimization: {
        runtimeChunk: "single",
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            favicon: "./public/favicon.ico",
        }),
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed,
        }),
    ],
});
