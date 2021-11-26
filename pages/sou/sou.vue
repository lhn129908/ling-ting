<template>
	<view class="search">

		<!-- 重写后的搜索框 -->
		<view class="uni-common-mt search-kuang">
			<view class="uni-form-item uni-column input">
				<input class="uni-input" focus placeholder="请输入歌手或歌曲名" v-model="inputValue" @input="inputV" />
			</view>
			<view class="button" @click="sou">搜索</view>
		</view>

		<!-- 重写的模糊搜索后的歌名  -->
		<template v-if="viewShowed">
			<view class="search-name">搜索：{{inputValue}}</view>
			<scroll-view class='scroll-view' scroll-y>
				<view v-for="(item,index) in fuzzySearch" :key="index" class="msg-item" @click="sou">
					<uni-icons type="search" size="20" class="searchIcon"></uni-icons>
					<view class='user-name'>{{item.name}}--</view>
					<view class="user-title">{{item.artists[0].name}}</view>s
				</view>
			</scroll-view>
		</template>

		<!-- 重写的热搜歌名 -->
		<template v-else>
			<view class="recommend">热门搜索</view>
			<view class="search-music" v-for="(item,index) in hotSearch" :key="index" @click="resou($event)" :data-name="item.first">
				<uni-icons type="search" size="20" class="searchIcon"></uni-icons>
				{{item.first}}
			</view>
		</template>
	</view>
</template>

<script>
	import {
		requestGet,
		HotSearchURL,
		FuzzySearchURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				hotSearch: [],
				fuzzySearch: [],
				inputValue: '',
				viewShowed: null,
			}
		},
		created() {
			this.getHotSearch();
		},
		methods: {
			async getHotSearch() {
				let result = await requestGet(HotSearchURL);
				if (result.code === 200) {
					this.hotSearch = result.result.hots;
				}
				// console.log(this.hotSearch)
			},
			async getFuzzySearch() {
				let result = await requestGet(FuzzySearchURL + "?keywords=" + this.inputValue);
				if (result.code === 200) {
					this.fuzzySearch = result.result.songs;
				}
			},
			inputV() {
				if (this.inputValue === '') {
					this.viewShowed = false
				} else {
					this.viewShowed = true
				}
			},
			// 点击搜索进行跳转
			sou() {
				if (this.inputValue !== '') {
					console.log(this.inputValue)
					uni.navigateTo({
						url: "../search/search?name=" + this.inputValue
					})
				}
			},
			resou(e) {
				console.log(e.currentTarget.dataset.name)
				uni.navigateTo({
					url: "../search/search?name=" + e.currentTarget.dataset.name
				})
			}
		},

		updated() {
			this.getFuzzySearch();
		}
	}
</script>




<!-- 样式 -->
<style lang="less">
	// 公共样式
	.hide {
		display: none;
	}

	.search {

		// 搜索框样式
		.search-kuang {
			display: flex;
			border: 0.0125rem solid #f87373;
			margin: 0.5rem 2rem 0 2rem;
			height: 60rpx;
			border-radius: 30rpx 30rpx 30rpx 30rpx;
			line-height: 60rpx;

			.input {
				flex: 5;
				margin-left: 2rem;
				margin-top: 0.25rem;
			}

			.button {
				flex: 1;
				background-color: #f87373;
				border-radius: 0rpx 30rpx 30rpx 0rpx;
				text-align: center;
				color: #f1f1f1;
			}

			.input-placeholder {
				font-size: 16px;
				color: #dddddd;
				font-style: italic;
			}
		}


		//模糊搜索后的歌名
		.search-name {
			margin: 1.5rem 0 0.8rem 1.5rem;
			font-size: large;
			color: #f87373;
		}

		.scroll-view {
			.msg-item {
				display: flex;
				margin: 0 2rem 0.8rem 1.5rem;

				.searchIcon {
					margin-right: 0.5rem;
				}

				.user-name {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.user-title {
					font-style: italic;
					color: rgb(95, 144, 189);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		// 热搜歌名样式
		.recommend {
			margin: 1.5rem 0 0.8rem 1.5rem;
			font-weight: 700;
		}

		.search-music {
			margin: 0 0 0.8rem 1.5rem;

			.searchIcon {
				margin: 8rpx 8rpx 0 5rpx;
			}
		}
	}
</style>
