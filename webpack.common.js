const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const VENDORS = ['react'];

module.exports = {
  entry: {
    index: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
    vendor: VENDORS
  },
  // entry: ['babel-polyfill', path.join(__dirname, 'src/index.js')],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set true is you want JS source map
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          minChunks: 2
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        // default: false
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.less', '.scss', '.sass', '.jsx']
  }
};
