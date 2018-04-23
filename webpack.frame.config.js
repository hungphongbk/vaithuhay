const merge = require('webpack-merge'),
  webpack = require('webpack'),
  base = require('./build/base.config'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  HtmlInlineWebpackPlugin = require('html-webpack-inline-source-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
const MyUtils = require('hungphongbk-utils');

const src = path.resolve(__dirname, 'assets-src');

const generateHtml = [
  {entry: 'sw.embed', html: 'sw.embed.html'},
  {entry: 'sw.iframe', html: 'sw.html'}
].map(i => new HtmlWebpackPlugin({
  filename: i.html,
  template: path.resolve(src, 'js/modules/iframe/' + i.html),
  chunks: ['sw.common', i.entry],
  inlineSource: (i.entry + '.js').replace(/\./g, '\\\.')
}))

module.exports = merge(base, {
  entry: {
    'sw': src + '/js/modules/local-sw.js',
  },
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? 'https://vaithuhay.com/' : '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "service-worker-loader",
          }
        ]
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      DEBUG: 'false'
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
    MyUtils.SftpSync({
      localPath: path.resolve(__dirname, 'assets/'),
      remotePath: '/home/phong/api.v1/vaithuhay/',
      additional: ['sw.html', 'sw.embed.html', 'local-sw.js', 'local-sw-analytics.js']
    })
  ] : []
})
