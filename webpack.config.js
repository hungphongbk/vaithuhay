const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const S3Plugin = require('webpack-s3-plugin');
// const MyUtils = require('hungphongbk-utils');

const src = './assets-src',
  dist = './assets',
  isProduction = process.env.NODE_ENV === 'production',
  publicPath = isProduction ? 'https://static.vaithuhay.com/' : 'https://localhost:8080/';
const extractCss = new ExtractTextPlugin({
  filename: "[name].css?[contenthash]"
});

module.exports = {
  entry: {
    vendor: ['vue', 'vuex', 'vuex-router-sync', 'vue-i18n', 'vue-lazyload', 'vue-slick', 'vue-match-media', 'slick', 'vue-responsive', 'mobile-detect', 'firebase/app', 'firebase/auth', 'firebase/messaging'],
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
            localIdentName: '[hash:base64:7]',
            importLoaders: 2,
            camelCase: 'only'
          },
          loaders: {
            scss: isProduction ? ExtractTextPlugin.extract({
              use: 'cache-loader!css-loader!sass-loader',
              fallback: 'vue-style-loader'
            }) : 'vue-style-loader!css-loader!sass-loader',
            i18n: '@kazupon/vue-i18n-loader',
            js: 'babel-loader?cacheDirectory'
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
        test: /\.js$/,
        exclude: [
          /node_modules\/(?!(js-effect-ripple|vue-match-media))/
        ],
        use: "babel-loader?cacheDirectory",

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
          }],
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
          use: [
            'cache-loader',
            {
              loader: "css-loader",
              options: {
                localIdentName: '[hash:base64:7]',
                importLoaders: 2,
                camelCase: 'only'
              }
            }, 'sass-loader'],
          fallback: "style-loader"
        }) : ['style-loader', 'css-loader', 'sass-loader']
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
      '@': path.resolve(__dirname, 'assets-src/js')
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
      PUBLIC_PATH: JSON.stringify(publicPath)
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
      test: /\.js($|\?)/i,
      cache: true,
      parallel: true,
      uglifyOptions: {
        ie8: false
      },
      extractComments: {
        banner: false,
        file: 'js.LICENSE'
      }
    }),
    // new S3Plugin({
    //   // Exclude uploading of html
    //   include: /.*\.(css|js)/,
    //   // s3Options are required
    //   s3Options: {
    //     region: 'ap-southeast-1'
    //     // signatureVersion: 'v2'
    //   },
    //   s3UploadOptions: {
    //     Bucket: 'static.vaithuhay.com',
    //     Key(filename) {
    //       return filename.split('?')[0]
    //     }
    //   }
    // }),
    // MyUtils.WebpackCloudFlareSync({
    //   zoneId: '72dad98b1fc6b0a725033f7cf5fee2b1',
    //   watchAssets: ['frontend.css', 'inline.js', 'vendor.js', 'frontend.js', 'sw.js'],
    //   manifestFile: path.resolve(__dirname, 'build/current.json'),
    //   baseCloudFlareUrl: 'https://static.vaithuhay.com/',
    //   shopifyOptions: {
    //     apiUrl: 'https://c96aab241903b825360305142e40a08a:66921be54a74fe0e36d2671d0c5fb77e@vai-thu-hay-i-something-nice.myharavan.com/',
    //     metaNamespace: 'vaithuhay',
    //     metaKey: 'assetHash',
    //     inlineAssets: ['inline.js']
    //   }
    // })
  ])
} else plugins = plugins.concat([
  new webpack.NamedModulesPlugin(),
  new webpack.SourceMapDevToolPlugin({
    filename: '[name].js.map',
    exclude: ['vendor.js']
  }),
  new webpack.DefinePlugin({
    DEBUG: 'true',
    PUBLIC_PATH: JSON.stringify(publicPath)
  })
]);
module.exports.plugins = plugins;
