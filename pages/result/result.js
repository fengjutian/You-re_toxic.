const app = getApp()

// 维度名称映射
const dimNames = {
  'control': '控制行为',
  'devalue': '情感贬低',
  'selfish': '自我中心',
  'emotional': '情绪依赖',
  'manipulation': '操纵行为',
  'distrust': '不信任',
  'emotional_drain': '情绪消耗',
  'self_doubt': '自我怀疑',
  'boundary_erosion': '边界侵蚀',
  'guilt_pressure': '内疚施压',
  'avoidance': '回避沟通',
  'imbalance': '付出失衡'
}

Page({
  data:{
    analysis:{
      status: '暂无明显结构性风险',
      tirsHigh: [],
      rtdrsTop: ''
    }
  },
  onLoad(){
    // Debug the incoming data
    console.log('Global Data:', app.globalData);
    console.log('TIRS Answers:', app.globalData.tirsAnswers);
    console.log('RTDRS Answers:', app.globalData.rtdrsAnswers);
    const tirs = app.globalData.tirsAnswers || {}
    const rtdrs = app.globalData.rtdrsAnswers || {}

    // 正向维度加权平均
    console.log('Processing TIRS Answers:', tirs);
    const tirsHigh = [];
    
    Object.keys(tirs).forEach(dim => {
      const arr = tirs[dim] || [];
      console.log(`Dimension ${dim}: Answers = [${arr.join(', ')}]`);
      
      if (arr.length === 0) return;
      
      const avg = arr.reduce((a,b)=>a+b,0)/arr.length;
      console.log(`Dimension ${dim}: Average = ${avg}`);
      
      if (avg >= 2) {
        const dimName = dimNames[dim] || dim;
        console.log(`Adding high-risk dimension: ${dimName}`);
        tirsHigh.push(dimName);
      }
    });
    
    console.log('Final tirsHigh:', tirsHigh);

    // 反向维度最高
    let rtdrsTop = ''
    let maxVal = -1
    Object.keys(rtdrs).forEach(dim=>{
      const arr = rtdrs[dim] || []
      if (arr.length === 0) return
      
      const val = Math.max(...arr)
      if(val > maxVal){
        maxVal = val
        rtdrsTop = dimNames[dim] || dim  // 使用友好的维度名称
      }
    })

    let status = '暂无明显结构性风险'
    if(tirsHigh.length >= 2 && maxVal >= 2){
      status = '呈现出高风险的消耗型关系特征'
    }else if(tirsHigh.length === 0 && maxVal >= 2){
      status = '关系中可能存在内在压力或边界议题'
    }else if(tirsHigh.length >= 1 && maxVal <= 1){
      status = '关系中存在潜在风险信号'
    }

    // Add fallback for tirsHigh if empty
    const safeTirsHigh = tirsHigh.length > 0 ? tirsHigh : ['未发现明显高风险维度'];
    
    const analysis = { status, tirsHigh: safeTirsHigh, rtdrsTop }
    app.globalData.analysis = analysis
    this.setData({ analysis })
  },
  goTips(){
    wx.navigateTo({ url:'/pages/tips/tips' })
  }
})
