<template>
	<view class="GeShou">
		  <!-- 歌手 -->
		<view class="GeShou-people" v-for="(item,index) in delivery.artists" :key="item.id" >
			<image :src="item.img1v1Url" mode="widthFix"></image>
			<view class="GeShou-title">
				{{item.name}}
			</view>
			<!-- 子组件中设置关注 -->
			<view class="GeShou-guan" @click="clickGuan(index,item.id)" :class="item.followed === clickIndex?'is_checked':'GeShou-guan'">
				<template v-if="item.followed === clickIndex">
					√已关注
				</template>
				<template v-else>
					+关注
				</template>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: ['delivery'],
		name:"geshou",
		data() {
			return {
				clickIndex:true,
			};
		},
			
		methods:{
			clickGuan(index,id){
				// 子组件把index数据传给父组件
				this.$emit("showCityName",index)
				getApp().globalData.geshouId=id;
				console.log(id)
			}
		}
	}
</script>

<style lang="less">
.GeShou{
	.GeShou-people{
		 margin: 2rem 4rem 1rem 3rem;
		      border-bottom: .001rem dashed rgb(156, 145, 145);
		      display: flex;
		      justify-content:space-between;
		image{
			width: 3rem;
			        height: 3rem;
			        border-radius: 1.973rem; 
			        margin-bottom: 1rem;		
		}
		.GeShou-title{
			 margin-top: 0.5rem;
		}
		.GeShou-guan{
			font-size: 0.5rem;
			        border: 0.5rpx solid #e79c9c;
			        height: 1.5rem;
			        width: 3rem;
			        line-height: 1.5rem;
			        text-align: center;
			        border-radius: 0.5rem;
			        color: #e79c9c;
			        margin-top: 0.5rem;
		}
		.is_checked{
        font-size: 0.5rem;
        border: 0.5rpx solid #888686;
        height: 1.5rem;
        width: 3.5rem;
        line-height: 1.5rem;
        text-align: center;
        border-radius: 0.5rem;
        color: #888686;
        margin-top: 0.5rem;
      }
	}
}
</style>
