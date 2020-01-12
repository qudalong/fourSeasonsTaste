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
		cartList: [],
		more: true,
		showDel: false,
		editTxt: '编辑',
		result: [],
		totalMoney: 0,
		ckList: [],
		count: 0,
		cartList: [{
			content: '测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动,测试向左滑动',
		}],
		startX: 0, //开始坐标
		startY: 0,
		act: 2
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
	changeCount(e) {
		this.setData({
			count: e.detail
		});
		let id = e.currentTarget.dataset.id;
		console.log('id', id)
		this.data.cartList.forEach(item => {
			if (item.id == id) {
				console.log('item', item)
				item.number = this.data.count
				console.log('count', this.data.count)
				this.setData({
					cartList: this.data.cartList
				});
				console.log('cartList', this.data.cartList)
			}
		})
		// 计算总金额
		let itemMoney = 0;
		let moneyList = []
		let totalMoney = 0;
		this.data.cartList.forEach(item => {
			let price = parseFloat(item.product.price);
			let number = item.number;
			let itemMoney = price * number;
			moneyList.push(itemMoney)
			// console.log('price', price)
			// console.log('itemMoney', itemMoney)
		})
		// console.log('moneyList', moneyList)
		moneyList.forEach(item => {
			totalMoney += item
		})
		// console.log('totalMoney', totalMoney)
		this.setData({
			totalMoney: totalMoney * 100
		})
	},
	stepper(event) {
		this.setData({
			count: event.detail
		});
	},
	deleteAll() {
		Dialog.confirm({
			message: '确定要清空购物车吗?'
		}).then(() => {
			request({
token: app.globalData.token.prefix + app.globalData.token.token,
				url: `cart`,
				method: 'delete',
				data: {}
			}).then(res => {
				// if (res.data.code == 200) {
				// 去除删除的项
				this.setData({
					cartList: [],
					result: [],
					ckList: []
				})
				// this.getCart(); //更新
				// }
			});
		}).catch(() => {});
	},
	onChange(event) {
		let ckList = []
		let cartList = this.data.cartList;
		let target = event.detail;
		for (let i in cartList) {
			for (let j in target) {
				if (target[j] == cartList[i].id) {
					ckList.push(cartList[i])
				}
			}
		}
		this.setData({
			result: target,
			ckList
		});
		console.log('ckList', ckList)
		console.log('result', this.data.result)
		// 计算总金额
		let itemMoney = 0;
		let moneyList = []
		let totalMoney = 0;
		ckList.forEach(item => {
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
			totalMoney: totalMoney * 100
		})
	},

	//提交订单
	onClickButton() {
		if (this.data.ckList.length) {
			let cart = JSON.stringify(this.data.ckList);
			wx.navigateTo({
				url: `/pages/order/index?cart=${cart}`
			})
		} else {
			wx.showToast({
				title: '请您选择确定要购买的商品',
				icon: 'none'
			});
		}
	},


	onShow: function() {
		this.setData({
			showDel: false,
			editTxt: '编辑'
		})
		this.getCart();
	},

	edit() {
		if (this.data.editTxt == '完成') {
			this.setData({
				showDel: false,
				editTxt: '编辑'
			})
		} else {
			this.setData({
				showDel: true,
				editTxt: '完成'
			})
		}
	},





	//确定要删除该商品吗
	delOrder(e) {
		let id = e.currentTarget.dataset.id;
		console.log('id', id)
		Dialog.confirm({
			message: '确定要删除该商品吗?'
		}).then(() => {
			request({
token: app.globalData.token.prefix + app.globalData.token.token,
				url: `cart/${id}`,
				method: 'delete',
				data: {}
			}).then(res => {
				if (res.data.code == 200) {
					wx.showToast({
						title: '删除成功',
						icon: 'none'
					});
					// 去除删除的项
					let ind = this.data.result.findIndex(item => item == id);
					let ind2 = this.data.ckList.findIndex(item => item.id == id);
					this.data.result.splice(ind, 1);
					this.data.ckList.splice(ind2, 1);
					this.setData({
						result: this.data.result,
						ckList: this.data.ckList
					})
					console.log('result', this.data.result)
					console.log('ckList', this.data.ckList)
					this.getCart(); //更新
				}
			});
		}).catch(() => {});
	},

	// 获取购物车列表
	getCart() {
		request({
token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'cart',
			data: {}
		}).then(res => {
			if (res.data.code == 200) {
				wx.stopPullDownRefresh();
				let cartList = res.data.data.data
				this.setData({
					cartList
				});
				// 计算总金额
				let itemMoney = 0;
				let moneyList = []
				let totalMoney = 0;
				this.data.ckList.forEach(item => {
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
					totalMoney: totalMoney * 100
				})
			}
		});
	},


	// 
	//手指触摸动作开始 记录起点X坐标
	touchstart: function(e) {
		//开始触摸时 重置所有删除
		this.data.cartList.forEach(function(v, i) {
			if (v.isTouchMove) //只操作为true的
				v.isTouchMove = false;
		})
		this.setData({
			startX: e.changedTouches[0].clientX,
			startY: e.changedTouches[0].clientY,
			cartList: this.data.cartList
		})
	},
	//滑动事件处理
	touchmove: function(e) {
		var that = this,
			index = e.currentTarget.dataset.index, //当前索引
			startX = that.data.startX, //开始X坐标
			startY = that.data.startY, //开始Y坐标
			touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
			touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
			//获取滑动角度
			angle = that.angle({
				X: startX,
				Y: startY
			}, {
				X: touchMoveX,
				Y: touchMoveY
			});
		that.data.cartList.forEach(function(v, i) {
			v.isTouchMove = false
			//滑动超过30度角 return
			if (Math.abs(angle) > 30) return;
			if (i == index) {
				if (touchMoveX > startX) //右滑
					v.isTouchMove = false
				else //左滑
					v.isTouchMove = true
			}
		})
		//更新数据
		that.setData({
			cartList: that.data.cartList
		})
	},

	angle: function(start, end) {
		var dX = end.X - start.X,
			dY = end.Y - start.Y
		return 360 * Math.atan(dY / dX) / (2 * Math.PI);
	},
	//删除事件
	del: function(e) {
		this.data.cartList.splice(e.currentTarget.dataset.index, 1)
		this.setData({
			cartList: this.data.cartList
		})
	},
	onReachBottom: function() {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */


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
		this.getCart();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
