const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const dotenv = require("dotenv").config({
    path: path.join(__dirname, ".env.production"),
});

const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
    mode: "production",
    target: "browserslist",
    devtool: false,
    module: {
        rules: [
            // Styles
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    "vue-style-loader",
                    MiniCssExtractPlugin.loader,
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].[contenthash].css",
            chunkFilename: "styles/[name].[id].[contenthash].css",
            ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            template: "./public/template.html",
            favicon: "./public/favicon.ico",
            hash: true,
        }),
        new webpack.SourceMapDevToolPlugin({
            exclude: ["/node_modules/"],
        }),
        new webpack.DefinePlugin({
            "process.env": dotenv.parsed,
        }),
    ],
    performance: {
        hints: "warning",
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin(), "..."],
        runtimeChunk: "multiple",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](vue|vuex|axios)[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
});
