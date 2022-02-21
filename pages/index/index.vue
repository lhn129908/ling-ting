<template>
	<view>

		<!-- 搜索框 -->
		<view class="sou_suo" @click="jump">
			<input class="" type="text" confirm-type="search" placeholder="请输入歌手或歌曲名"
				placeholder-class="input-placeholder" />
			<button form-type="submit" size="mini">搜索</button>
		</view>

		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" indicator-color="rgba(255, 255, 255,1)"
						indicator-active-color="#f87373" autoplay="true" interval="2000" duration="500" circular="true">
						<swiper-item v-for="item in lunbo" :key="item.targetId">
							<view class="swiper-item">
								<image :src="item.pic"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 自定义tab切换 -->
		<view class="tab">
			<!-- tab选项卡 -->
			<view class="tab-select">
				<view class="tab-item" v-for="(item,index) in select" @click="active(index)"
					:class="{active:index==num}">
					{{item.title}}
				</view>
			</view>


			<!-- tab内容框 -->
			<!-- 推荐***************************************** -->
			<view class="tab-content" v-show="num==0">
				<!-- 推荐歌单 -->
				<view class="parent">
					<view class="title">推荐歌单</view>
					<view class="more" @click="danmore">更多></view>
				</view>

				<view class="gedan">
					<view class="gedan-item" v-for="item in tuidan" @click="click(item.id)">
						<image calss="gedan-item-img" :src="item.picUrl"></image>
						<view class="gedan-item-title">
							{{item.name}}
						</view>
					</view>
				</view>



				<!-- 推荐mv -->
				<view class="parent">
					<view class="title">最新热门MV推荐</view>
					<view class="more" @click="mvmore">更多></view>
				</view>
				<view class="tui_mv">
					<view class="tui_mv_item" v-for="item in tuimv" @click="mvclick(item.id)">
						<image :src=" item.picUrl"></image>
						<view class="tui_mv_text">{{item.name}}</view>
					</view>
				</view>

				<!-- 推荐新歌 -->

				<view class="parent">
					<view class="title">推荐新歌</view>
					<view class="more" @click="danmore">更多></view>
				</view>
				<view class="new_songs" v-for="item in tuixin" @click="songclick(item.id)">
					<view class="new_songs_image">
						<image :src="item.picUrl"></image>
					</view>
					<view class="new_songs_text">
						<view class="new_songs_name">{{item.name}}</view>
						<view class="new_songs_artist">
							<image src="/static/re.png"></image>
							{{item.song.artists[0].name}}★{{item.song.album.company}}☞{{item.song.album.subType}}
						</view>
					</view>
				</view>


			</view>


			<!-- 排行榜***************************************** -->
			<view class="tab-content" v-show="num==1">
				<view class="pai_hang" v-for="item in paihang"  @click="click(item.id)">
					<view class="pai_hang_image">
						<image :src="item.coverImgUrl"></image>
					</view>
					<view class="pai_hang_text">
						<view class="pai_hang_name">{{item.name}}</view>
						<view class="pai_hang_song" v-for="item1 in item.tracks">
							{{item1.first}}-{{item1.second}}
						</view>
					</view>
				</view>
			</view>


			<!-- mv***************************************** -->
			<view class="tab-content" v-show="num==2">
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
				<view class="more_mv" @click="mvmore">到底了，点击查看更多~~~</view>

			</view>
		</view>


	</view>
</template>


<script>
	import {
		requestGet,
		LunboURL,
		TuiDan,
		TuiXin,
		TuiMv,
		PaiHang,
		Mv
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				lunbo: [],
				tuidan: [],
				tuixin: [],
				tuimv: [],
				paihang: [],
				mv: [],
				select: [{
						id: 1,
						title: "推荐"
					},
					{
						id: 2,
						title: "排行榜"
					},
					{
						id: 3,
						title: "mv"
					},
				],
				num: 0,
			}
		},
		created() {
			this.getIndexData();
		},
		methods: {
			async getIndexData() {
				let result = await requestGet(LunboURL);
				let result1 = await requestGet(TuiDan);
				let result2 = await requestGet(TuiXin);
				let result3 = await requestGet(TuiMv);
				let result4 = await requestGet(PaiHang);
				let result5 = await requestGet(Mv);
				if (result.code = 200) {
					this.lunbo = result.banners;
					this.tuidan = result1.result;
					this.tuixin = result2.result;
					this.tuimv = result3.result;
					this.paihang = result4.list;
					this.mv = result5.data
				}
			},

			// 点击搜索框跳转到搜索页面
			jump() {
				uni.navigateTo({
					url: '/pages/sou/sou',
				})
			},
			active(idx) {
				this.num = idx;
			},
			danmore(){
				uni.navigateTo({
					url: '/pages/danmore/danmore',
				})
			},
			mvmore(){
				uni.navigateTo({
					url:'/pages/mvmore/mvmore'
				})
			},
			click(id){
				console.log(id);
				uni.navigateTo({
					url:`/pages/gedan/gedan?id=${id}`
				})
			},
			mvclick(id){
				console.log(id);
				uni.navigateTo({
					url:`/pages/video/video?id=${id}`
				})
			},
			songclick(id){
				console.log(id);
				uni.navigateTo({
					url:`/pages/control/control?id=${id}`
				})
			}
		}
	}
</script>


<style lang="less">
	.sou_suo {
		width: 90%;
		height: 60rpx;
		margin-left: 5%;
		margin-top: 10rpx;
		margin-bottom: 10rpx;


		>input {
			width: 80%;
			height: 100%;
			display: inline-block;
			border-radius: 30rpx 0rpx 0rpx 30rpx;
			border: 1rpx solid #ccc;
			border-right: 0rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
		}

		>button {
			height: 60rpx;
			display: inline-block;
			border: 1rpx solid #ccc;
			border-left: 0rpx;
			border-radius: 0rpx 30rpx 30rpx 0rpx;
			margin: 0rpx;
			color: white;
			background-color: #f87373;
		}

		.input-placeholder {
			font-size: 14px;
			text-align: center;
			color: #dddddd;
		}
	}

	.swiper {
		width: 100%;
		height: 440rpx;

		image {
			width: 100%;
		}
	}

	.tab {
		.tab-select {
			margin-top: 30rpx;
			width: 80%;
			margin-left: 10%;
			height: 60rpx;

			.tab-item {
				display: inline-block;
				width: 33.33%;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 18px;
				color: #f87373;
				font-weight: 400;
				box-sizing: border-box;
				border: 1rpx solid #f87373;
			}
		}

		.tab-content {
			margin-top: 20rpx;
			width: 100%;
			margin-bottom: 60rpx;
		}
	}

	.active {
		color: #FFFFFF !important;
		background-color: #f87373;
	}

	.parent {
		display: flex;
		width: 100%;
		height: 60rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;

		.title {
			width: 80%;
			color: #6b6b6b;
		}

		.more {
			padding-top: 10rpx;
			color: #cccccc;
			font-size: 12px;
		}
	}

	.gedan {
		width: 100%;

		.gedan-item {
			float: left;
			width: 30%;
			height: 280rpx;
			box-sizing: border-box;
			margin: 1.6%;
			border: 1rpx solid #A5A5A5;
			border-radius: 5%;

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

	.tui_mv {
		margin-top: 20rpx;
		width: 100%;
		height: 260rpx;
		display: flex;

		.tui_mv_item {
			width: 100%;
			height: 100%;
			padding: 11rpx;
			padding-top: 30rpx;
			border: 1px solid #dddddd;
			border-radius: 20rpx;
			box-sizing: border-box;
			flex: 1;

			image {
				width: 160rpx;
				height: 160rpx;
			}

			.tui_mv_text {
				color: #A5A5A5;
				font-size: 10px;
				text-align: center;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				/* 指定显示文本的行数 */
				overflow: hidden;
				/* 超出隐藏 */
			}
		}
	}

	// 推荐新歌
	.new_songs {
		display: flex;
		width: 96%;
		margin-left: 2%;
		height: 140rpx;
		margin-top: 10rpx;
		border-bottom: 1rpx solid #e2e2e2ee;
		border-radius: 20rpx;
		box-shadow: 3rpx 3rpx 2rpx 2rpx rgb(223, 223, 223);

		.new_songs_image {
			flex: 2;
			padding-left: 20rpx;
			padding-top: 10rpx;

			image {
				width: 120rpx;
				height: 120rpx;
			}
		}

		.new_songs_text {
			flex: 6;
			padding-top: 20rpx;

			.new_songs_name {
				font-size: 14px;
				color: #666565;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				/* 指定显示文本的行数 */
				overflow: hidden;
			}

			.new_songs_artist {
				font-size: 10px;
				color: #8f8f8f;
				margin-top: 20rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				/* 指定显示文本的行数 */
				overflow: hidden;

				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}

	//排行榜
	.pai_hang {
		display: flex;
		width: 96%;
		margin-left: 2%;
		height: 200rpx;
		margin-top: 10rpx;
		border: 1rpx solid #e2e2e2ee;
		border-radius: 20rpx;

		.pai_hang_image {
			flex: 2;
			padding-left: 20rpx;
			padding-top: 10rpx;

			image {
				width: 180rpx;
				height: 180rpx;
			}
		}

		.pai_hang_text {
			flex: 6;
			padding-top: 10rpx;
			padding-left: 10rpx;

			.pai_hang_name {
				font-size: 14px;
				color: #666565;
			}

			.pai_hang_song {
				padding: 5rpx;
				font-size: 12px;
				color: #8f8f8f;
				// margin-top: 20rpx;
			}
		}
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
					color: #666565;
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
					color: #A5A5A5;
				}
			}

		}

	}

	.more_mv {
		width: 80%;
		text-align: center;
		font-size: 14px;
		margin-top: 40rpx;
		margin-left: 10%;
		height: 60rpx;
		color: #cac7c7;
	}
</style>
