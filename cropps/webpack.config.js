const path = require("path");

module.exports = {
  entry: "./src/index.js",
  experiments: {
    outputModule: true,
  },
  output: {
    
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    library: {
      // name: 'ReactTest',
      type: "module",
    },
    globalObject: 'this',
  },
  module: {
    // exclude node_modules
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ],
  },
  // pass all js files through Babel
  resolve: {
    extensions: ["*", ".js", ".tsx"],
  },
  plugins: [

  ],
};