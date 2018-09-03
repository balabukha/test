const path = require('path');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const WebpackNotifier = require('webpack-notifier');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// to insert some logic to HTML template
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  cache: true, // for rebuilding faster
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ['url-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
            cacheDirectory: true,
            plugins: [
              'react-hot-loader/babel',
              'react-html-attrs',
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      },
      {
        test: /\.mp4/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimtetype: 'video/mp4'
          }
        }
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              name: 'image/[name]-[hash:8].[ext]',
              limit: 10 * 1024 // Images larger than 10 KB won’t be inlined
            }
          }
        ]
      }
    ]
  },
  devtool: '',
  watch: true,
  devServer: {
    // https: true,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': '*'
    // },
    // historyApiFallback: true,
    contentBase: 'dist',
    port: 3030,
    hot: true,
    open: true,
    watchOptions: {
      ignored: /node_modules/
    },
    compress: true
    // proxy: { '*': 'http://localhost:3001/' }
  },
  plugins: [
    new StyleLintPlugin({ configFile: './.stylelintrc' }),
    new BundleAnalyzerPlugin(),
    new WebpackNotifier(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public/index.html'),
      favicon: path.join(__dirname, 'public/favicon.png'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true, // new
        keepClosingSlash: true, // new
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new InterpolateHtmlPlugin({
      public_url: path.join(__dirname, 'src', 'assets', 'favicons', 'favicon-32x32.png')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
});
