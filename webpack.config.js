const path = require("path");
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, "./client/src"),
  output: {
    path: path.resolve(__dirname, "./client/dist"),
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js[x]?/,
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env","@babel/preset-react"]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: '#eval-source-map'
};
