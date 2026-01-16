const app = getApp()

const questions = [
  { id: 1, dim: 'control', question: '对方是否经常干预你的决定方式？' },
  { id: 2, dim: 'control', question: '当你表达不同意见时，对方是否试图纠正你？' },

  { id: 3, dim: 'devalue', question: '对方是否弱化或否定你的感受？' },
  { id: 4, dim: 'devalue', question: '你的情绪是否被对方轻描淡写带过？' },

  { id: 5, dim: 'selfish', question: '对方是否主要关注自身需求？' },
  { id: 6, dim: 'selfish', question: '在冲突中，对方是否很少考虑你的立场？' },

  { id: 7, dim: 'emotional', question: '对方情绪是否频繁影响你？' },
  { id: 8, dim: 'emotional', question: '你是否需要经常安抚对方的情绪？' },

  { id: 9, dim: 'manipulation', question: '对方是否通过暗示影响你？' },
  { id:10, dim: 'manipulation', question: '你是否感到被引导做出并非本意的选择？' },

  { id:11, dim: 'distrust', question: '对方是否经常质疑你？' },
  { id:12, dim: 'distrust', question: '你是否需要反复解释自己的动机？' }
]

Page({
  data: {
    index: 0,
    current: questions[0],
    selectedValue: '',
    options: [
      { value: '0', label: '从不' },
      { value: '1', label: '偶尔' },
      { value: '2', label: '经常' },
      { value: '3', label: '几乎总是' }
    ],
    questionsLength: questions.length
  },

  onChange(e) {
    this.setData({ selectedValue: e.detail.value })
  },

  next() {
    if (this.data.selectedValue === '') {
      wx.showToast({
        title: '请选择一个选项',
        icon: 'none'
      })
      return
    }

    const { current, selectedValue } = this.data
    const { dim } = current

    if (!app.globalData.tirsAnswers[dim]) {
      app.globalData.tirsAnswers[dim] = []
    }
    app.globalData.tirsAnswers[dim].push(Number(selectedValue))

    console.log(`Selected value for`, app.globalData)

    const nextIndex = this.data.index + 1

    console.log(`Selected value for`, nextIndex, questions.length)

    if (nextIndex < questions.length) {
      this.setData({
        index: nextIndex,
        current: questions[nextIndex],
        selectedValue: ''
      })
    } else {
      // Show a toast notification to inform the user about the transition
      wx.showToast({
        title: '即将开始自我消耗风险评估',
        icon: 'info',
        duration: 1500,
        success: () => {
          // Navigate to the reverse page after a short delay to ensure the user sees the toast
          setTimeout(() => {
            wx.navigateTo({ url: '/pages/reverse/reverse' });
          }, 1200);
        }
      });
    }
  }
})
