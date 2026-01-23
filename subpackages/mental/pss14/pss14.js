Page({
  data: {
    questions: [
      { text: '你觉得一些重要的事情不在你的掌控之中' },
      { text: '你感到无法控制生活中重要的事情' },
      { text: '你感到紧张和有压力' },
      { text: '你成功地应对了生活中令人烦恼的问题', reverse: true },
      { text: '你觉得自己能有效地处理生活中发生的重要变化', reverse: true },
      { text: '你有信心处理好个人问题', reverse: true },
      { text: '你觉得事情正朝着你期望的方向发展', reverse: true },
      { text: '你发现自己无法应付所有必须要做的事情' },
      { text: '你能够控制生活中令人烦恼的事情', reverse: true },
      { text: '你觉得自己掌控着事情', reverse: true },
      { text: '你常常因为意料之外的事情而感到生气' },
      { text: '你发现自己总是在想必须要完成的事情' },
      { text: '你能够控制自己把时间花在事情上的方式', reverse: true },
      { text: '你觉得困难堆积得太多，无法克服' }
    ],

    // 反向题索引（科研/审计清晰）
    reverseIndexes: [3, 4, 5, 6, 8, 9, 12],

    options: [
      { label: '从不', value: 0 },
      { label: '几乎没有', value: 1 },
      { label: '有时', value: 2 },
      { label: '经常', value: 3 },
      { label: '总是', value: 4 }
    ],

    answers: {},
    result: null
  },

  onSelect(e) {
    const index = e.currentTarget.dataset.index
    const value = Number(e.detail.value)
    this.setData({
      answers: { ...this.data.answers, [index]: value }
    })
  },

  submit() {
    if (Object.keys(this.data.answers).length < 14) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    let total = 0

    Object.keys(this.data.answers).forEach((key) => {
      const index = Number(key)
      let value = this.data.answers[key]

      // 🔁 反向计分
      if (this.data.reverseIndexes.includes(index)) {
        value = 4 - value
      }

      total += value
    })

    this.setData({
      result: this.getResult(total)
    })
  },

  getResult(score) {
    let level, desc, tip, levelClass;

    if (score <= 18) {
      level = '低压力';
      desc = '压力感知较低';
      tip = '保持良好的生活节奏';
      levelClass = 'level-low';
    } else if (score <= 37) {
      level = '中等压力';
      desc = '常见人群水平';
      tip = '建议注意压力管理';
      levelClass = 'level-medium';
    } else {
      level = '高压力';
      desc = '压力感知显著偏高';
      tip = '建议干预，采取减压措施';
      levelClass = 'level-high';
    }

    return {
      score,
      level,
      desc,
      tip,
      levelClass,
      note: 'PSS 不用于医学诊断，无官方临床切点。以上分级为常见研究与实践参考区间。'
    };
  }
})
