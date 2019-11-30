import {
	savePicToAlbum,
	drawImage
} from '../../utils/util.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
		indicatorDots: true,
		vertical: false,
		autoplay: false,
		interval: 2000,
		duration: 500,
		imgs: ['/images/1.jpg', '/images/2.jpg', '/images/1.jpg', '/images/2.jpg'],
		index: 1,
		showPicker: false,
		hbDialog: false,
		pmWidth: 0

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let myCanvasWidth;
		let myCanvasHeight;
		wx.getSystemInfo({
			success: function(res) {
				myCanvasWidth = res.windowWidth-30
				myCanvasHeight = res.windowHeight - 200
			},
		})
		this.setData({
			canvasWidth: myCanvasWidth,
			canvasHeight: myCanvasHeight
		})

		drawImage('/images/3.jpg', '/images/xcx.jpg');
	},

	showHb() {
		this.setData({
			hbDialog: true
		});
	},


	close() {
		this.setData({
			hbDialog: false
		});
	},

	saveToAlbum() {
		savePicToAlbum();
	},

	showPicker() {
		this.setData({
			showPicker: true
		})
	},

	closePicker() {
		this.setData({
			showPicker: false
		})
	},

	toShopCart() {
		wx.switchTab({
			url: '/pages/shopCart/shopCart',
		})
	},
	orderSure() {
		wx.navigateTo({
			url: '/pages/order/index',
		})
	},
	tap(e) {
		this.setData({
			index: e.currentTarget.dataset.index
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
	onShareAppMessage: function() {}
})
