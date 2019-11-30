// pages/addressList/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [{
			name: '小明',
			tel: '18768871893',
			type: 1,
			address: '山东省济南市槐荫区经十路2323'
		}, {
			name: '小强',
			tel: '18768871894',
			type: 0,
			address: '河南省郑州市金水区经三路21号'
		}],
		activeIndex: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	// 获取当前位置
	getLocation() {
		let list = this.data.list;
		wx.chooseAddress({
			success: res => {
				let address = res.postalCode + res.provinceName + res.cityName + res.countyName + res.detailInfo;
				wx.setStorageSync('userName', res.userName);
				wx.setStorageSync('telNumber', res.telNumber);
				wx.setStorageSync('address', address);
				let hook = list.find(item => item.address == address); //地址去重
				if (!hook) {
					list.unshift({ // 添加地址
						name: res.userName,
						tel: res.telNumber,
						address: address,
						type: 0
					});
					this.setData({
						list
					})
					wx.setStorageSync('list', list);
				}

				wx.navigateBack({
					delta: 1 // 回退
				});
			}
		})
	},
	tap(e) {
		this.setData({
			activeIndex: e.currentTarget.dataset.index
		})
	},
	toEditAddress() {
		wx.navigateTo({
			url: '/pages/adressEdit/adressEdit'
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		let list = wx.getStorageSync('list');
		this.setData({
			list
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
