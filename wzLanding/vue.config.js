const webpack = require('webpack');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : './';
const isProduction = process.env.NODE_ENV === 'production' ? true : false;
const targetUrl = 'http://test.520daikuan.com'
module.exports = {
	devServer: {
		port: 8081, // 端口
		open: true,
		proxy: targetUrl

	},
	//配置全局css
	css: {
		loaderOptions: {
			sass: {
				data: `@import "@/assets/style/app.scss";`
			}
		}
	},
	configureWebpack: {
		externals: {
			'vue': 'Vue',
			// 'vue-router': 'VueRouter',
		},
		plugins: [
			new webpack.DefinePlugin({
				TEST_HOST: JSON.stringify(targetUrl),
			}),
			new webpack.ProvidePlugin({
				// $:"jquery",
				// "windows.jQuery":"jquery"
			}),
			//new BundleAnalyzerPlugin()
		],
	},
	publicPath: BASE_URL,
	// 输出文件目录
	outputDir: process.env.outputDir,
	productionSourceMap: false,
	chainWebpack: config => {
		/** 如果是正式环境 */
		if (isProduction) {
			/** 删除懒加载模块的 prefetch preload，降低带宽压力(使用在移动端) */
			config.plugins.delete("prefetch").delete("preload");
			/** 去掉console.log debugger sourceMap*/
			config.optimization.minimizer([
				new UglifyJsWebpackPlugin({
					/**这个 sourceMap注释掉，默认就是置为false.(写为false 也是可以的)。
					 * 反之设为true 是生效的。
					 * 故在官方的配置(productionSourceMap: false)就可以注释掉了*/
					sourceMap: false,
					uglifyOptions: {
						warnings: false,
						compress: {
							drop_console: false,
							drop_debugger: true
						},

					}
			})
		]);
	}
	},
}