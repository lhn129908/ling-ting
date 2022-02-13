<template>
	<view class="container">
		<view class="bkg">
			<view class="bg-image">
				<image class="bg" :src="albs.picUrl" mode="widthFix" />
			</view>
			<view class="touxiang">
				<image class="tx" :src="albs.picUrl" mode="widthFix" />
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
		<view class="uni-form-item uni-column">

			<radio-group name="radio">
				<label class="hh">
					<radio value="radio1" checked="true" v-on:click="laclick1"/><text v-on:click="laclick1">列表循环</text>
				</label>
				<label class="hh">
					<radio value="radio2"  v-on:click="laclick2"/><text v-on:click="laclick2">随机播放</text>
				</label>
				<label class="hh">
					<radio value="radio3"  v-on:click="laclick3"/><text v-on:click="laclick3">单曲循环</text>
				</label>
			</radio-group>
		</view>

		<view class="body">
			<uni-list v-for="(item,index) in songs" :index="index" :key="item.id">
				<uni-list-item :title="item.name" :note="item.ar[0].name"></uni-list-item>
			</uni-list>

		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		ListsURLH5
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				id: null,
				albs: [],
				songs: [],
				liebiao: [],
				value:1
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getListData();
			console.log(this.value)
		},
		methods: {
			async getListData() {
				const result = await requestGet(ListsURLH5, {
					id: this.id
				});
				this.songs = result.songs;
				this.albs = result.album;
				console.log(this.songs, this.albs);
				var songss = [];
				var songss1 = {
					id: "",
					name: "",
					zuoze: ""
				};
				for (let i = 0; i < this.songs.length; i++) {
					songss1 = {
						id: this.songs[i].id,
						name: this.songs[i].name,
						zuoze: this.songs[i].ar[0].name
					}
					songss[i] = songss1
				
				}
				this.liebiao = JSON.stringify(songss)
							
				console.log(songss)
			},
			laclick1(e){
				this.value=1;
				console.log(this.value)
			},
			laclick2(e){
				this.value=2;
				console.log(this.value)
			},
			laclick3(e){
				this.value=3;
				console.log(this.value)
			},
			dianji(e) {
				getApp().globalData.songid=id1;
				getApp().globalData.liebiao=this.liebiao;
				getApp().globalData.value=this.value;
				console.log(e);
				  uni.switchTab({
				            url:"/pages/control/control"
				        })
			}
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



	}
</style>
