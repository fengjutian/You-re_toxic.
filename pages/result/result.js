const app = getApp()

Page({
  data:{
    analysis:{}
  },
  onLoad(){
    const tirs = app.globalData.tirsAnswers
    const rtdrs = app.globalData.rtdrsAnswers

    // 正向维度加权平均
    const tirsHigh = Object.keys(tirs).filter(dim => {
      const arr = tirs[dim]
      const avg = arr.reduce((a,b)=>a+b,0)/arr.length
      return avg>=2
    })

    // 反向维度最高
    let rtdrsTop = ''
    let maxVal = -1
    Object.keys(rtdrs).forEach(dim=>{
      const arr = rtdrs[dim]
      const val = Math.max(...arr)
      if(val>maxVal){
        maxVal = val
        rtdrsTop = dim
      }
    })

    let status = '暂无明显结构性风险'
    if(tirsHigh.length>=2 && maxVal>=2){
      status = '呈现出高风险的消耗型关系特征'
    }else if(tirsHigh.length===0 && maxVal>=2){
      status = '关系中可能存在内在压力或边界议题'
    }else if(tirsHigh.length>=1 && maxVal<=1){
      status = '关系中存在潜在风险信号'
    }

    const analysis = { status, tirsHigh, rtdrsTop }
    app.globalData.analysis = analysis
    this.setData({ analysis })
  },
  goTips(){
    wx.navigateTo({ url:'/pages/tips/tips' })
  }
})
