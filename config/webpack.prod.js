const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
    mode: "production",
    target: "browserslist",
    devtool: false,
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
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
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
