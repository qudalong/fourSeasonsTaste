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
		list: [1, 1, 1, 1, 1],
    tablist: ['直属合伙人', '直属客户', '间接合伙人', '间接客户'],
    active: 0,
		itemList:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		if (options.index) {
			this.setData({
        active: options.index-1
			});
		}
		this.partners();
	},
	//获取我的所有团队成员
	partners() {
		request({
token: app.globalData.token.prefix + app.globalData.token.token,
			url: `users/partners`,
			data: {
				status: this.data.active //0直属合伙人，1直属用户，2间接合伙人，3间接用户
			}
		}).then(res => {
				this.setData({
					itemList: res.data.code.data
				});
		});
	},

	
	onChange(event) {
		let active = event.detail.index;
		this.setData({
		active
		});
		this.partners();
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
