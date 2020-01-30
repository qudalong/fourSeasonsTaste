const app = getApp()
import {
	request
} from '../../utils/request.js'
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		index: 1,
		list: [1, 1, 1, 1, 1, ],
		info: '',
		a: 0,
		b: 0,
		c: 0,
		click: false,
		up: false,
		hhr: false,
		aa:'普通用户'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let seller = wx.getStorageSync('seller');
		this.setData({
			seller
		});
		this.getProgress()
	},
	getProgress() {
		request({
token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'users/progress',
			data: {}
		}).then(res => {
			let data = res.data
			if (data.orders >= 15 && data.invitations >= 10 && data.deposit >= 199) {
				// if (data.orders >= 1) {
				this.setData({
					click: true,
					hhr: true
				})
			}
			this.setData({
				info: data,
				a: (data.orders / 15 * 100).toFixed(2),
				b: (data.invitations / 10 * 100).toFixed(2),
				c: (data.deposit / 199 * 100).toFixed(2)
			})
		});
	},
	bindUp() {
		Dialog.confirm({
			message: '确定要升级合伙人吗?'
		}).then(() => {
			this.setData({
				up: true,
				hhr: false
			})
		}).catch(() => {
			this.setData({
				up: false
			})
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
	onShareAppMessage: function() {

	}
})
