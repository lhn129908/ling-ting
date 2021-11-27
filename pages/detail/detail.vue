
<template>
	<view >
    </uni-swipe-action-item>
	<uni-list>
	    <uni-list :border="true" v-for="(item,index) in geList" :key="item.id" >
	        <uni-list-chat  :title="item.title" :avatar-list="item.img" :src="item.src" :note="item.author" time="03:20" badge-positon="left" @click='abc()' link to="" >
	            <view class="chat-custom-right">
	                <text class="chat-custom-text">03:20</text>
					<view class="chat-custom-icons" @click.stop>
						<!-- 需要使用 uni-icons 请自行引入 -->
						<uni-icons type="loop" color="#999" size="30"  @click="qiehuan()"></uni-icons>
					</view>
					<view class="chat-custom-more" @click.stop>
						<view @click="topen"><uni-icons type="list" color="#999" size="30"></uni-icons></view>
					</view>
	            </view>
	        </uni-list-chat>
	    </uni-list> 
	</uni-list>
        <uni-popup ref="popup" :mask-click="false" type="bottom">
          <view class="tshoucang"><button  class="shoucang" @click="shoucang()">{{ttxt}}</button></view>
	      <view class="tshanchu" ><button  class="yichu"    @click="yiChu()"   >移除歌曲</button></view>
          <button @click="tclose">取消</button>
        </uni-popup>
	</view>
	

</template>

<script>
	export default {
	  data(){
	    return {
			gequ:[],		
			ttxt:"收藏歌曲",					
			isPlay: false,
			geList: [
					{
						id:"101",
						title: "致爱丽丝",
						isPlay: false,
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
						img: [{url: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png'}],
						name: "致爱丽丝",
						author: "陈小康",
						tt:false,
					},
					{
						id:"102",
						title: "DJBeat_老果",
						isPlay: false,
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
						img: [{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'}],						
						name: "DJBeat_老果",
						author: "未知",
						tt:false,
					},
					{
						id:"103",
						title: "哥只是个传说",
						isPlay: false,
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
						img: [{url: 'http://p2.music.126.net/7RItheuGL6uP4YfZj3CW8w==/27487790706531.jpg'}],
						name: "哥只是个传说",
						author: "陈旭",
						tt:false,
					},
					{
						id:"104",
						title: "夜曲",
						isPlay: false,
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
						img: [{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'}],						
						name: "晴天",
						author: "周杰伦",
						tt:false,
					},
					{
						id:"105",
						title: "晴天",
						isPlay: false,
						src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
						img: [{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'}],						
						name: "DJBeat_老果",
						author: "周杰伦",
						tt:false,
					},
				],
	    }
	  },

	  methods:{
		        abc(){
					console.log(this.geList)
				},
		  
		        topen() {
		            this.$refs.popup.open('bottom')
		        },
		        tclose() {
		            this.$refs.popup.close()
		        },
				qiehuan(){
					this.isPlay = !this.isPlay;
				},
				shoucang(){
					tt:this.geList.tt,
					this.tt = !this.tt;
					
					if(this.tt==true){
						this.ttxt="取消收藏",
						uni.showToast({
						title: `收藏歌曲成功`,
						icon: 'none'
						});
						console.log(this.ttxt)
					}else{
						this.ttxt="收藏歌曲",
						uni.showToast({
							title: `取消收藏成功`,
						    icon: 'none'
						});
						console.log(this.ttxt)
					};
					this.$refs.popup.close()
				},
				yiChu:function(geList){
					this.geList.splice(this.geList.indexOf(geList),1);
					this.$refs.popup.close()
				}
	  }
	}
</script>

<style>
   .chat-custom-right {
	   width:300rpx;
	   height: 100%;
	  position: absolute;
   }
.chat-custom-icons{
	width: 80rpx;
	height: 80rpx;
	position: absolute;
	left: 140rpx;
	top:20rpx;
}
.chat-custom-more{
	width: 80rpx;
	height:80rpx;
	position: absolute;
	left: 260rpx;
	top:20rpx;
}
   .chat-custom-text {
       font-size: 12px;
       color: #999;
	   	  position: absolute;
		  top:80rpx;
   }
  .tshoucang .shoucang{
  		   width:100%;
  		   height:110rpx;
  		   background-color: #ffffff;
  		   text-align: center;
		   font-size:16px;
  		   border-top: #ccc solid 1px;
  }
  .tshanchu .yichu{
  		   width:100%;
  		   height: 110rpx;
  		   background-color: #ffffff;
  		   text-align: center;
		   font-size:16px;
  		   border-top: #ccc solid 1px;
  }
  .tclose{
  		   margin-bottom: 100rpx;
  		   font-size: 16px;
  		   background-color: #ffffff;
  }
</style>
