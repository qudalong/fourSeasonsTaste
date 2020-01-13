const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		incomes: '',
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		act: 3
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let seller = wx.getStorageSync('seller');
		this.setData({
			seller
		});
		this.income();
		this.brokerages();

	},
	onGotUserInfo(e) {
		if (e.detail.userInfo != null) {
			let userInfo = e.detail.userInfo;
			console.log('userInfo', e.detail.userInfo)
			request({
				token: app.globalData.token.prefix + app.globalData.token.token,
				url:'users',
				method:'put',
				data:{
					nickname:userInfo.nickName,
					avatar: userInfo.avatarUrl,
					gender: userInfo.gender,
					country: userInfo.country,
					province: userInfo.province,
					city: userInfo.city
			}			
			}).then(res => {
				if (res.data.code == 200) {
					this.toCenter()
				}
			});
		}
	},

	tab(e) {
		let index = e.currentTarget.dataset.index;
		this.setData({
			act: index
		})
		if (index == 1) {
			wx.navigateTo({
				url: `/pages/home/index`
			});
		} else if (index == 2) {
			wx.navigateTo({
				url: `/pages/shopCart/shopCart`
			});
		} else if (index == 3) {
			wx.navigateTo({
				url: `/pages/my/my`
			});
		}
	},
	//订单列表
	getOrdersList(status) {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `orders`,
			data: {
				per_page: 10, // 默认10
				page: 1, // 默认1
				status: status // 默认1,取值 0所有 1待付款 2 待发货 3待收货 4已完成
			}
		}).then(res => {
			if (res.data.code == 200) {
				let data = res.data.data;
				if (data.data.length) {
					if (status == 1) {
						this.setData({
							a: data.data.length
						})
					} else if (status == 2) {
						this.setData({
							b: data.data.length
						})
					} else if (status == 3) {
						this.setData({
							c: data.data.length
						})
					} else if (status == 4) {
						this.setData({
							d: data.data.length
						})
					}
				}
			}
		});
	},
	//获取佣金明细
	brokerages() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `users/brokerages`,
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					brokerages: res.data.data
				});
				console.log('brokerages', this.data.brokerages)
			}
		});
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





	toCenter() {
		wx.navigateTo({
			url: `/pages/distributionCenter/distributionCenter`
		})
	},
	toOrderList(e) {
		let index = e.currentTarget.dataset.index;
		wx.navigateTo({
			url: `/pages/orderStatus/orderStatus?index=${index}`
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
		this.getOrdersList(1);
		this.getOrdersList(2);
		this.getOrdersList(3);
		this.getOrdersList(4);
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