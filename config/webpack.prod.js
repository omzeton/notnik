const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
    mode: "production",
    target: "browserslist",
    devtool: false,
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: "./public/favicon.ico",
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
    devServer: {
        historyApiFallback: true,
    },
});
