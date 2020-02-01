const app = getApp()
import {
	request
} from '../../utils/request.js'
import {
	formatTime
} from '../../utils/util.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: [],
		count: 1,
		id: 0,
		productsDesc: '',
		defaultAddress: '',
		uuid: '',
		totalMoney: 0,
		checked: true,
		disable: false,
		cartList: [], //
		maxcount: 0,
		addFlag: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let uuid = options.uuid;
		let cart = options.cart; //购物车商品
		if (cart) {
			this.setData({
				cartList: JSON.parse(cart)
			})
			console.log('cartList', this.data.cartList)
			// 计算总金额
			let itemMoney = 0;
			let moneyList = []
			let totalMoney = 0;
			this.data.cartList.forEach(item => {
				let price = parseFloat(item.product.price);
				let number = item.number;
				let itemMoney = price * number;
				moneyList.push(itemMoney)
				console.log('price', price)
				console.log('itemMoney', itemMoney)
			})
			console.log('moneyList', moneyList)
			moneyList.forEach(item => {
				totalMoney += item
			})
			console.log('totalMoney', totalMoney)
			this.setData({
				totalMoney: totalMoney * 100,
				cartList: this.data.cartList
			})
		}
		if (uuid) {
			this.setData({
				uuid
			})
			this.getProductsDesc();
			console.log('uuid', this.data.uuid)
		}

	},

	add(e) {
		// let id = e.currentTarget.dataset.id;
		// let item=this.data.cartList.find(item=>item.id==id)
		// let maxcount=this.data.cartList.find(item=>item.id==id).maxcount
		// let number=this.data.cartList.find(item=>item.id==id).number
		// if(number>=maxcount){
		// 	item.number=maxcount
		// 	this.setData({
		// 		cartList:this.data.cartList
		// 	})
		// }
		// console.log('item',item)
		// console.log('number',number)
		// console.log('maxcount',maxcount)
	},

	//查询
	getAddresses() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'addresses',
			data: {}
		}).then(res => {
			console.log(res);
			if (res.data.code == 200) {
				let result = res.data.data.data;
				let defaultAddress = result.find(item => item.is_default == 1);
				wx.setStorageSync('defaultAddress', defaultAddress);
				this.setData({
					addressList: result,
					defaultAddress,
					id: defaultAddress.id
				});
				// 地址栏复制默认地址
			}
		});
	},
	//获取商品详情
	getProductsDesc() {
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `products/${this.data.uuid}`,
			data: {}
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					productsDesc: res.data.data
				});
			}
		});
	},

	onShow: function () {
		let defaultAddress = wx.getStorageSync('defaultAddress');
		this.setData({
			defaultAddress
		});
		this.getLocalAddress();
		this.getAddresses();
	},

	//提交列表	
	orders() {
		let that = this;
		if (!this.data.defaultAddress) {
			wx.showToast({
				title: '请先选择收货地址',
				icon: 'none'
			});
			return
		}
		this.setData({
			disable: true
		});
		let parm = [];
		if (this.data.cartList.length) {
			this.data.cartList.forEach(item => {
				parm.push({
					uuid: item.product.uuid,
					number: item.number
				})
			})
			console.log('parm', parm)
		} else {
			let uuid = this.data.productsDesc.uuid;
			let count = this.data.count;
			console.log('uuid', uuid)
			console.log('count', count)
			parm = [{
				uuid: uuid,
				number: count
			}]
		}
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `orders`,
			method: 'POST',
			data: {
				products: parm,
				address_id: that.data.id
			}
		}).then(res => {
			this.setData({
				disable: false
			});
			if (res.data.code == 200) {
				let pay = res.data.data.pay;
				wx.requestPayment({
					timeStamp: pay.timeStamp,
					nonceStr: pay.nonceStr,
					package: pay.package,
					signType: pay.signType,
					paySign: pay.paySign,
					success(res) {
						that.requestMsg();
						wx.navigateTo({
							url: `/pages/pay/paySuccess/index`
						})
					},
					fail(res) {
						wx.showToast({
							title: '支付不成功',
							icon: 'none'
						});
					}
				})
			}
		});
	},
	requestMsg() {
		let that = this;
		wx.requestSubscribeMessage({
			tmplIds: ["niKn1Vl31P6Fs5682aUo24_qL-KG-niRALAY5nrh_xs"],
			success: (res) => {
				if (res['niKn1Vl31P6Fs5682aUo24_qL-KG-niRALAY5nrh_xs'] == 'accept') {
					that.msgSent()
				}
			}
		})
	},

	msgSent() {
		let foodName = ''
		if (this.data.cartList.length) {
			this.data.cartList.forEach(item => {
				foodName += item.product.title + ', '
			})
		} else {
			foodName = this.data.productsDesc.title
		}

		let defaultAddress = this.data.defaultAddress;
		let access_token = wx.getStorageSync('access_token');
		let userOpenid = wx.getStorageSync('userOpenid');
		let wxdata = {
			"touser": userOpenid,
			"template_id": "niKn1Vl31P6Fs5682aUo24_qL-KG-niRALAY5nrh_xs",
			"page": "pages/orderStatus/orderStatus?index=3&home=1",
			"data": {
				"thing1": {
					"value": foodName
				},
				"thing2": {
					"value": defaultAddress.province + defaultAddress.city + defaultAddress.area
				},
				"phone_number3": {
					"value": defaultAddress.phone
				},
				"date4": {
					"value": formatTime(new Date)
				}
			}
		}
		wx.request({
			url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + access_token,
			method: 'POST',
			data: wxdata,
			success: res => {
				wx.showToast({
					title: '订阅成功',
					duration: 1000,
					success() {}
				})
			}
		})
	},





	hook(e) {
		let maxcount = e.currentTarget.dataset.maxcount;
		console.log('maxcount_hook', maxcount)
		this.setData({
			maxcount
		})
	},
	onChange(event) {
		this.setData({
			count: event.detail
		});
	},
	changeCount(e) {
		let id = e.currentTarget.dataset.id;
		let maxcount = e.currentTarget.dataset.maxcount;


		console.log('maxcount', maxcount)
		this.data.cartList.forEach(item => {
			if (item.id == id) {
				item.number = this.data.count
				item.maxcount = maxcount
				this.setData({
					cartList: this.data.cartList
				});
			}
		})
		// 庫存判斷
		let item = this.data.cartList.find(item => item.id == id)
		let maxcount1 = this.data.cartList.find(item => item.id == id).maxcount
		let number = this.data.cartList.find(item => item.id == id).number
		if (number >= maxcount1) {
			item.number = maxcount1
			this.setData({
				cartList: this.data.cartList
			})
		}
		// 计算总金额
		let itemMoney = 0;
		let moneyList = []
		let totalMoney = 0;
		this.data.cartList.forEach(item => {
			let price = parseFloat(item.product.price);
			let number = item.number;
			let itemMoney = price * number;
			moneyList.push(itemMoney)
		})
		moneyList.forEach(item => {
			totalMoney += item
		})
		this.setData({
			totalMoney: totalMoney * 100
		})


	},


	// 获取当前位置
	getLocation() {
		wx.chooseAddress({
			success: res => {
				let address = res.postalCode + res.provinceName + res.cityName + res.countyName + res.detailInfo;
				// wx.setStorageSync('userName', res.userName);
				// wx.setStorageSync('telNumber', res.telNumber);
				// wx.setStorageSync('address', address);
				// 添加地址
				this.data.list = {
					name: res.userName,
					phone: res.telNumber,
					province: res.provinceName,
					city: res.cityName,
					area: res.countyName,
					type: 0
				};
				this.setData({
					defaultAddress: this.data.list
				})
				wx.setStorageSync('defaultAddress', this.data.list);
			}
		})
	},
	getLocalAddress() {
		let userName = wx.getStorageSync('userName');
		let telNumber = wx.getStorageSync('telNumber');
		let address = wx.getStorageSync('address');
		this.setData({
			userName,
			telNumber,
			address
		})
	},
	toAddress() {
		wx.navigateTo({
			url: '/pages/addressList/index'
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