const app = getApp()

const questions = [
  { dim: 'emotional_drain', question: '这段关系是否让你感到情绪被消耗？' },
  { dim: 'self_doubt', question: '你是否因此怀疑自己的判断？' },
  { dim: 'boundary_erosion', question: '你的个人界限是否被削弱？' },
  { dim: 'guilt_pressure', question: '你是否经常感到内疚或被施压？' },
  { dim: 'avoidance', question: '你是否回避表达真实感受？' },
  { dim: 'imbalance', question: '你是否感到关系付出不平衡？' }
]

Page({
  data: {
    index: 0,
    current: questions[0],
    options: [
      { value: 0, label: '从不' },
      { value: 1, label: '偶尔' },
      { value: 2, label: '经常' },
      { value: 3, label: '几乎总是' }
    ]
  },
  onChange(e) {
    const { dim } = this.data.current
    app.globalData.rtdrsAnswers[dim] = Number(e.detail.value)
  },
  next() {
    const nextIndex = this.data.index + 1
    if (nextIndex < questions.length) {
      this.setData({
        index: nextIndex,
        current: questions[nextIndex]
      })
    } else {
      wx.navigateTo({ url: '/pages/result/result' })
    }
  }
})
