const app = getApp()
import {
	request
} from '../../utils/request.js'
import {
	hexMD5
} from "../../utils/md5.js"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		steps: [{
				text: '步骤一',
				desc: '描述信息'
			},
			{
				text: '步骤二',
				desc: '描述信息'
			},
			{
				text: '步骤三',
				desc: '描述信息'
			},
			{
				text: '步骤四',
				desc: '描述信息'
			}
		],
		active: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		console.log('no', options.no)
		this.getExpressByNo(options.no)
	},

	getExpressByNo(no) {
		let sign =
			`{
					"com": "ems",
					"num": '2020020421121708890000000002',
					"phone": "18510776402",
					"from": "",
					"to": "",
					"key": "JRCNzuqW4304",
					"resultv2": "1",
					"show": "0",
					"order": "desc"
				}JRCNzuqW4304B456FD492309662075A901C1CC1BA3E9`
		console.log('sign', hexMD5(sign))
		wx.request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `https://poll.kuaidi100.com/poll/query.do`,
			method: 'POST',
			data: {
				"customer": "B456FD492309662075A901C1CC1BA3E9",
				"sign": hexMD5(sign),
				"param": {
					"com": "ems",
					"num": '2020020421121708890000000002',
					"phone": "18510776402",
					"from": "",
					"to": "",
					"key": "JRCNzuqW4304",
					"resultv2": "1",
					"show": "0",
					"order": "desc"
				}
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res.data)
			}
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
