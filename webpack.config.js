'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack')
const path = require('path')
require('dotenv').config()

/** @type {boolean} */
const isDev = ['dev', 'development'].includes(process.env.NODE_ENV)

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: [
		'./src/main.js'
	],
	output: {
		filename: '[name].[hash].js',
		chunkFilename: '[name].[hash].js',
		publicPath: '/',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: isDev ? 'inline-source-map' : false,
	devServer: {
		publicPath: '/',
		contentBase: './dist',
		host: process.env.WEBPACK_HOST || 'localhost',
		hot: true,
		clientLogLevel: 'error',
		disableHostCheck: true,
		proxy: {
			'**': {
				target: process.env.SERVER_DEV || 'http://localhost/',
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
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					'file-loader'
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
			verbose: true
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			inject: true,
			chunksSortMode: 'none'
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
