const config = require("../config");
const path = require("path");
const normalizePath = require("normalize-path");
const glob = require("glob");
const TerserPlugin = require("terser-webpack-plugin");

const entryList = function () {
  return glob
    .sync(config.scripts.src, {
      ignore: config.scripts.ignore,
    })
    .reduce((entries, item) => {
      const parts = path.parse(path.relative(config.scripts.base, item));
      const key = normalizePath(path.join(parts.dir, parts.name));
      entries[key] = ["./" + item];
      return entries;
    }, {});
};

//export
module.exports = {
  mode: "production",
  entry: entryList,
  output: {
    path: path.resolve(config.scripts.dest),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, //ライセンスをJS内に格納
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  cache: true,
};
