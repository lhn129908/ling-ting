<template>
	<view>
		<view class="denglu">
			
		</view>

		  <uni-list>
			  <uni-list-item title="最近播放" clickable  link to="/pages/detail/detail" @click="onClick($event,1)" ></uni-list-item>
		      <uni-list-item title="我的喜爱" clickable  link to="/pages/recent/recent" @click="onClick($event,1)" ></uni-list-item>
			  <uni-list-item title="我的关注" clickable  link to="/pages/recents/recents" @click="onClick($event,1)" ></uni-list-item>
		  </uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.denglu{
	widows: 100%;
	height: 420rpx;
	background-color:#ccc ;
}
</style>
