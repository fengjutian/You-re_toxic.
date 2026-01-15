const app = getApp()
const questions = [
  { dim: 'control', question: '对方是否经常干预你的决定方式？' },
  { dim: 'devalue', question: '对方是否经常贬低你的感受或观点？' },
  { dim: 'selfish', question: '对方是否主要关注自身需求？' },
  { dim: 'emotional', question: '对方的情绪是否频繁影响你的状态？' },
  { dim: 'manipulation', question: '对方是否通过暗示影响你的选择？' },
  { dim: 'distrust', question: '对方是否经常质疑你的动机？' }
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
    const q = this.data.current
    app.globalData.tirsAnswers[q.dim] = Number(e.detail.value)
  },
  next() {
    const i = this.data.index + 1
    if (i < questions.length) {
      this.setData({ index: i, current: questions[i] })
    } else {
      wx.navigateTo({ url: '/pages/reverse/reverse' })
    }
  }
})
