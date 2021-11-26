<template>
	<view class="container">
		<view class="player">
			<video class="videoplayer" :src="mds[240]">
			</video>
			<view class="js">
				<view class="name">
					{{mvs.name}}
				</view>
				<view class="artistName">{{mvs.artistName}}</view>
				<view class="playcount">播放量：{{mvs.playCount}}</view>
				<view class="publishTime">发布时间:{{mvs.publishTime}}</view>
			</view>
		</view>
		<view class="tj">
			<view class="title">
				相似MV推荐
			</view>
			<view class="img" v-for="(item,index) in simimvs" :index="index" :key="item.id">
				<navigator :url="'/pages/video/video?mvid='+item.id">
					<image class="image" :src="item.cover" mode="widthFix" />
				</navigator>
				<view class="name">
					{{item.name}}
				</view>
				<view class="artistName">{{item.artistName}}</view>
				<view class="playcount2">播放量：{{item.playCount}}</view>
			</view>


		</view> 

	</view>
</template>

<script>
	import {
		requestGet,
		mvURLH5,
		simiURLH5
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				mvid: null,
				mvs: [],
				mds: [],
				simimvs: []
			}
		},
		onLoad(options) {
			this.mvid = options.mvid;
			this.getListData();
			console.log(this.mvs.playCount)

		},
		methods: {
			async getListData() {
				const result = await requestGet(mvURLH5, {
					mvid: this.mvid
				});
				const simi = await requestGet(simiURLH5, {
					mvid: this.mvid
				});
				this.mvs = result.data;
				this.mds = result.data.brs;
				this.simimvs = simi.mvs;
			}
		}
	}
</script>

<style lang="less">
	.container {

		.player {
			color: ghostwhite;
			position: relative;
			border-bottom: 1px solid gray;

			.videoplayer {
				width: 750rpx;
			}

			.js {
				background-color: #f87373;
				margin-top: -4px;
				height: 130rpx;

				.name {
					font-size: 20px;

					margin-left: 30rpx;
				}

				.artistName {
					position: absolute;
					font-size: 15px;
					bottom: 10rpx;
					left: 30rpx;
				}

				.publishTime {
					margin-top: 10rpx;
					position: absolute;
					right: 10px;
					bottom: 10rpx;
					font-size: 13px;
				}

				.playcount {
					font-size: 12px;
					position: absolute;
					bottom: 50rpx;
					right: 10px;
				}
			}
		}

		.tj {
			margin-top: 20rpx;

			.title {
				font-size: 40rpx;
				border-bottom: 1px solid ghostwhite;
				margin-bottom: 10rpx;
				margin-left: 20rpx;
			}

			.img {
				color: ghostwhite;
				position: relative;
				margin: 20rpx;
				border: 1px solid gray;
				padding: 10rpx;
				border-radius: 20rpx;
				background-color: #f87373;

				.image {
					width: 690rpx;
					border-radius: 20rpx;

				}

				.name {
					font-size: 20px;
					margin-left: 30rpx;
				}

				.artistName {
					font-size: 15px;
					margin-top: 10rpx;
					margin-left: 30rpx;
				}

				.playcount2 {
					font-size: 12px;
					position: absolute;
					right: 50rpx;
					bottom: 10rpx;
					
				}
			}
		}
	}
</style>
