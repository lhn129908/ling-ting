<template>
	<view>
		<view class="zt">
			<view class="zt-dh">
				<view class="zt-dh-fh" v-on:click="ymFH">
					<icon class="iconfont icon-xiala"></icon>

				</view>
				<view class="zt-dh-fy">
					<view>
						歌曲
					</view>
					<view>
						歌词
					</view>
				</view>
				<view class="zt-dh-fx">
					分享
				</view>

			</view>
			<swiper class="zt-ym">
				<swiper-item class="zt-ym-gq">
					<view class="zt-ym-gq-zp">

						<image :src="data.picUrl" class="zt-ym-gq-zp-tu"></image>
					</view>
					<view class="zt-ym-gq-jj">
						<view>
							歌曲名:{{data.title}}
						</view>
						<view>
							作者名:{{data.name}}
						</view>
						<view>
							专辑:{{data.ALname}}
						</view>
					</view>
					<view class="zt-ym-gq-jd">
						<view class="zt-ym-gq-jd-xz">
							<view class="iconfont icon-maikefeng">

							</view>
							<view class="iconfont icon-tiaojie">

							</view>
							<view class="iconfont icon-xiazai">

							</view>
							<view class="iconfont icon-pinglun">

							</view>
							<view class="iconfont icon-shenglve">

							</view>
						</view>
						<view class="zt-ym-gq-jd-jd">
							<view class="zt-ym-gq-jd-jdt" v-on:click="rectClick">
								<view class="zt-ym-gq-jd-jdt-ys" :style="{width:width+'vw'}">

								</view>
								<view class="zt-ym-gq-jd-jdt-ys" style="width: {{width+'vw'}};">

								</view>

							</view>
							<view class="zt-ym-gq-jd-jd-sj">
								<view class="zt-ym-gq-jd-jd-sj-ks">
									{{data.currentTime.m+":"+data.currentTime.s}}
								</view>
								<view class="zt-ym-gq-jd-jd-sj-js">
									{{data.duration.m+":"+data.duration.s}}
								</view>
							</view>
						</view>
					</view>
					<view class="zt-ym-gq-an">
						<button type="text" class="iconfont" :class="bf.bofangxunxu" v-on:click="bfxx" />
						<button type="text" class="iconfont icon-shangyishouge" v-on:click="sys" />
						<button type="text" class="iconfont" :class="[bfzt?'icon-bofang':'icon-zanting']" v-on:click="kszt" />
						<button type="text" class="iconfont icon-xiayishou" v-on:click="xys" />
						<button type="text" class="iconfont icon-bofanggedan" v-on:click="bd" />
					</view>
				</swiper-item>
				<swiper-item class="zt-ym-gc">
					<scroll-view class="middle" scroll-y="true" :scroll-top="scrolltop" scroll-with-animation="true">
						<view v-for="(item,index) in data.lyric" :class="[activeIndex==index?'active':'']" class="zt-ym-gc-text">{{item.text}}
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			<view class="select_box" v-if="select">
				<view class="liebiao-top" hover-class="none" hover-stop-propagation="false">
					<view class="bf-leibiao" hover-class="none" hover-stop-propagation="false">播放列表</view>
				</view>
				<scroll-view class="liebiao-neirong" scroll-y="true">
					<view v-for="(item,index) in liebiao">
						<view class="select_one" bindtap="mySelect">
							<view class="name" hover-class="none" hover-stop-propagation="false">
								{{item.name}}
								<view class="zuoze" hover-class="none" hover-stop-propagation="false">
									--{{item.zuoze}}
								</view>
							</view>
							<view class="shanchu">
								<icon type="clear" size="20" data-id="{{item.id}}" v-on:click="shanchu"></icon>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="liebiao-fanhui " v-on:click="xialafanhui">
					<icon class="iconfont icon-xiala"></icon>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	//#ifdef MP-WEIXIN
	const backgroundAudioManager = uni.getBackgroundAudioManager()

	//#endif
	//#ifdef H5
	const backgroundAudioManager = uni.createInnerAudioContext()

	//#endif
	import {
		lyricURL,
		songURL,
		albumURL,
		detailURL,
		requestGet,
		requestPost,
		formatMs2Obj

	} from "@/utils/http.js";
	export default {

		data() {
			return {


				width: "0", //进度条

				data: {
					id: "", //歌曲id
					ALname: "", //专辑名
					title: "", //歌名
					name: "", //作者名
					src: "", //歌曲网址
					lyric: "", //歌词
					picUrl: "", //图片网址
					currentTime: {
						m: "00",
						s: "00",
						f: "000"
					}, //当前时间
					duration: {
						m: "00",
						s: "00",
						f: "000"
					} ,//总时间
					sgc:true,//歌词是否存在
				},
				bofang: ["icon-shunxubofang", "icon-suijibofang", "icon-liebiaoxunhuan", "icon-danquxunhuan"],
				bf: { //播放方式
					bofangxunxu: "icon-shunxubofang",
					BFindex: 0
				},
				scrolltop: 0, //距离头部高度
				activeIndex: -1, //播放行数
				select: false, //列表显示和隐藏
				// liebiao:[]
				liebiao: [{
						id: '33894312',
						name: "33",
						zuoze: "12"
					},
					{
						id: '33894313',
						name: "33",
						zuoze: "13"
					},
					{
						id: '33894314',
						name: "33",
						zuoze: "14"
					},
					{
						id: '33894315',
						name: "33",
						zuoze: "15"
					}
				],
				liebiaoID:['33894312','33894313', '33894314','33894315'],
				bfzt:false,
				

			}
		},
		methods: {
			//播放上下首歌
			//  (播放方式，点击按钮，当前歌曲下标)，返回需要播放歌曲下标
			BFsx(BFindex, sx, i) {
				
				if (sx == "sys") {
					if(i == 0){
						return  i
					}
					switch (BFindex) {
						case 0:
							return i - 1
							break;
						case 1:

							return i - Math.floor(Math.random() * i)
							break;
						case 2:
							return i - 1
							break;
						case 3:
							return i
							break;
					}
				} else if (sx == "xys") {
					if(i == this.liebiao.length-1){
						return  i
					}
					switch (BFindex) {
						case 0:
							return i + 1
							break;
						case 1:
							return i + Math.floor(Math.random() * (this.liebiao.length - i))
							break;
						case 2:
							return i + 1
							break;
						case 3:
							return i
							break;
					}
				}
			},

			//播放循序
			bfxx() {
				this.bf.BFindex = this.bf.BFindex == 3 ? 0 : this.bf.BFindex + 1
				this.bf.bofangxunxu = this.bofang[this.bf.BFindex]

			},
			//上一首
			async sys() {
				const Bfsx = this.BFsx(this.bf.BFindex, "sys", this.liebiaoID.indexOf(this.data.id))
				this.data.id = this.liebiao[Bfsx].id
				await this.Qingqui(this.data.id)
				this.geci()
				this.bofanggequ()
			},
			//播放，暂停
			kszt() {
				if (backgroundAudioManager.paused) {
					backgroundAudioManager.play()
					this.bfzt = false

				} else {
					backgroundAudioManager.pause()
					this.bfzt = true
				}

			},
			//下一首
			async xys() {
				const Bfsx = this.BFsx(this.bf.BFindex, "xys", this.liebiaoID.indexOf(this.data.id))
				// if()
				this.data.id = this.liebiao[Bfsx].id
				console.log(Bfsx,this.data.id)
				await this.Qingqui(this.data.id)
				this.geci()
				this.bofanggequ()
				
			},
			//表单
			bd() {
				this.select = !this.select
			},

			//请求
			async Qingqui(id) {
				//获取歌曲
				const songData = await requestGet(songURL, {
					id: id
				})
				//获取歌词
				const lyricData = await requestGet(lyricURL, {
					id: id
				});
				//获取歌曲详细
				const detailData = await requestGet(detailURL, {
					ids: id
				});
				
				this.data.duration ={
					m: "00",
					s: "00",
					f: "000"
				}
				this.data.src = songData.data[0].url
				if(lyricData.sgc){
					this.data.lyric = "没有歌词"
					this.data.sgc = false
				}else{
					this.data.lyric = lyricData.lrc.lyric
					this.data.sgc = true
				}
				
				this.data.name = detailData.songs[0].ar[0].name
				this.data.title = detailData.songs[0].name
				this.data.ALname = detailData.songs[0].al.name
				this.data.picUrl = detailData.songs[0].al.picUrl
				

			},
			//歌曲播放
			bofanggequ() {
				backgroundAudioManager.stop()
				backgroundAudioManager.autoplay = true
				backgroundAudioManager.title = this.data.title
				backgroundAudioManager.singer = this.data.name
				backgroundAudioManager.src = this.data.src
				this.bfzt = true
				this.data.currentTime = {
					m:"00",
					s:"00",
					f:"000"
				}
			},
			//歌词处理
			geci() {
				if(this.data.sgc){
					const lyric = this.data.lyric.split('\n')
				const arr = lyric.map(r => {
					var arr1 = r.trim().substr(1).split("]")

					return {
						time: arr1[0],
						text: arr1[1]
					}
				})
				this.data.lyric = arr
				}
				
			},
			shanchu(e){
				this.liebiao.splice(this.liebiaoID.indexOf(e.currentTarget.dataset.id),1)
				console.log(this.liebiao)
			},
			xialafanhui(){
				this.select =	!this.select
			},
			ymFH(){
				// history.back()
				// console.log(history.back())
				uni.navigateBack({
					delta:1,
					animationType: "slide-in-bottom",
					animationDuration:300
				})
			},
			rectClick(event){
				// this.width = event.detail.x
				var width = "";
				uni.getSystemInfo({
					success:function(res){
						 width =  res.windowWidth
					}
				})
				const durationTIME = (this.data.duration.m*60+this.data.duration.s)
				const wX = ((event.detail.x-width*0.02)/(width*0.94))
				const time = formatMs2Obj(durationTIME*wX)
				
				console.log(width*0.94,durationTIME,wX,width/event.detail.x)
				backgroundAudioManager.seek(durationTIME*wX)
			}
		},
		//页面加载完成执行
		async onLoad(option) {
			this.BFindex = parseInt(option.i)
			this.bofangxunxu = this.bofang[this.BFindex]
			//#ifdef H5
			this.data.id = 33894312
			//#endif
			//#ifdef MP-WEIXIN
			this.data.id = option.id
			//#endif
			await this.Qingqui(this.data.id)
			this.geci()
			this.bofanggequ()
			backgroundAudioManager.onEnded(async ()=>{
				const Bfsx = this.BFsx(this.bf.BFindex, "xys", this.liebiaoID.indexOf(this.data.id))
				this.data.id = this.liebiao[Bfsx].id
				await this.Qingqui(this.data.id)
				this.geci()
				this.bofanggequ()
			})
			backgroundAudioManager.onTimeUpdate(() => {
				var currentTime = formatMs2Obj(backgroundAudioManager.currentTime)
				var duration = formatMs2Obj(backgroundAudioManager.duration)
				this.data.currentTime = {
					m: currentTime.m,
					s: currentTime.s,
					f: currentTime.f
				}
				this.data.duration = {
					m: duration.m,
					s: duration.s,
					f: duration.f
				}
				const currentTimes = currentTime.m + ":" + currentTime.s + "." + currentTime.f
				if(this.data.sgc){
				if (currentTimes >= this.data.lyric[this.activeIndex + 1].time) {
					
					this.activeIndex = this.activeIndex + 1
					if (this.activeIndex > 6) {
						this.scrolltop = this.scrolltop + 30
						
					}
				}if(currentTimes <= this.data.lyric[this.activeIndex].time){
						this.activeIndex = this.activeIndex - 1
						
							this.scrolltop = this.scrolltop - 30
							
						
					}
				
				}
				this.width = backgroundAudioManager.currentTime / backgroundAudioManager.duration * 94
				

			})


		},

		onShow() {
			uni.hideTabBar()
		},
		onHide() {
			uni.showTabBar()
		},


	}
</script>

<style lang="less">
	.zt {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;

		.zt-dh {
			flex: 1;
			display: flex;
			font-size: 3vh;

			view {
				flex: 1;
				text-align: center;
				line-height: 5vh
			}

			.zt-dh-fh {
				icon {
					float: left;
					margin-left: 5vw;
				}

			}

			.zt-dh-fy {
				display: flex;

				view {
					line-height: 5vh;
				}
			}
		}

		.zt-ym {
			flex: 19;

			.zt-ym-gq {
				display: flex;
				flex-direction: column;

				.zt-ym-gq-zp {
					flex: 10;

					overflow: hidden;

					.zt-ym-gq-zp-tu {
						width: 90vw;
						height: 40vh;
						display: inline-block;
						margin: 3vh 5vw;
					}
				}

				.zt-ym-gq-jj {
					flex: 3;
					display: flex;
					flex-direction: column;
					margin: 0 5vw;

					view {
						flex: 1;
					}
				}

				.zt-ym-gq-jd {
					flex: 4;

					display: flex;
					flex-direction: column;

					.zt-ym-gq-jd-xz {
						flex: 1;
						display: flex;

						view {
							font-size: 40rpx;
							flex: 1;
							line-height: 50px;
							text-align: center;
						}
					}

					.zt-ym-gq-jd-jd {
						flex: 1;

						.zt-ym-gq-jd-jdt {
							width: 94vw;
							height: 3vw;
							margin: 0 2vw;
							border: 1px solid #000000;
							position: relative;

							.zt-ym-gq-jd-jdt-ys {
								position: absolute;
								height: 3vw;
								width: 0;
								background-color: #000000;
							}
						}

						.zt-ym-gq-jd-jd-sj {
							margin-top: 1vh;

							.zt-ym-gq-jd-jd-sj-ks {
								float: left;

								margin-left: 2vw;

							}

							.zt-ym-gq-jd-jd-sj-js {
								float: right;
								margin-right: 2vw;
							}
						}
					}
				}

				.zt-ym-gq-an {
					flex: 2;

					display: flex;

					button {
						font-size: 40rpx;
						flex: 1;
						line-height: 50px;
						text-align: center;
					}
				}
			}
			.zt-ym-gc-text{
				text-align: center;
				margin: 0 15vw;
				width: 70vw;
				overflow: hidden;
			}
		}

		.middle {
			height: 80vh;
			text-align: center;
			margin-top: 20px;
			font-size: 16px;

			.active {
				color: red;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			view {
				height: 60rpx;
				line-height: 60rpx;
			}
		}

		.select_box {
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #ffffff;
			border: 1px ridge black;
			width: 100%;
			height: 70%;
			display: flex;
			flex-direction: column;
		}

		.select_box .liebiao-top {
			flex: 1;
		}

		.select_box .liebiao-neirong {
			padding: 0 5px;
			height: 10rem;
			flex: 6;
			box-shadow: 0 0 2px black inset;
		}

		.select_box .liebiao-neirong .select_one {
			border: black;
			display: flex;
			flex-direction: row;
			border: 1px ridge black;
		}

		.select_box .liebiao-neirong .select_one .name {
			flex: 1;
			height: 3rem;
			padding-left: 10px;
			line-height: 3rem;
			font-size: 1rem;
		}

		.select_box .liebiao-neirong .select_one .name .zuoze {
			display: inline-block;
			font-size: 0.7rem;
			margin-left: 10px;
		}

		.select_box .liebiao-neirong .select_one .shanchu {
			width: 50px;
			text-align: center;
			line-height: 3rem;
		}

		.select_box .liebiao-fanhui {
			flex: 1;
			width: 100%;
			text-align: center;
		}
		.bf-leibiao{
			text-align: center;
		}
	}




































	@font-face {
		font-family: "iconfont";
		/* Project id 2908647 */
		src: url('//at.alicdn.com/t/font_2908647_btr2li9rbdl.woff2?t=1635852090496') format('woff2'), url('//at.alicdn.com/t/font_2908647_btr2li9rbdl.woff?t=1635852090496') format('woff'), url('//at.alicdn.com/t/font_2908647_btr2li9rbdl.ttf?t=1635852090496') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-error:before {
		content: "\e61e";
	}

	.icon-maikefeng:before {
		content: "\e606";
	}

	.icon-tiaojie:before {
		content: "\e695";
	}

	.icon-shenglve:before {
		content: "\e603";
	}

	.icon-pinglun:before {
		content: "\e607";
	}

	.icon-ic_mic_none_48px:before {
		content: "\e8b9";
	}

	.icon-ic_more_horiz_48px:before {
		content: "\e8bc";
	}

	.icon-ic_tune_48px:before {
		content: "\e938";
	}

	.icon-daochu:before {
		content: "\e61d";
	}

	.icon-xiala:before {
		content: "\e626";
	}

	.icon-shoucang:before {
		content: "\e69a";
	}

	.icon-xiazai:before {
		content: "\e69b";
	}

	.icon-suijibofang:before {
		content: "\e6a0";
	}

	.icon-shunxubofang:before {
		content: "\e6a1";
	}

	.icon-danquxunhuan:before {
		content: "\e6a2";
	}

	.icon-liebiaoxunhuan:before {
		content: "\e6a3";
	}

	.icon-xiayishou:before {
		content: "\e6ae";
	}

	.icon-bofang:before {
		content: "\e6af";
	}

	.icon-zanting:before {
		content: "\e6b0";
	}

	.icon-bofanggedan:before {
		content: "\e6be";
	}

	.icon-shangyishouge:before {
		content: "\e6bf";
	}

	.icon-xiangxia:before {
		content: "\e60f";
	}
</style>
