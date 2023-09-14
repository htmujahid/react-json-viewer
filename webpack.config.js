const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let entry = "./src/index.ts";
let output = {
  path: path.resolve(__dirname, "dist"),
  publicPath: "/dist",
};

if (process.env.NODE_ENV === "development") {
  entry = "./example/index.tsx";
  output = {
    path: path.resolve(__dirname, "example"),
    publicPath: "/example",
  };
}

module.exports = {
  entry,
  output: {
    ...output,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3000,
  },
};
