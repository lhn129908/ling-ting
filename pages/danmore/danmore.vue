<template>
	<view>
		<button class="btn" @click="open">❀❀❀&nbsp;&nbsp;&nbsp;查看分类&nbsp;&nbsp;&nbsp;❀❀❀</button>
		<uni-popup ref="popup" type="bottom" background-color="#fff">
			<!-- tab选项卡 -->
			<view class="tab-select">
				<view class="tab-item" v-for="(item,index) in select" @click="active(index,item.name)"
					:class="{active:index==num}">
					{{item.name}}
				</view>
			</view>
		</uni-popup>
		
		<view class="gedan">
			<view class="gedan-item" v-for="item in modan" @click="click(item.id)">
				<image calss="gedan-item-img" :src="item.coverImgUrl"></image>
				<view class="gedan-item-title">
					{{item.name}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		requestGet,
		DanLei,
		Dan
	} from '@/utils/http.js'

	export default {
		data() {
			return {
				select: [],
				num: 0,
				leiname:null,
				modan: []
			}
		},
		created() {
			this.getDanMoreData();
		},
		updated() {

		},
		methods: {
			async getDanMoreData() {
				let result = await requestGet(DanLei);
				let result1 = await requestGet(Dan);
				if (result.code = 200) {
					this.select = result.sub;
					this.modan=result1.playlists;
				}
			},
			active(idx,name) {
				this.num = idx;
				this.leiname=name;
				console.log(this.leiname)
				this.getLeiData();
				
			},
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('top')
			},
			click(id){
				console.log(id);
				uni.navigateTo({
					url:`/pages/gedan/gedan?id=${id}`
				})
			},
			async getLeiData(){
				const dan =Dan+"?cat="+this.leiname
				// const dan1=dan.toString();
				console.log(dan)
				let result = await requestGet(dan)
				if (result.code = 200) {
					this.modan = result.playlists;
					console.log(result.playlists)
				}
			}
		}
	}
</script>

<style lang="less">
	.btn{
		width: 100%;
		height: 80rpx;
		font-size: 13px;
		line-height: 80rpx;
		background-color: #F9F9F9;
		color: #f87373;
		border-radius: 0 0 60% 60%;
	}
	.tab-select {
		margin-top: 30rpx;
		width: 100%;

		.tab-item {
			display: inline-block;
			width: 20%;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			font-size: 13px;
			font-weight: 400;
			color: #6b6b6b;
		}
	}
	.active {
		box-sizing: border-box;
		border-bottom: 4rpx solid #f87373;
		color: #f87373 !important;
	}
	.gedan {
		margin-top: 20rpx;
		width: 100%;
	
		.gedan-item {
			float: left;
			width: 30%;
			height: 280rpx;
			box-sizing: border-box;
			margin: 1.6%;
			border: 1rpx solid #A5A5A5;
			border-radius: 5%;
			background-color: #F9F9F9;
			image {
				margin-top: 20rpx;
				margin-left: 20rpx;
				width: 180rpx;
				height: 180rpx;
			}
	
			.gedan-item-title {
				width: 80%;
				margin-left: 10%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				/* 指定显示文本的行数 */
				overflow: hidden;
				font-size: 24rpx;
				color: #6b6b6b;
			}
		}
	}
</style>
