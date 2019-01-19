const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  regexCombiner = require('regex-combiner'),
  _ = require('hungphongbk-webpack-build-utils');

//ok

global.getLocalIdent = _.getLocalIdent;

const src = './assets-src',
  dist = './assets-dist',
  isProduction = process.env.NODE_ENV === 'production',
  publicPath = isProduction ? 'https://static.vaithuhay.com/' : 'https://localhost:8080/',
  localIdentName = '[hash:base64:6]',
  nameCache = {};
const extractCss = new ExtractTextPlugin({
  filename: "[name].css?[contenthash]"
});

module.exports = {
  entry: {
    vendor: ['vue', 'vuex', 'vue-i18n', 'vue-lazyload', 'vue-slick', 'vue-match-media', 'slick', 'vue-responsive', 'mobile-detect'],
    frontend: src + '/js/frontend.js'
  },
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
            localIdentName: localIdentName,
            importLoaders: 2,
            camelCase: 'only'
          },
          loaders: {
            scss: isProduction ? ExtractTextPlugin.extract({
              use: _.cssLoaders(['postcss-loader', 'sass-loader'], {
                clean: true
              }),
              fallback: 'vue-style-loader'
            }) : 'vue-style-loader!css-loader!sass-loader',
            i18n: '@kazupon/vue-i18n-loader',
            js: 'babel-loader?cacheDirectory',
            ts: 'babel-loader?cacheDirectory!ts-loader'
          }
        }
      },
      {
        test: /sw\.js$/,
        loader: "service-worker-loader",
        options: {
          publicPath: 'https://vaithuhay.com/'
        }
      },
      {
        test: /\.js($|\?)/,
        exclude: [
          /node_modules\/(?!(js-effect-ripple|vue-match-media))/
        ],
        use: "babel-loader?cacheDirectory",

      },
      {
        test: /\.tsx?($|\?)/,
        use: [
          "babel-loader?cacheDirectory",
          {
            loader: "ts-loader",
            options: {appendTsSuffixTo: [/\.vue$/]}
          }
        ],
        exclude: [
          /node_modules\/(?!(js-effect-ripple|vue-match-media))/
        ]
      },
      {
        test: /\.css($|\?)/,
        use: isProduction ? extractCss.extract({
          use: _.cssLoaders(['postcss-loader'], {
            clean: true
          }),
          // use style-loader in development
          fallback: "style-loader"
        }) : [
          {loader: 'style-loader'},
          {loader: 'css-loader'}
        ]
      },
      {
        test: /\.s[ac]ss($|\?)/,
        use: isProduction ? extractCss.extract({
          use: _.cssLoaders(['postcss-loader', 'sass-loader'], {
            clean: true
          }),
          fallback: "style-loader"
        }) : ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.m-s[ac]ss($|\?)/,
        use: isProduction ? extractCss.extract({
          use: _.cssLoaders(['postcss-loader', 'sass-loader'], {
            clean: true,
            modules: true
          }),
          fallback: "style-loader"
        }) : ['style-loader', {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: localIdentName,
            importLoaders: 2,
            camelCase: 'only'
          }
        }, 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)($|\?)/,
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
        test: /\.(eot|ttf|woff|woff2)($|\?)/,
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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    alias: {
      // 'vue$': 'vue/dist/vue.runtime.esm.js'
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'assets-src/js'),
      'js': path.resolve(__dirname, 'assets-src/js'),
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
      'Access-Control-Allow-Origin': '*'
    },
    publicPath: 'https://localhost:8080/'
  }
};

const chunks = ['iframe', 'inline', 'vendor'];
let plugins = [
  extractCss,
  new webpack.IgnorePlugin(/(locale)/, /node_modules.+(moment)/)
  // new workboxPlugin({
  //   globDirectory: dist,
  //   globPatterns: ['**/*.{css,js}'],
  //   globIgnores: ['sw*', 'workbox-*', 'iframe*', 'inline*', '*localhost*'],
  //   swDest: './assets/sw.js',
  //   swSrc: './assets-src/js/sw.js'
  // })
];
if (process.env.NODE_ENV === 'production') {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  // module.exports.devtool = 'source-map';
  plugins = plugins.concat([
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      DEBUG: 'false',
      PUBLIC_PATH: JSON.stringify(publicPath),
      SERVER_URL: '"https://server.vaithuhay.com/b/"',
      FIREBASE_API_KEY: '"AIzaSyDu888R1nyP_W_xFX7aATSB0U5irf79lrM"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "inline",
      minChunks: Infinity,
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      test: /\.js($|\?)/i,
      cache: true,
      parallel: false,
      uglifyOptions: {
        ie8: false,
        mangle: {
          properties: {
            regex: regexCombiner([
              // /^([A-Z]+_)([A-Z]+_?)+$/,
              /^\$(style|createElement)$/
              // /^__data__$/,
              // /^__?i18n$/,
              // /^(locals)$/,
              // /^_(day|shortWeek|shortMonth|longMonth|min|milli)[A-Za-z]*$/
            ])
          }
        },
        nameCache: nameCache
      },
      extractComments: {
        banner: false,
        file: 'js.LICENSE'
      }
    }),
    require('./build/completed.js').default(['inline.js','vendor.js','frontend.js'])
  ]);
} else {
  module.exports.devtool = 'eval-source-map';
  plugins = plugins.concat([
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    }),
    new webpack.DefinePlugin({
      DEBUG: 'true',
      PUBLIC_PATH: JSON.stringify(publicPath),
      SERVER_URL: '"https://localhost:8089/"',
      FIREBASE_API_KEY: '"AIzaSyCUs1xIIz3keb9CAcdG8Aj0CRQuLNUHrtM"'
    })
  ]);
}
module.exports.plugins = plugins;
// okay
