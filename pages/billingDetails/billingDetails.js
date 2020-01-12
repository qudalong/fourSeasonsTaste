const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		index: 1,
		list: [1, 1, 1, 1, 1]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		if (options.index) {
			this.setData({
				index: options.index
			});
		}
		this.brokerages(1);
	},

	brokerages(status) {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'users/brokerages?status=' + status,
			data: {}
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					yjList: res.data.data.data
				})
			}
		});
	},



	tap(e) {
		this.setData({
			index: e.currentTarget.dataset.index
		})
		this.brokerages(this.data.index);
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
