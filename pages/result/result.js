const app = getApp()
Page({
  data: { result: {} },
  onLoad() {
    const tirs = app.globalData.tirsAnswers
    const rtdrs = app.globalData.rtdrsAnswers
    const highTirs = Object.values(tirs).filter(v => v >= 2).length
    const maxR = Math.max(...Object.values(rtdrs))
    let status = '暂无明显结构性风险'
    if (highTirs >= 2 && maxR >= 2) status = '高风险消耗关系'
    else if (highTirs === 0 && maxR >= 2) status = '内在压力或边界问题'
    else if (highTirs >= 1 && maxR <= 1) status = '潜在风险关系'
    this.setData({ result: { status } })
    app.globalData.result = { status }
  },
  goTips() {
    wx.navigateTo({ url: '/pages/tips/tips' })
  }
})
