var app = getApp();
var host = 'https://shop.dnote.cn/api/v1/';
let token = app.globalData.token || wx.getStorageSync('token');

function request({
	url,
	token,
	data = {},
	method = 'GET'
}) {
	return new Promise(function(resolve, reject) {
		_request(url, resolve, reject, token, data, method)
		// _request(url, resolve, reject,token, data, method)
	})
}

function _request(url, resolve, reject, token, data = {}, method = 'GET') {
	// console.log('token', token);
	wx.request({
		url: host + url,
		// url: url,
		header: {
			"content-type": "application/json",
			'Authorization': token || '',
			// 'Authorization': token.prefix + token.token
		},
		data: data,
		method: method,
		success: res => {
			resolve(res)
		},
		fail: () => {
			reject('接口请求失败')
		},
		complete: () => {
			wx.hideLoading();
		}
	})
}

module.exports = {
	request
}
