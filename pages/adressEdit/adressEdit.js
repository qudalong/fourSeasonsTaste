const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name: '',
		tel: '',
		address: [],
		addressDes: '',
		isDefault: false,
		id: '',
		itemDesc: '',
		province: '',
		area: '',
		city: '',
		flag: 'add'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		let Jitem = options.item
		if (Jitem) {
			let jsonItem = JSON.parse(Jitem);
			if (jsonItem.is_default) { //还原是否默认地址状态
				this.setData({
					isDefault: 1
				});
			} else {
				this.setData({
					isDefault: 0
				});
			}
			this.setData({
				flag: 'edit',
				itemDesc: jsonItem,
				id: jsonItem.id,
				province: jsonItem.province || '',
				city: jsonItem.city || '',
				area: jsonItem.area || '',

				name: jsonItem.name,
				tel: jsonItem.phone,
				address: jsonItem.province + jsonItem.city + jsonItem.area,
				addressDes: jsonItem.detail_address,
				isDefault: jsonItem.is_default
			});
		}
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
					
					request({
token: app.globalData.token.prefix + app.globalData.token.token,
						url: 'addresses',
						method: 'POST',
						data: {
							name:  res.userName,
							phone: res.telNumber,
							province: res.provinceName,
							city: res.cityName,
							area:  res.countyName,
							detail_address:res.countyName,
							is_default: 1
						}
					}).then(res => {
						if (res.data.code == 200) {
							wx.showToast({
								title: '添加成功'
							});
							wx.navigateBack({
								delta: 2
							});
							// wx.navigateTo({
							// 	url: `/pages/addressList/index`
							// });
						}
					});
					
					
				}
			})
		},

	addressFlag() {
		if (this.data.flag == 'add') {
			this.addAddress();
		} else {
			this.editAddress();
		}
	},


	//添加
	addAddress() {
		let {
			name,
			tel,
			address,
			addressDes,
			isDefault
		} = this.data;
		if (!name.trim()) {
			wx.showToast({
				title: '请输入收货人姓名',
				icon: 'none'
			});
			return
		} else if (!tel.trim()) {
			wx.showToast({
				title: '请输入收货人手机号',
				icon: 'none'
			});
			return
		} else if (!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(tel)) {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			});
			return
		} else if (!address.length) {
			wx.showToast({
				title: '请选择所在地',
				icon: 'none'
			});
			return
		} else if (!addressDes.trim()) {
			wx.showToast({
				title: '请输入详细地址',
				icon: 'none'
			});
			return
		}
		let isdefault;
		if (this.data.isDefault) {
			isdefault = 1
		} else {
			isdefault = 0
		}
		request({
token: app.globalData.token.prefix + app.globalData.token.token,
			url: 'addresses',
			method: 'POST',
			data: {
				name: name,
				phone: tel,
				province: address[0],
				city: address[1],
				area: address[2],
				detail_address: addressDes,
				is_default: isdefault
			}
		}).then(res => {
			if (res.data.code == 200) {
				this.setData({
					id: res.data.data.id
				})
				wx.showToast({
					title: '添加成功'
				});
				wx.navigateBack({
					delta: 2
				});
				// wx.navigateTo({
				// 	url: `/pages/order/index`
				// });
			}
		});
	},

	//删除
	delAddress() {
		request({
token: app.globalData.token.prefix + app.globalData.token.token,
			url: `addresses/${this.data.id}`,
			method: 'delete',
			data: {}
		}).then(res => {
			if (res.data.code == 200) {
				wx.showToast({
					title: '删除成功'
				});
				wx.navigateBack({
					delta: 1
				});
			}
		});
	},

	//修改
	editAddress() {
		let {
			name,
			tel,
			address,
			addressDes,
			isDefault
		} = this.data;
		if (!name.trim()) {
			wx.showToast({
				title: '请输入收货人姓名',
				icon: 'none'
			});
			return
		} else if (!tel.trim()) {
			wx.showToast({
				title: '请输入收货人手机号',
				icon: 'none'
			});
			return
		} else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(tel)) {
			wx.showToast({
				title: '请输入正确的手机号',
				icon: 'none'
			});
			return
		} else if (!address.length) {
			wx.showToast({
				title: '请选择所在地',
				icon: 'none'
			});
			return
		} else if (!addressDes.trim()) {
			wx.showToast({
				title: '请输入详细地址',
				icon: 'none'
			});
			return
		}
		let isdefault;
		if (this.data.isDefault) {
			isdefault = 1
		} else {
			isdefault = 0
		}
		request({
token: app.globalData.token.prefix + app.globalData.token.token,
			url: `addresses/${this.data.id}`,
			method: 'put',
			data: {
				name: name,
				phone: tel,
				province: address[0],
				city: address[1],
				area: address[2],
				detail_address: addressDes,
				is_default: isdefault
			}
		}).then(res => {
			if (res.data.code == 200) {
				wx.showToast({
					title: '修改成功'
				});
				wx.navigateBack({
					delta: 1
				});
			}
		});
	},
	bname(e) {
		this.setData({
			name: e.detail.value
		})
	},
	btel(e) {
		this.setData({
			tel: e.detail.value
		})
	},
	baddressDes(e) {
		this.setData({
			addressDes: e.detail.value
		})
	},
	onChange({
		detail
	}) {
		this.setData({
			isDefault: detail
		});
	},
	bindRegionChange: function(e) {
		this.setData({
			address: e.detail.value
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
