// pages/home/index.js
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    index: 1,
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    imgs: ['/images/2.jpg', '/images/3.jpg', '/images/5.jpg', '/images/4.jpg'],
    list: [{
      img: '/images/2.jpg',
      title: '齐峰奇异果陕西眉县徐香绿心弥猴桃当季水果齐峰奇异果陕西眉县徐香绿心弥猴桃当季水果'
    }, {
      img: '/images/4.jpg',
      title: '齐峰奇异果陕西眉县徐香绿心弥猴桃当季水果齐峰奇异果陕西眉县徐香绿心弥猴桃当季水果%的珍贵植物油脂油酸'
    }, {
      img: '/images/6.jpg',
      title: '芒果是预防皱纹的最佳水果，因为含有丰富的B一胡萝卜素和独一无二的酶，能激发肌肤细胞活力'
    }, {
      img: '/images/5.jpg',
      title: '葡萄中所含有效成分能提高细胞新陈代谢率，帮助肺部细胞排毒。另外，葡萄还具有祛痰功效'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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