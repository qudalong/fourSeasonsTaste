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
	onLoad: function(options) {
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

	acode() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `acode`,
			data: {
				is_hyaline: false, // 默认false,是否背景透明
				auto_color: false, // 是否自动设置颜色，默认false
				line_color: {
					r: 0,
					g: 0,
					b: 0
				}, // 我这里是默认值，如果自动颜色是false，此此段必传
				width: 430, // 280-1280,默认430
				page: "pages/details/index", // 默认主页，从根目录到页面的路径
				scene: "aGVsbG93b3JsZA==", // 业务参数，默认为空
			}
		}).then(res => {
			this.setData({
				codeUrl: res.data
			})
			// console.log(res)
			if (res.data.code == 200) {

			}
		});
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
	onReachBottom: function() {
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
		wx.showLoading({
			title: '刷新中...',
		});
		this.getProducts();
	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
