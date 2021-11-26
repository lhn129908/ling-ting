<template>
	<view class="ZhuanJi">
		<!-- 专辑 -->
			<view class="ZhuanJi1" v-for="item in delivery.albums" :key="item.id">
				<image class="zhuan-image" mode="widthFix" :src="item.picUrl"></image>
				<view class="zhuan-name">
				  <view>{{item.name}}</view>
				  <view>作者：{{item.artist.name}}</view>
				</view>
			</view>
			
	</view>
</template>

<script>
	export default {
		props: ['delivery'],
		name:"zhuanji",
		data() {
			return {
				// ms:"专辑",
				// this.danqu = result.result.songs;
				// this.zhuanji = result.result.albums;
				// this.geshou= result.result.artists;
			};
		}
	}
</script>

<style lang="less">
 // 专辑
 .ZhuanJi{
    .ZhuanJi1{
      margin: 1.5rem 2rem 1rem 1.5rem;
	  display: flex;
      // border:0.5rpx solid red;
      .zhuan-image{
        flex: 2;
        border-radius: 20rpx ;     
      }
      .zhuan-name{
        flex:8;
        margin-left: 1rem;
        :nth-child(1){
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }
        :nth-child(2){
          margin-top: 1rem;
          font-size: 0.5rem;
          color: #e79c9c;
        }
      }
      
    }
  }

</style>
