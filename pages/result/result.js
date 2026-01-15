const app = getApp()

Page({
  data: {
    analysis: {}
  },
  onLoad() {
    const tirs = app.globalData.tirsAnswers
    const rtdrs = app.globalData.rtdrsAnswers

    const tirsHigh = Object.keys(tirs).filter(k => tirs[k] >= 2)
    const rtdrsTop = Object.keys(rtdrs).reduce((a, b) =>
      rtdrs[a] > rtdrs[b] ? a : b
    )

    const maxReverse = Math.max(...Object.values(rtdrs))
    let status = '暂无明显结构性风险'

    if (tirsHigh.length >= 2 && maxReverse >= 2) {
      status = '呈现出高风险的消耗型关系特征'
    } else if (tirsHigh.length === 0 && maxReverse >= 2) {
      status = '关系中可能存在内在压力或边界议题'
    } else if (tirsHigh.length >= 1 && maxReverse <= 1) {
      status = '关系中存在潜在风险信号'
    }

    const analysis = { status, tirsHigh, rtdrsTop }
    app.globalData.analysis = analysis
    this.setData({ analysis })
  },
  goTips() {
    wx.navigateTo({ url: '/pages/tips/tips' })
  }
})
