// pages/tixian/tixian.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		click: false,
		money: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let seller = wx.getStorageSync('seller');
		this.setData({
			seller
		});
	},
	qianqian(e) {
		let click = this.data.click
		let val = e.detail.value
		val ? click = true : click = false
		this.setData({
			money: val,
			click
		})
	},

	bindTixian() {
		console.log('提现')
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
