const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '心理测试 小程序',
      path: '/pages/index/index',
      imageUrl: '/assets/share.png'
    }
  },
  onShareTimeline() {
    return {
      title: '心理测试 小程序',
      imageUrl: '/assets/share.png'
    }
  },
  goForward() {
    wx.navigateTo({ url: '/pages/forward/forward' })
  },
  
  goReverse() {
    wx.navigateTo({ url: '/pages/reverse/reverse' })
  },

  goToGAD7() {
    wx.navigateTo({ url: '/pages/gad7/gad7' })
  },

  goToPHQ9() {
    wx.navigateTo({ url: '/pages/phq9/phq9' })
  },

  goToPSS14() {
    wx.navigateTo({ url: '/pages/pss14/pss14' })
  },

  goToEQ() {
    wx.navigateTo({ url: '/pages/eq/eq' })
  },

  goToMBTI() {
    wx.navigateTo({ url: '/pages/mbti/mbti' })
  },

  goToBigFive() {
    wx.navigateTo({ url: '/pages/bigfive/bigfive' })
  },

  goToDisc() {
    wx.navigateTo({ url: '/pages/disc/disc' })
  },

  goToRIASEC() {
    wx.navigateTo({ url: '/pages/riasec/riasec' })
  },

  goToPF16() {
    wx.navigateTo({ url: '/pages/pf16/pf16' })
  },

  goToWAIS() {
    wx.navigateTo({ url: '/pages/wais/wais' })
  },

  goToRaven() {
    wx.navigateTo({ url: '/pages/raven/raven' })
  },

  goToMI() {
    wx.navigateTo({ url: '/pages/mi/mi' })
  },

  goToPDQ() {
    wx.navigateTo({ url: '/pages/pdq/pdq' })
  },

  goToLove() {
    wx.navigateTo({ url: '/pages/love/love' })
  },

  goToSleep() {
    wx.navigateTo({ url: '/pages/sleep/sleep' })
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