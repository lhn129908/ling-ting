<template>

	<view class="DanQu">
		<view class="DanQu-sing" v-for="item in delivery.songs" :key="item.id" @click="danquclick(item.id)">
			<view class="DanQu-left">
				<view>
					{{item.name}}
				</view>
				<view>
					{{item.artists[0].name}}
				</view>
			</view>

			<view class="DanQu-right">
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>
`
<script>
	export default {
		props: ['delivery'],
		name: "danqu",
		data() {
			return {
				
			};
		},
		methods:{
			danquclick(id){
				console.log(id);
				uni.navigateTo({
					url:`/pages/control/control?id=${id}`
				})
			},
		}
	}
</script>

<style lang="less">
	.DanQu {
		.DanQu-sing {
			display: flex;
			margin: 0 50rpx;
			justify-content: space-between;
			border-bottom: .001rem solid rgb(242, 243, 242);
			padding: 10rpx 20rpx;

			.DanQu-left {
				margin: 10rpx;

				:nth-child(1) {
					font-size: 35rpx;
					margin-top: 10rpx;
				}

				:nth-child(2) {
					font-size: 26rpx;
					color: #862e06;
					margin-top: 10rpx;
				}
			}

			.DanQu-right {
				margin: 10rpx;
				line-height: 80rpx;
			}
		}
	}
</style>
