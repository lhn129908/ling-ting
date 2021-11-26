const baseUrl = "http://101.35.3.52"

export function requestGet(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			method: "GET",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

export function requestPost(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: "POST",
			data: data,
			success: function(res) {
				resolve(res.data)
			},
			fail: function(err) {
				reject(err)
			}
		})
	})
}

// 轮播图数据接口
export const LunboURL = "/banner?type=2"
//推荐歌单数据接口
export const TuiDan="/personalized?limit=12"
// 推荐新歌数据接口
export const TuiXin="/personalized/newsong"
// 推荐mv数据接口
export const TuiMv="/personalized/mv"
// 排行榜单数据接口
export const PaiHang="/toplist/detail"
// 全部mv数据接口
export const Mv="/mv/all"
// 歌单分类数据接口
export const DanLei="/playlist/catlist"
// 歌单数据接口
export const Dan="/top/playlist"


export const HotSearchURL = "/search/hot"    //GET
export const FuzzySearchURL = "/search"     //GET 


export const ListsURLH5="/album"
export const ListsURL = "http://101.35.3.52/album" 
export const tjURLH5 ="/playlist/detail"
export const tjURL = "http://101.35.3.52/playlist/detail"
export const mvURLH5 = "/mv/detail"
export const mvURL="http://101.35.3.52/mv/detail"
export const simiURLH5 = "/simi/mv"
export const simiURL="http://101.35.3.52/simi/mv"
