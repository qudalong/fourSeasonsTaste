const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		addressList: [],
		activeIndex: 0,
		defaultAddress: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// this.getAddresses();
		let wxAddress = wx.getStorageSync('defaultAddress')
		if (wxAddress) {
			this.data.addressList.push(wxAddress)
			this.setData({
				wxAddress,
				addressList: this.data.addressList
			});
		}
	},
	onShow: function() {
		let list = wx.getStorageSync('list');
		this.setData({
			list
		});
		this.getAddresses();
	},


	tap(e) {
		let item = e.currentTarget.dataset.item
		let id = e.currentTarget.dataset.id
		wx.setStorageSync('defaultAddress', item)
		request({
			token: app.globalData.token.prefix + app.globalData.token.token,
			url: `addresses/${id}`,
			method: 'put',
			data: {
				name: item.name,
				phone: item.phone,
				province: item.province,
				city: item.city,
				area: item.area || 'null',
				detail_address: item.detail_address,
				is_default: 1
			}
		}).then(res => {
			if (res.data.code == 200) {
				wx.navigateBack({
					delta: 1
				});
			}
		});

		// wx.navigateBack({
		// 	delta: 1
		// });
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
					addressList: result
				});
				// 地址栏复制默认地址
			}
		});
	},
	// 获取当前位置
	getLocation() {
		let list = this.data.list;
		wx.chooseAddress({
			success: res => {
				let address = res.postalCode + res.provinceName + res.cityName + res.countyName + res.detailInfo;
				wx.setStorageSync('userName', res.userName);
				wx.setStorageSync('telNumber', res.telNumber);
				wx.setStorageSync('address', address);
				let hook = list.find(item => item.address == address); //地址去重
				if (!hook) {
					list.unshift({ // 添加地址
						name: res.userName,
						tel: res.telNumber,
						address: address,
						type: 0
					});
					this.setData({
						list
					})
					wx.setStorageSync('list', list);
				}

				wx.navigateBack({
					delta: 1 // 回退
				});
			}
		})
	},

	toEditAddress(e) {
		let item = JSON.stringify(e.currentTarget.dataset.item);
		wx.navigateTo({
			url: `/pages/adressEdit/adressEdit?item=${item}`
		})
	},
	toAddAddress() {
		wx.navigateTo({
			url: `/pages/adressEdit/adressEdit`
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
