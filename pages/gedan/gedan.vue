<template>
	<view class="container">
		<view class="bkg">
			<view class="bg-image">
				<image class="bg" :src="albs.coverImgUrl" mode="widthFix" />
			</view>
			<view class="touxiang">
				<image class="tx" :src="albs.coverImgUrl" mode="widthFix" />
			</view>
			<text class="title">
				{{albs.name}}
			</text>
			<view class="jjs">
				<text class="js">
					{{albs.description}}
				</text>
			</view>
		</view>
		<view>
			<view class="zika" v-if="num===0" @click="top" v-on:click="laclick1">
				<view class="iconfont icon-liebiaoxunhuan">
					列表循环
				</view>
			</view>
			<view class="zika" v-else-if="num===1" @click="top" v-on:click="laclick2">
					<view class="iconfont icon-danquxunhuan ">
					单曲循环
				</view>
			</view>
			<view class="zika" v-else @click="top" v-on:click="laclick3">
				<view class="iconfont icon-suijibofang">
					随机播放
				</view>
			</view>
		</view>
		<view class="body">
			<uni-list v-for="(item,index) in songs" :index="index" :key="item.id">
				<uni-list-item :title="item.name" :note="item.ar[0].name" clickable @click="dianji(item.id)">
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		tjURLH5,
		tjURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				id: null,
				albs: [],
				songs: [],
				liebiao: [],
				value: 1,
				num: 0,
				list_value: ['key1', 'key2']
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getListData();
			console.log(this.value)
		},
		methods: {
			async getListData() {
				const result = await requestGet(tjURLH5, {
					id:this.id
				});
				this.songs = result.playlist.tracks;
				this.albs = result.playlist;
				console.log(this.songs, this.albs);
				var songss = [];
				var songss1 = {
					id: "",
					title: "",
					name: ""
				};
				for (let i = 0; i < this.songs.length; i++) {
					songss1 = {
						id: this.songs[i].id,
						title: this.songs[i].name,
						name: this.songs[i].ar[0].name
					}
					songss[i] = songss1

				}
				this.liebiao = JSON.stringify(songss)

				console.log(songss, this.value)
			},
			laclick1(e) {
				this.value = 2;
				console.log(this.value)
			},
			laclick2(e) {
				this.value = 3;
				console.log(this.value)
			},
			laclick3(e) {
				this.value = 1;
				console.log(this.value)
			},
			dianji(id1) {
				this.songid = id1;
				console.log(this.songid);
				// ?id="+e.currentTarget.dataset.id+"&liebiao="+this.liebiao+this.value""
				uni.navigateTo({
					url: "/pages/control/control?id=" + this.songid + "&liebiao=" + this.liebiao + "&i = " + this
						.value + ""
				})
			},
			top() {
				if (this.num < 2) {
					this.num = this.num + 1
				} else {
					this.num = 0
				}

			},
		}
	}
</script>
<style lang="less">
	.container {
		width: 100%;
		height: 100%;

		.bkg {
			position: relative;
			width: 100%;
			height: 400rpx;
			border-bottom: 1px solid gray;
			margin-bottom: 15rpx;
			background: rgba(37, 37, 37, 0.8);

			.bg-image {
				position: absolute;
				width: 100%;
				height: 400rpx;
				-webkit-transform-origin: top;
				transform-origin: top;
				background-size: cover;
				overflow: hidden;
				z-index: -1;

				.bg {
					width: 100%;
					height: 400rpx;
					-webkit-transform-origin: top;
					transform-origin: top;
					background-size: cover;

				}

			}

			.touxiang {
				position: absolute;
				width: 250rpx;
				height: 200rpx;

				left: 60rpx;
				top: 60rpx;

				.tx {

					width: 225rpx;
					height: 225rpx;

				}
			}

			.title {
				color: white;
				position: absolute;
				font-size: 20px;
				left: 340rpx;
				top: 50rpx;
			}

			.jjs {
				color: white;
				position: absolute;
				left: 340rpx;
				top: 240rpx;
				width: 350rpx;

				.js {
					color: white;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 4;
					-webkit-box-orient: vertical;
					align-content: center;
					font-size: 15px;

				}
			}

		}

		.uni-column {
			height: 50rpx;
		}

		.hh {

			margin-left: 50rpx;
		}

		.zika {
			text-align: center;
			font-size: 50rpx;
			height: 70rpx;
			width: 100%;
		}

	@font-face {
	  font-family: "iconfont"; /* Project id 2967759 */
	  src: url('//at.alicdn.com/t/font_2967759_znlu2l9rtsl.woff2?t=1637911734218') format('woff2'),
	       url('//at.alicdn.com/t/font_2967759_znlu2l9rtsl.woff?t=1637911734218') format('woff'),
	       url('//at.alicdn.com/t/font_2967759_znlu2l9rtsl.ttf?t=1637911734218') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 50rpx;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-danquxunhuan:before {
	  content: "\e6a3";
	}
	
	.icon-suijibofang:before {
	  content: "\e622";
	}
	
	.icon-liebiaoxunhuan:before {
	  content: "\e6a2";
	}

	}
</style>
