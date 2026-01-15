const app = getApp()

const questions = [
  { dim: 'control', question: '对方是否经常干预你的决定方式？' },
  { dim: 'devalue', question: '对方是否弱化或否定你的感受？' },
  { dim: 'selfish', question: '对方是否主要关注自身需求？' },
  { dim: 'emotional', question: '对方情绪是否频繁影响你？' },
  { dim: 'manipulation', question: '对方是否通过暗示影响你？' },
  { dim: 'distrust', question: '对方是否经常质疑你？' }
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
    app.globalData.tirsAnswers[dim] = Number(e.detail.value)
  },
  next() {
    const nextIndex = this.data.index + 1
    if (nextIndex < questions.length) {
      this.setData({
        index: nextIndex,
        current: questions[nextIndex]
      })
    } else {
      wx.navigateTo({ url: '/pages/reverse/reverse' })
    }
  }
})
