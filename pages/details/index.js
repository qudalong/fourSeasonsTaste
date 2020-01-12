import Card from './card';
const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
		indicatorDots: true,
		vertical: false,
		autoplay: false,
		interval: 2000,
		duration: 500,
		imgs: [],
		index: 1,
		showPicker: false,
		hbDialog: false,
		pmWidth: 0,
		productsDesc: '',
		count: 0,
		bigImg: '',
		template: '',
		number: 1,
		showType: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {


		// this.acode()
		if (options.uuid) { //uuid就是id
			let uuid = options.uuid;
			this.setData({
				uuid
			})
			this.getProductsDesc(uuid);
		}

		let scene = decodeURIComponent(options.scene); //获取二维码参数
		if (scene != 'undefined') {
			console.log('scene=', scene)
			let userid = scene.split('-')[0];
			let uuid = scene.split('-')[1];
			this.setData({
				uuid
			})

			//token
			if (!app.globalData.token) {
				app.checkLoginReadyCallback = res => {
					this.getProductsDesc(uuid);
					this.getBind(userid);
				}
			} else {
				this.getProductsDesc(uuid);
			}
		}

	},
	buy() {
		wx.navigateTo({
			url: '/pages/order/index?uuid=' + this.data.uuid
		})
	},
	//绑定上级
	getBind(id) {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'users/bind',
			method: 'POST',
			data: {
				id: id
			}
		}).then(res => {
			console.log('绑定结果', res)
		});
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

		});
	},


	closeType() {
		this.setData({
			showType: false
		});
	},
	onChange(event) {
		this.setData({
			number: event.detail
		});
	},
	// 获取购物车列表
	getCart() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'cart',
			data: {}
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					count: res.data.data.data.length
				});

			}
		});
	},
	onImgOK(e) {
		// 其中 e.detail.path 为生成的图片路径
		console.log('e', e);
		this.setData({
			image: e.detail.path
		})
	},
	saveImage() {
		wx.saveImageToPhotosAlbum({
			filePath: this.data.image
		});
	},

	//显示规格
	showFoodType() {
		this.setData({
			showType: true
		});
	},
	//加入购物车
	toShopCart() {
		this.setData({
			showType: false
		});
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'cart',
			method: 'POST',
			data: {
				number: this.data.number,
				product_id: this.data.productsDesc.uuid
			}
		}).then(res => {
			if (res.data.code == 200) {
				this.getCart();
			} else {
				wx.showToast({
					title: '添加失败，请重新添加',
					icon: 'none'
				});
			}
		});
	},

	showShopCart() {
		if (this.data.count) {
			wx.switchTab({
				url: '/pages/shopCart/shopCart',
			})
		} else {
			wx.showToast({
				title: '您还没有选择商品哦',
				icon: 'none'
			});
		}
	},

	onClickIcon() {
		wx.navigateTo({
			url: '/pages/kufu/kufu'
		})
	},

	//获取商品详情
	getProductsDesc(uuid) {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `products/${uuid}`,
			data: {}
		}).then(res => {
			if (res.data.code == 200) {
				res.data.data.content = res.data.data.content.replace(/\<table/g, '<table class="table"');
				res.data.data.content = res.data.data.content.replace(/\<img/g, '<img class="img"');
				res.data.data.content = res.data.data.content.replace(/\<p/g, '<p class="p"');
				this.setData({
					productsDesc: res.data.data
				});
				// wx.setStorageSync('productsDesc', res.data.data); // 缓存商品详情信息
			}
		});
	},

	showHb() {
		let food = this.data.productsDesc;
		let user = wx.getStorageSync('user');
		let scene = user.id + '-' + this.data.uuid
		console.log('scene', scene)
		this.setData({
			template: new Card().palette(food.thumb, food.title, food.price, food.original_price, scene),
			hbDialog: true
		});
	},

	close() {
		this.setData({
			hbDialog: false
		});
	},

	bindSaveToAlbum() {
		wx.previewImage({
			current: this.data.image,
			urls: [this.data.image]
		})
	},

	showPicker() {
		this.setData({
			showPicker: true
		})
	},

	closePicker() {
		this.setData({
			showPicker: false
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
		this.getCart();
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
	onShareAppMessage: function() {}
})
