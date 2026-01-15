Page({
  goForward() {
    wx.navigateTo({ url: '/pages/forward/forward' })
  },
  goReverse() {
    wx.navigateTo({ url: '/pages/reverse/reverse' })
  }
})