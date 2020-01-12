// components/painter/tab/tab.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// type: {
		// 	type: Number,
		// 	value: 12
		// }
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		act: 1
	},
	// attached() {
	// 	let {
	// 		type
	// 	} = this.data;
	// 	console.log(typeof type)
	// 	console.log('type', type)
	// 	if (type == 1) {
	// 		wx.navigateTo({
	// 			url: `/pages/home/index`
	// 		});
	// 	} else if (type == 2) {
	// 		wx.navigateTo({
	// 			url: `/pages/shopCart/shopCart`
	// 		});
	// 	} else if (type == 3) {
	// 		wx.navigateTo({
	// 			url: `/pages/home/index`
	// 		});
	// 	}
	// },

	/**
	 * 组件的方法列表
	 */
	methods: {
		tab(e) {
			let index = e.currentTarget.dataset.index;
			this.setData({
				act: index
			})
			if (index == 1) {
				console.log(12)
				this.triggerEvent('tabs',{type:1});
			} else if (index == 2) {
				this.triggerEvent('tabs', {type:2});
			} else if (index == 3) {
				this.triggerEvent('tabs', {type:3});
			}
		}
	}
})
