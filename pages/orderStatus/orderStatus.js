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
		orderList: [],
		productDesc: {
			img: '/images/5.jpg'
		},
		tablist: ['全部', '待付款', '待发货', '已发货', '已完成'],
		active: 0,
		more: true,
		page: 1,
		pageSize: 10,
		showTk: false,
		message: '',
		no: '',
		disable:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (options.index) {
			this.setData({
				active: options.index - 1
			});
		}
		this.getOrdersList();
	},

	wuliu(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: `/pages/wuliu/wuliu?id=${id}`
		})
	},
	toDesc(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: `/pages/orderDesc/orderDesc?id=${id}`
		})
	},
	getUserInfo(event) {
		console.log(event.detail);
	},

	onClose() {
		this.setData({
			showTk: false
		});
	},

	// //退款弹窗
	// tuikuan(e) {
	// 	let no = e.currentTarget.dataset.id;
	// 	this.setData({
	// 		showTk: true,
	// 		no
	// 	})
	// },
	//确定退款
	// sure() {
	// 	request({
	// token: app.globalData.token.prefix + app.globalData.token.token,
	// 		url: `/orders/${this.data.no}/refund`,
	// 		method: 'put',
	// 		data: {
	// 			reason: this.data.message
	// 		},
	// 	}).then(res => {
	// 		this.setData({
	// 			showTk: false
	// 		})
	// 	});
	// },

	//订单列表
	getOrdersList() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `orders`,
			data: {
				per_page: this.data.pageSize, // 默认10
				page: this.data.page, // 默认1
				status: this.data.active // 默认1,取值 0所有 1待付款 2 待发货 3待收货 4已完成
			}
		}).then(res => {
			if (res.data.code == 200) {
				let data = res.data.data;
				if (data.data.length) {
					this.setData({
						orderList: data.data
					})
				} else {
					this.setData({
						orderList: []
					})
				}
				wx.stopPullDownRefresh();
			}
		});
	},

	//支付指定订单
	payTargetOrder(e) {
		this.setData({
			disable:true
		});
		let id = e.currentTarget.dataset.id;
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `orders/${id}/pay`,
			method: 'put',
			data: {}
		}).then(res => {
			this.setData({
				disable:false
			});
			let temp = res;
			if (res.data.code == 200) {
				let pay = res.data.data;
				wx.requestPayment({
					timeStamp: pay.timeStamp,
					nonceStr: pay.nonceStr,
					package: pay.package,
					signType: pay.signType,
					paySign: pay.paySign,
					success(res) {
						wx.showToast({
							title: '支付成功'
						});
						wx.navigateTo({
							url: `/pages/orderDesc/orderDesc?id=${id}`
						})
					},
					fail(res) {
						wx.showToast({
							// title: temp.data.data.original.msg,
							title: '支付不成功',
							icon: 'none'
						});
					}
				})
			}
		});
	},

	//删除订单
	delOrder(e) {
		let id = e.currentTarget.dataset.id;
		Dialog.confirm({
			message: '确定要删除该订单吗?'
		}).then(() => {
			request({
				token: app.globalData.token.prefix + app.globalData.token.token,
				url: `orders/${id}`,
				method: 'delete',
				data: {}
			}).then(res => {
				if (res.data.code == 200) {
					wx.showToast({
						title: '删除成功',
						icon: 'none'
					});
					this.getOrdersList(); //更新订单
				}
			});
		}).catch(() => {});
	},

	onChange(event) {
		console.log(event)
		let status = event.detail.index
		this.setData({
			active: status
		});
		this.getOrdersList(status);
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
		wx.showLoading({
			title: '刷新中...',
		});
		this.getOrdersList(this.data.active);
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		if (this.data.more) {
			wx.showLoading({
				title: '加载更多...'
			});
			request({
				token: app.globalData.token.prefix + app.globalData.token.token,
				url: 'orders',
				data: {
					page: this.data.page + 1, // 默认1
					per_page: this.data.pageSize, // 默认10
					status: this.data.active // 默认1,取值 0所有 1待付款 2 待发货 3待收货 4已完成
				}
			}).then(res => {
				if (res.data.code == 200) {
					let data = res.data.data;
					if (data.data.length) {
						this.setData({
							orderList: this.data.orderList.concat(data.data),
							page: data.current_page,
							more: true
						})
					} else {
						this.setData({
							more: false
						})
					}
				}
			})
		} else {
			wx.showToast({
				title: '没有更多数据',
				icon: 'none'
			});
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})