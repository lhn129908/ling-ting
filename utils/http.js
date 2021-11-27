const baseUrl = "http://101.35.3.52"

export function requestGet(url, data) {
	return new Promise((resolve, reject) => {
		var requestUrl = ""
		//#ifdef H5
		requestUrl = url
		//#endif
		//#ifdef MP-WEIXIN
		requestUrl =baseUrl + url
		//#endif
		uni.request({
			url: requestUrl,
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
	console.log(requestUrl)
}

export function requestPost(url, data) {
	return new Promise((resolve, reject) => {
		var requestUrl = ""
		//#ifdef H5
		requestUrl = url
		//#endif
		//#ifdef MP-WEIXIN
		requestUrl =baseUrl + url
		//#endif
		uni.request({
			url:requestUrl,
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

export function formatMs2Obj(total) {
  var h = repairZero(Math.floor(total / 3600))
  var m = repairZero(Math.floor((total - h * 3600) / 60))
  var s = repairZero(Math.floor(total - h * 3600 - m * 60))
  var f = repairZero(Math.floor((total - h * 3600 - m * 60-s)*1000))
  //ES6 结构  h:h
  return {
    h,
    m,
    s,
    f
  }
}
/**
 * 补零
 */
function repairZero(num) {
  return num < 10 ? ("0" + num) : num
}

export var lyricURL = "/lyric";
export var songURL = "/song/url";
export var albumURL = "/album";
export var detailURL = "/song/detail";
