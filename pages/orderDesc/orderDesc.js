import {
	savePicToAlbum,
	drawImage
} from '../../utils/util.js'
const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		desc: '',
		productDesc: {
			img: '/images/5.jpg'
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let id = options.id; //订单id

		console.log('id', id)
		this.ordersDesc(id);
	},

	//订单详情
	ordersDesc(id) {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `orders/${id}`,
			data: {}
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					desc: res.data.data
				})
			}
		});
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
