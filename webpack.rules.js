module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: "node-loader",
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      "style-loader",
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      {
        loader: "sass-loader",
        options: {
          additionalData: `@import "~@/styles/variables.scss";`,
        },
      },
    ],
  },
  {
    test: /\.(jpg|png|ico|icns)$/,
    loader: "file-loader",
    options: {
      name: "[path][name].[ext]",
      publicPath: "../.", // move up from 'main_window'
      context: "src", // set relative working folder to src
    },
  },
  // SVG 处理器 能够将 SVG 文件转化成 React 能够识别的组件
  {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  },
];
