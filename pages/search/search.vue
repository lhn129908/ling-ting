<template>
	<view class="search-all">
		<!-- 弹窗 -->
		<button @click="updateCity"></button>
		<uni-popup ref="popupSuccess" type="message">
			<uni-popup-message type="success" message="您已关注成功" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="popupWarn" type="message">
			<uni-popup-message type="warn" message="您已取消关注" :duration="2000"></uni-popup-message>
		</uni-popup>

		<!-- 搜索框 -->
		<view class="uni-common-mt search-kuang">
			<view class="uni-form-item uni-column input">
				<input class="uni-input" focus :placeholder="name" v-model="uninputValue" />
			</view>
			<view class="button" @click="sousuo">搜索</view>
		</view>
		<!-- tab切换 -->
		<view class="tabQ">
			<view class="tabH" @click="danQu" :class="danQuShowed?'tabH':'tabHred'">
				单曲
			</view>
			<view class="tabH" @click="zhuanJi" :class="zhuanJiShowed?'tabH':'tabHred'">
				专辑
			</view>
			<view class="tabH" @click="geShou" :class="geShouShowed?'tabH':'tabHred'">
				歌手
			</view>
		</view>
		<!-- 内容区 -->
		<view class="countent">
			<danqu :danqu="danqu" :class="danQuShowed?'hide':''" :delivery="delivery"></danqu>
			<zhuanji :class="zhuanJiShowed?'hide':''" :delivery="delivery"></zhuanji>
			<!-- delivery.sync="delivery"是发送给子组件，@showCityName="updateCity"是从子组件获取到数据 -->
			<geshou :class="geShouShowed?'hide':''" :delivery.sync="delivery" @showCityName="updateCity"></geshou>
		</view>

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
				name: "",
				oneself: 1,
				final: "",
				delivery: "",
				danQuShowed: false,
				zhuanJiShowed: true,
				geShouShowed: true,
				uninputValue: "",
				// backgroundcolor:false,
				tabs: [{
					name: "单曲"
				}, {
					name: "专辑"
				}, {
					name: "歌手"
				}],
				clickListIndex: []
			}
		},
		// 传过来的参数
		onLoad: function(option) {
			this.name = option.name
			console.log(this.name)
			this.getFuzzySearch();
		},
		methods: {
			async getFuzzySearch() {
				let result = await requestGet(FuzzySearchURL + "?keywords=" + this.name + "&type=" + this.oneself);
				console.log(result, "xx")
				if (result.code === 200) {
					this.delivery = result.result;
				}
				console.log(this.delivery)
			},
			danQu() {
				this.backgroundcolor = true
				this.danQuShowed = false
				this.zhuanJiShowed = true
				this.geShouShowed = true
				this.oneself = 1
				this.getFuzzySearch()
				console.log("我是单曲")
			},
			zhuanJi() {
				this.backgroundcolor = true
				this.zhuanJiShowed = false
				this.danQuShowed = true
				this.geShouShowed = true
				this.oneself = 10
				this.getFuzzySearch()
				console.log("我是专辑")
			},
			geShou() {
				this.backgroundcolor = true
				this.geShouShowed = false
				this.danQuShowed = true
				this.zhuanJiShowed = true
				this.oneself = 100
				this.getFuzzySearch()
				console.log("我是歌手")
				console.log(this.delivery)
			},
			sousuo() {
			if(this.uninputValue!==''){
				this.name = this.uninputValue
				this.getFuzzySearch();
				}
			},
			// 父组件中更改关注
			updateCity(data) {
				this.delivery.artists[data].followed = !this.delivery.artists[data].followed
				if (this.delivery.artists[data].followed) {
					this.$refs.popupSuccess.open('top')
				} else {
					this.$refs.popupWarn.open('top')
				}
			},
			
			
		},

	}
</script>

<style lang="less">
	.hide {
		display: none;
	}
	
// 弹窗
.uni-popup-message{
	text-align: center;
}
	/* 搜索框样式 */
	.search-all {
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
		}

		.tabQ {
			margin: 30rpx 50rpx;
			display: flex;

			.tabH {
				flex: 1;
				border: 1px solid #f87373;
				text-align: center;
			}

			.tabHred {
				flex: 1;
				border: 1px solid #f87373;
				text-align: center;
				background-color: #f87373;
			}
		}
	}
</style>
