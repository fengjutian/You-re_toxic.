const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '你有毒啊 小程序',
      path: '/pages/index/index',
      imageUrl: '/assets/share.png'
    }
  },
  onShareTimeline() {
    return {
      title: '你有毒啊 小程序',
      imageUrl: '/assets/share.png'
    }
  },
  goForward() {
    wx.navigateTo({ url: '/pages/forward/forward' })
  },
  
  goReverse() {
    wx.navigateTo({ url: '/pages/reverse/reverse' })
  },
  
  /**
   * 清除所有评估数据
   * 将全局数据中的tirsAnswers、rtdrsAnswers和analysis重置为空
   */
  clearData() {
    // 清空全局数据
    app.globalData.tirsAnswers = {};
    app.globalData.rtdrsAnswers = {};
    app.globalData.analysis = null;
    
    // 显示操作成功提示
    wx.showToast({
      title: '数据已清除',
      icon: 'success',
      duration: 2000
    });
  }
})