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
		partners: [],
		incomes: '',
		seller: '',
		list: [1, 1, 1, 1],
		click: false,
		yjList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let seller = wx.getStorageSync('seller');
		let click = this.data.click;
		seller.balance > 0 ? click = true : click = false
		this.setData({
			seller,
			click
		});
		this.partnersData();
		this.income();
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


	tixian() {
		// wx.navigateTo({
		// 	url: '/pages/tixian/tixian'
		// });
		Dialog.confirm({
			message: '提现功能正在紧锣密鼓地开发,现在可添加客服微信「jiaxing470021508」进行提现申请'
		}).then(() => {
		}).catch(() => {});
	},
	//获取收益统计
	income() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `users/income`,
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					incomes: res.data.data
				});
				console.log('incomes', this.data.incomes)
			}
		});
	},
	//获取我的所有团队成员
	partnersData() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `users/partnersData`,
			data: {}
		}).then(res => {
			this.setData({
				partners: res.data.data
			});
		});
	},
	toVip() {
		wx.navigateTo({
			url: '/pages/vip/vip'
		})
	},
	toBilling() {
		wx.navigateTo({
			url: '/pages/billingDetails/billingDetails'
		})
	},
	toMyteam() {
		wx.navigateTo({
			url: '/pages/toMyteam/toMyteam'
		})
	},
	toItem(e) {
		let index = e.currentTarget.dataset.index;
		wx.navigateTo({
			url: `/pages/toMyteam/toMyteam?index=${index}`
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})