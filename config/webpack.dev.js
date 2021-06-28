const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
    mode: "development",
    target: "web",
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
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
    ],
});
