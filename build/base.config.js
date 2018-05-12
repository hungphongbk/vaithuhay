const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const src = '../assets-src',
  dist = '../assets',
  isProduction = process.env.NODE_ENV === 'production',
  publicPath = isProduction ? 'https://server.vaithuhay.com/' : 'https://localhost:8080/';
const extractCss = new ExtractTextPlugin({
  filename: "[name].css?[contenthash]"
});

module.exports = {
  output: {
    path: path.resolve(__dirname, dist),
    publicPath: publicPath,
    filename: '[name].js' + (isProduction ? '?[chunkhash]' : ''),
    chunkFilename: '[name].bundle.js?[chunkhash]',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssModules: {
            localIdentName: '[hash:base64:7]',
            importLoaders: 2,
            camelCase: 'only'
          },
          loaders: {
            scss: isProduction ? extractCss.extract({
              use: [
                'css-loader',
                'group-css-media-queries-loader',
                'sass-loader',
              ],
              fallback: 'vue-style-loader'
            }) : 'vue-style-loader!css-loader!sass-loader',
            i18n: '@kazupon/vue-i18n-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules\/(?!(js-effect-ripple|vue-match-media))/
        ],
        use: [
          "babel-loader?cacheDirectory"
        ],

      },
      {
        test: /\.css$/,
        use: isProduction ? extractCss.extract({
          use: [{
            loader: "css-loader",
            options: {
              localIdentName: '[hash:base64:7]',
              importLoaders: 2,
              camelCase: 'only'
            }
          }, 'group-css-media-queries-loader'],
          // use style-loader in development
          fallback: "style-loader"
        }) : [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: isProduction ? extractCss.extract({
          use: [{
            loader: "css-loader",
            options: {
              localIdentName: '[hash:base64:7]',
              importLoaders: 2,
              camelCase: 'only'
            }
          }, 'group-css-media-queries-loader', 'sass-loader'],
          fallback: "style-loader"
        }) : [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'}
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          ...(isProduction ? ['cache-loader'] : []),
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[sha512:hash:base64:8].[ext]'
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: isProduction,
              svgo: {
                plugins: [
                  {removeTitle: true},
                  {convertPathData: false},
                  {convertShapeToPath: false}
                ]
              },
              pngquant: {
                speed: 2,
                quality: 80
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[sha512:hash:base64:8].[ext]'
        }
      },
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.vue'],
    alias: {
      // 'vue$': 'vue/dist/vue.runtime.esm.js'
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../assets-src/js')
      // 'jquery$': 'jquery/dist/jquery.js'
    }
  },
  performance: {
    hints: false
  },
  devServer: {
    contentBase: path.join(__dirname, "assets"),
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Link: '<https://server.vaithuhay.com/sw.js>; rel="serviceworker"'
    },
    publicPath: 'https://localhost:8080/'
  }
};

let plugins = [
  extractCss,
  new webpack.IgnorePlugin(/(locale)/, /node_modules.+(moment)/)
];
module.exports.plugins = plugins;
