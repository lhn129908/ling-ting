import {
 	defineConfig
 } from 'vite'
 import uni from '@dcloudio/vite-plugin-uni'
 // https://vitejs.dev/config/
 export default defineConfig({
 	// base: 'https://static-xxxx.bspapp.com/', // uniCloud 前端网页托管资源地址（主要是应用编译后的js，图片等静态资源，可以配置为二级目录）
 	plugins: [
 		uni(),
 	],
	//devServer
 	server: {
 		host: 'localhost',
 		port: 4000,
 		open: true,
 		https: false,
 		// proxy: {
 		// 	"/mv": {
 		// 		"target": "http://101.35.3.52",
 		// 		"changeOrigin": true,
 		// 		"secure": false
 		// 	}
 		// }
 	},
 })
