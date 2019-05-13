'use strict'

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack')
const path = require('path')
require('dotenv').config()

/** @type {boolean} */
const isDev = ['dev', 'development'].includes(process.env.NODE_ENV)

/** @type {object} */
const settings = {
  mode: isDev ? 'development' : 'production',
  entry: [
    './src/main.js'
  ],
  stats: {
    children: false
  },
  output: {
    filename: 'web/[name].[hash].js',
    chunkFilename: 'web/chunks/[name].[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, process.env.WEBPACK_OUTPUT_DIR || 'dist')
  },
  devtool: isDev ? 'inline-source-map' : false,
  devServer: {
    publicPath: '/',
    contentBase: './dist',
    host: process.env.WEBPACK_HOST_DEV || 'localhost',
    hot: true,
    clientLogLevel: 'error',
    disableHostCheck: true,
    proxy: {
      '/api/*': {
        target: process.env.PROXY_TARGET || 'http://localhost/',
        changeOrigin: true
      }
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          isDev
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'web/images'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'web/files'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv,
    new VueLoaderPlugin,
    new CleanWebpackPlugin({
      dry: isDev,
      verbose: false,
      cleanOnceBeforeBuildPatterns: ['web/*', 'index.html', 'sw.js']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true,
      chunksSortMode: 'none',
      isDev: isDev
    }),
    new MiniCssExtractPlugin({
      filename: 'web/[name].[hash].css',
      chunkFilename: 'web/css/[name].[hash].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src/'),
      'scss': path.resolve(__dirname, './src/styles/')
    }
  }
}

if (!isDev) {
  settings.plugins.push(
    // Add PWA
    new GenerateSW({
      swDest: 'sw.js',
      importWorkboxFrom: 'local',
      importsDirectory: 'web/pwa',
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [
        // Output build
        /^\/web/, /sw\.js$/, /index\.html/,
        // Pages
        /^\/auth/, /^\/requests/, /^\/users/, /^\/equipments/, /^\/roles/, /^\/settings/
      ],
      runtimeCaching: [{
        urlPattern: /\.json$|api\/settings/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'settings'
        }
      }, {
        urlPattern: /storage/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'storage'
        }
      }, {
        // Disable cache images
        urlPattern: /api\/users\/images/,
        handler: 'NetworkOnly'
      }, {
        urlPattern: /api/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api'
        }
      }]
    })
    // Check bundle
    // new BundleAnalyzerPlugin
  )
}

module.exports = settings
