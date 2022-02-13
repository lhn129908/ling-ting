<template>
	<view>
		<view class="title">❀❀❀❀&nbsp;&nbsp;&nbsp;地区&nbsp;&nbsp;&nbsp;❀❀❀❀</view>
		<!-- 地区选项卡 -->
		<view class="tab-select">
			<view class="tab-item" v-for="(item,index) in option1" @click="active(index,item.text)"
				:class="{active:index==num}">
				{{item.text}}
			</view>
		</view>
		<view class="title">❀❀❀&nbsp;&nbsp;&nbsp;来源&nbsp;&nbsp;&nbsp;❀❀❀</view>
		<!-- 版本选项卡 -->
		<view class="tab-select">
			<view class="tab-item" v-for="(item,index) in option2" @click="active1(index,item.text)"
				:class="{active:index==num1}">
				{{item.text}}
			</view>
		</view>
		<view class="mv">
			<view class="mv_content" v-for="item in mv" @click="mvclick(item.id)">
				<view class="mv_image">
					<image class="mv_imge_big" :src="item.cover"></image>
					<view class="mv_imge_zhe"></view>
					<image class="mv_imge_small" :src="item.cover"></image>
				</view>
				<view class="mv_text">
					<view class="mv_text_title">{{item.name}}</view>
					<view class="mv_text_name">{{item.artistName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		Mv
	} from '@/utils/http.js'

	export default {
		data() {
			return {
				num: 0,
				num1: 0,
				option1: [{
						text: '全部'
					},
					{
						text: '内地'
					},
					{
						text: '港台'
					},
					{
						text: '欧美'
					},
					{
						text: '日本'
					},
					{
						text: '韩国'
					},
				],
				option2: [{
						text: '全部'
					},
					{
						text: '官方版'
					},
					{
						text: '原生'
					},
					{
						text: '现场版'
					},
					{
						text: '网易出品'
					},
				],
				diname: '',
				banname: '',
				mv: [],
				mvlei: null
			}
		},
		created() {
			this.getMvMoreData();
		},
		methods: {
			active(idx, name) {
				this.num = idx;
				this.diname = name;
				console.log(this.diname);
				this.MvLei();
			},
			active1(idx, name) {
				this.num1 = idx;
				this.banname = name;
				console.log(this.banname);
				this.MvLei();
			},
			async getMvMoreData() {
				let result = await requestGet(Mv);
				if (result.code = 200) {
					this.mv = result.data
				}
			},
			mvclick(id) {
				console.log(id);
				uni.navigateTo({
					url: `/pages/video/video?id=${id}`
				})
			},
			MvLei() {
				if (this.banname == '') {
					this.mvlei = Mv + "?area=" + this.diname
					console.log(this.mvlei)
					this.getMvLeiData();
				} else if (this.diname == '') {
					this.mvlei = Mv + "?type=" + this.banname
					console.log(this.mvlei)
					this.getMvLeiData();
				} else if (this.diname !== '' | this.diname !== '') {
					this.mvlei = Mv + "?area=" + this.diname + "&type=" + this.banname
					console.log(this.mvlei)
					this.getMvLeiData();
				}

			},
			async getMvLeiData() {
				let result = await requestGet(this.mvlei);
				if (result.code = 200) {
					this.mv = result.data
					console.log(this.mv)
				}
			},
		}
	}
</script>

<style lang="less">
	.title {
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		width: 60%;
		margin-left: 20%;
		font-size: 32rpx;
		color: #f87373;

	}

	.tab-select {
		width: 100%;

		.tab-item {
			display: inline-block;
			width: 20%;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 28rpx;
			font-weight: 400;
			color: #6b6b6b;
		}
	}

	.active {
		box-sizing: border-box;
		color: #f87373 !important;
	}

	.mv {
		width: 100%;
		margin-top: 30rpx;

		.mv_content {
			display: inline-block;
			width: 33.33%;
			height: 260rpx;
			box-sizing: border-box;
			overflow: hidden;

			.mv_image {
				position: relative;
				width: 90%;
				margin-left: 5%;
				height: 170rpx;
				border: 1rpx solid #cccccc;

				.mv_imge_big {
					position: absolute;
					width: 100%;
					height: 170rpx;
				}

				.mv_imge_zhe {
					position: absolute;
					width: 100%;
					height: 100%;
					background-color: #dddddd93;
				}

				.mv_imge_small {
					position: absolute;
					width: 80%;
					height: 80%;
					margin: 8% 10%;
					border-radius: 10rpx;
					border: 1px solid white;
				}


			}

			.mv_text {
				margin-left: 20rpx;

				.mv_text_title {
					width: 100%;
					font-size: 12px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					/* 指定显示文本的行数 */
					overflow: hidden;
					/* 超出隐藏 */

				}

				.mv_text_name {
					font-size: 10px;
					color: #cac7c7;
				}
			}

		}

	}
</style>
