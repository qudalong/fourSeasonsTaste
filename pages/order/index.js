// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    count: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  add() {
    let count = this.data.count;
    count++;
    this.setData({
      count
    });
  },
  minus() {
    let count = this.data.count;
    if (count < 1) {
      return
    }
    count--;
    this.setData({
      count
    });
  },
  // 获取当前位置
  getLocation() {
    wx.chooseAddress({
      success: res => {
        let address = res.postalCode + res.provinceName + res.cityName + res.countyName + res.detailInfo;
        wx.setStorageSync('userName', res.userName);
        wx.setStorageSync('telNumber', res.telNumber);
        wx.setStorageSync('address', address);
        // 添加地址
        this.data.list.push({
          name: res.userName,
          tel: res.telNumber,
          address: address,
          type: 0
        });
        this.setData({
          list: this.data.list
        })
        wx.setStorageSync('list', this.data.list);
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getLocalAddress();
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