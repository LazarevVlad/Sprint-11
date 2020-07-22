const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const styleLoader = isDev ? "style-loader" : MiniCssExtractPlugin.loader;

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          styleLoader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          "file-loader?name=./images/[name].[ext]",
          {
            loader: "image-webpack-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./vendor/fonts/",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "index.html",
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default"],
      },
      canPrint: true,
    }),
  ],
};
