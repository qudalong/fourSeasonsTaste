const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		detail: '',
		content:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let id=options.id;
		this.carouselById(id);
	},

	carouselById(id) {
		request({
token: app.globalData.token.prefix + app.globalData.token.token,
			url:`articles/carousel/${id}`,
			data: {}
		}).then(res => {
			res.data.code.content = res.data.code.content.replace(/\<table/g, '<table class="table"');
			res.data.code.content = res.data.code.content.replace(/\<img/g, '<img class="img"');
			res.data.code.content = res.data.code.content.replace(/\<p/g, '<p class="p"');
				this.setData({
					detail: res.data.code,
					content:this.data.content
				})
			// if (res.data.code == 200) {
			// }
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
	onShareAppMessage: function() {

	}
})
