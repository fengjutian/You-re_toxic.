const app = getApp()

const tipsMap = {
  control:'尝试明确表达个人决策空间。',
  devalue:'关注自身感受的合理性。',
  selfish:'评估关系中的互惠程度。',
  emotional:'为情绪恢复预留空间。',
  manipulation:'留意暗示性压力来源。',
  distrust:'确认信任边界是否被尊重。',
  emotional_drain:'优先安排情绪修复时间。',
  self_doubt:'记录事实以校准自我判断。',
  boundary_erosion:'重新确认个人界限。',
  guilt_pressure:'区分责任与过度内疚。',
  avoidance:'逐步恢复安全表达。',
  imbalance:'审视付出与回报结构。'
}

Page({
  data:{
    tips:[]
  },
  onLoad(){
    const analysis = app.globalData.analysis
    const tips = []
    analysis.tirsHigh.forEach(d=>tips.push(tipsMap[d]))
    tips.push(tipsMap[analysis.rtdrsTop])
    this.setData({ tips })
  }
})
