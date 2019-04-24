'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack')
const path = require('path')
require('dotenv').config()

module.exports = {
	mode: ['dev', 'development'].includes(process.env.NODE_ENV) ? 'development' : 'production',
	entry: [
		'./src/main.js'
	],
	output: {
		filename: 'main.js',
		publicPath: '/',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		publicPath: '/',
		contentBase: './dist',
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
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
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
