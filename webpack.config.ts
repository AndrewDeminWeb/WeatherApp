import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

const prodcution: boolean = process.env.NODE_ENV === "production";

const config: webpack.Configuration & DevServerConfiguration = {
	entry: path.resolve(__dirname, "./src/index.tsx"),
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: prodcution ? "js/[name].[contenthash].js" : "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(js|ts|tsx)$/,
				exclude: /node_modules/,
				use: ["ts-loader"]
			},
			{
				test: /\.s(c|a)ss$/,
				exclude: /node_modules/,
				use: [
					prodcution ? MiniCssExtractPlugin.loader : "style-loader",
					{
						loader: "css-loader",
						options: {
							modules: {
								auto: (resPath: string) =>
									Boolean(resPath.includes(".module.")),
								localIdentName: !prodcution
									? "[path][name]__[local]--[hash:base64:5]"
									: "[hash:base64:8]"
							},
							sourceMap: !prodcution
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: !prodcution
						}
					}
				]
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: "asset/inline"
			}
		]
	},
	resolve: {
		extensions: [".*", ".js", ".jsx", ".ts", ".tsx", ".scss"],
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@comps": path.resolve(__dirname, "src/components")
		}
	},
	plugins: [
		prodcution && new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			minify: {
				collapseWhitespace: prodcution
			}
		}),
		new MiniCssExtractPlugin({
			filename: prodcution ? "css/[name].[contenthash].css" : "[name].css"
		})
	],
	optimization: {
		splitChunks: {
			chunks: "all"
		}
	},
	devServer: {
		port: 3001,
		hot: !prodcution
	},
	devtool: prodcution ? false : "source-map",
	mode: prodcution ? "production" : "development"
};

export default config;
