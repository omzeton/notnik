const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
    mode: "development",
    target: "web",
    devtool: "eval-source-map",
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": `http://localhost:${process.env.PORT}`,
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
    ],
});
