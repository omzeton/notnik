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
                            additionalData: `
                                $bla1: #222220;
                                $bla2: #353531;
                                $bla3: #2c2c2a;
                                $bla4: #464643;
                                $err: #ec4e20;
                                $rd: #2176AE;
                                $g: #3fc577;
                                $blu: #00a6ed;
                                $or: #ff9505;
                                $or2: #ffb627;
                                $w: #f9f9f9;
                                $w2: #b2b2b2;
                            `,
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: "../src",
        proxy: {
            "/api": "http://localhost:2828",
        },
        hot: true,
        port: 8080,
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
