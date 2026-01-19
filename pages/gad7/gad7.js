Page({
  data: {
    questions: [
      '感到紧张、焦虑或坐立不安',
      '不能停止或控制担忧',
      '对各种事情过度担心',
      '难以放松',
      '因为不安而难以静坐',
      '容易烦躁或易怒',
      '害怕将要发生可怕的事情'
    ],
    options: [
      { label: '完全没有', value: 0 },
      { label: '几天', value: 1 },
      { label: '超过一半天数', value: 2 },
      { label: '几乎每天', value: 3 }
    ],
    impactOptions: [
      '完全没有',
      '有些困难',
      '非常困难',
      '极其困难'
    ],
    answers: {},
    impact: '',
    result: null
  },

  onSelect(e) {
    const index = e.currentTarget.dataset.index
    const value = Number(e.detail.value)
    this.setData({
      answers: { ...this.data.answers, [index]: value }
    })
  },

  onImpactSelect(e) {
    this.setData({ impact: e.detail.value })
  },

  submit() {
    if (Object.keys(this.data.answers).length < 7) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    const score = Object.values(this.data.answers).reduce((a, b) => a + b, 0)
    this.setData({ result: this.getResult(score) })
  },

  getResult(score) {
    if (score <= 4) {
      return {
        score,
        level: '无或极轻度焦虑',
        desc: '结果处于正常范围。',
        tip: '保持良好作息与压力管理。'
      }
    }
    if (score <= 9) {
      return {
        score,
        level: '轻度焦虑',
        desc: '存在一定焦虑症状。',
        tip: '建议关注压力来源并进行自我调节。'
      }
    }
    if (score <= 14) {
      return {
        score,
        level: '中度焦虑',
        desc: '焦虑症状已较明显。',
        tip: '建议进行专业心理评估或咨询。'
      }
    }
    return {
      score,
      level: '重度焦虑',
      desc: '焦虑程度较高。',
      tip: '强烈建议尽快联系心理咨询师或精神科医生。'
    }
  }
})
