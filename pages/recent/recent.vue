<template>
	<view class="big">
		<view class="trade">
			<view class="texts" :class="curr==0?'active':''" data-index="0" @tap="setCurr">
				歌曲
			</view>
			<view class="texts" :class="curr==1?'active':''" data-index="1" @tap="setCurr">
				MV
			</view>
			<view class="texts" :class="curr==2?'active':''" data-index="2" @tap="setCurr">
				歌单
			</view>
		</view>
		<swiper style="height: 100vh;" :current="curr" @change="setCurr">
			<swiper-item>
				<scroll-view>
					<view>
						<uni-list>
						    <uni-list :border="true">
						        <uni-list-chat class="uni-list" title="歌曲名称" :avatar-list="avatarList" note="歌手" time="03:20" badge-positon="left" link to="/pages/recents/recents" >
						            <view class="chat-custom-right">
						                <text class="chat-custom-text">03:20</text>
										<view class="chat-custom-icons" @click.stop>
											<!-- 需要使用 uni-icons 请自行引入 -->
											<uni-icons type="loop" color="#999" size="30"></uni-icons>
										</view>
										<view class="chat-custom-more" @click.stop>
											<view @click="topen"><uni-icons type="list" color="#999" size="30"></uni-icons></view>
										</view>
						            </view>
						        </uni-list-chat>
						    </uni-list> 
						</uni-list>
						
					<!-- <view @click="topen"><uni-icons type="star-filled" color="#999" size="18"></uni-icons></view> -->
					        <uni-popup ref="popup" :mask-click="false" type="bottom" >
					          <view class="tshoucang">取消收藏</view>
					          <button @click="tclose" class="tclose">取消</button>
					        </uni-popup>
						</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view>
					我喜欢的MV
				</scroll-view>
			</swiper-item>	
			<swiper-item>
				<scroll-view>
					我喜欢的歌单
				</scroll-view>
			</swiper-item>			
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curr:0,
				avatarList: [{
							   url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
							}],
			}
		},
		methods: {
			topen() {
			    this.$refs.popup.open('bottom')
			},
			tclose() {
			    this.$refs.popup.close()
			},
			setCurr(e) {
			let thisCurr = e.detail.current || e.currentTarget.dataset.index || 0;

			this.curr = thisCurr;
			}
		}
	}
</script>

<style>
	.trade{
		width: 100%;
		color: #272727;
		overflow: auto;
	}
	.trade view{
          text-align: center;
		padding-left: 25upx;
		width: 30%;
		height: 80rpx;
		font-size: 16px;
		float: left;
	}
	.trade .texts.active{
		border-bottom: 1upx solid #007AFF;
	}
	
	.uni-list{
		font-size: 16px;
	}
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
	   .tshoucang{
		   width:100%;
		   height:80rpx;
		   background-color: #ffffff;
		   text-align: center;
		   padding-top: 30rpx;
		   border-top: #ccc solid 1px;
	   }
	   .tshanchu{
		   width:100%;
		   height: 80rpx;
		   background-color: #ffffff;
		   text-align: center;
		   padding-top: 30rpx;
		   border-top: #ccc solid 1px;
	   }
	   .tclose{
		   margin-bottom: 100rpx;
		   font-size: 16px;
		   background-color: #ffffff;
	   }
</style>