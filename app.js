//app.js
App({
	onLaunch: function() {
		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				wx.request({
					url: this.globalData.url + 'wechat',
					method: 'POST',
					data: {
						code: res.code
					},
					header: {
						'content-type': 'application/json;charset=utf-8'
					},
					success: res => {
						if (res.data.code == 200) {
							this.globalData.token = res.data.data.token;
							wx.setStorageSync('userOpenid', res.data.data.token.wechatUser.open_id);
							wx.setStorageSync('token', res.data.data.token);
							wx.setStorageSync('seller', res.data.data.token.wechatUser.seller);
							wx.setStorageSync('user', res.data.data.token.wechatUser.user);
							if (this.checkLoginReadyCallback) {
								this.checkLoginReadyCallback(res);
							}
						}
					}
				});
			}
		})
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo
							console.log(res.userInfo)

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})
	},
	globalData: {
		userInfo: null,
		token: '',
		url: 'https://shop.dnote.cn/api/v1/'
	}
})
