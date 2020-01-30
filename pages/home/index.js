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
		background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
		indicatorDots: true,
		vertical: false,
		autoplay: true,
		interval: 2000,
		duration: 500,
		imgs: ['/images/4.jpg', '/images/5.jpg', '/images/3.jpg'],
		categoriesList: [],
		productsList: [],
		active: 0,
		id: 1,
		page: 1,
		pageSize: 100,
		more: true,
		act: 1,
		carouselList: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		if (!app.globalData.token) {
			app.checkLoginReadyCallback = res => {
				this.getCategories(); //获取商品分类信息
				this.getProducts(); //获取商品分类信息
				this.getCarousel();

			}
		} else {
			this.getCategories(); //获取商品分类信息
			this.getProducts(); //获取商品分类信息
			this.getCarousel();
		}


	},

	requestMsg() {
		wx.requestSubscribeMessage({
			tmplIds: ["niKn1Vl31P6Fs5682aUo24_qL-KG-niRALAY5nrh_xs"],
			success: (res) => {
				wx.showToast({
					title: '订阅OK！',
					duration: 1000,
					success(data) {}
				})
			}
		})
	},

	requestMsg2() {
		let token = wx.getStorageSync('token');
		let wxdata = {
			"touser": "wxb3312825df8bb955",
			"template_id": "niKn1Vl31P6Fs5682aUo24_qL-KG-niRALAY5nrh_xs",
			"page": "index",
			"data": {
				"thing1": {
					"value": "10斤苹果1件"
				},
				"thing2": {
					"value": "某省某市某街道某门牌号"
				},
				"phone_number3": {
					"value": "18888888888"
				},
				"date4": {
					"value": "2019-10-26 10:10:02"
				}
			}
		}
		// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=AppId&secret=AppSecret
		wx.request({
			url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + token,
			method: 'POST',
			data: wxdata,
			success: res => {
				console.log(res)
			}
		})
	},


	getCarousel() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'articles/carousel',
			data: {}
		}).then(res => {
			this.setData({
				carouselList: res.data.code
			})
			// if (res.data.code == 200) {
			// }
		});
	},


	tab(e) {
		let index = e.currentTarget.dataset.index;
		this.setData({
			act: index
		})
	},

	// tab切換
	onChange(event) {
		let id = event.detail.index + 1;
		this.setData({
			id,
			page: 1
		});
		this.getProducts();
	},


	getCategories() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'categories',
			data: {
				name: ''
			}
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					categoriesList: res.data.data.data
				})
			}
		});
	},



	getProducts() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'products',
			data: {
				page: this.data.page,
				per_page: this.data.pageSize,
				category_id: this.data.id
			}
		}).then(res => {
			if (res.data.code == 200) {
				let result = res.data.data;
				if (result.data.length) {
					this.setData({
						productsList: result.data,
						more: true
					})
				} else {
					this.setData({
						more: false,
						productsList: []
					})
				}
				wx.stopPullDownRefresh();
			}
		});
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
				url: 'products',
				data: {
					page: this.data.page + 1,
					per_page: this.data.pageSize,
					category_id: this.data.id
				}
			}).then(res => {
				if (res.data.code == 200) {
					let result = res.data.data;
					if (result.data.length) {
						this.setData({
							productsList: this.data.productsList.concat(result.data),
							page: result.current_page,
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
				title: '我到底啦，更多产品敬请期待～',
				icon: 'none'
			});
		}
	},


	toNews(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: `/pages/news/index?id=${id}`
		})
	},
	toDesc(e) {
		let uuid = e.currentTarget.dataset.uuid;
		wx.navigateTo({
			url: `/pages/details/index?uuid=${uuid}`
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
		wx.showLoading({
			title: '刷新中...',
		});
		this.getProducts();
	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})