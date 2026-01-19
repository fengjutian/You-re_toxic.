Page({
  data: {
    questions: [
      { text: '我能敏锐觉察到自己情绪的变化', dim: 'perception' },
      { text: '我能通过他人的表情或语气判断其情绪', dim: 'perception' },
      { text: '当我情绪变化时，我通常能说清原因', dim: 'perception' },
      { text: '我能意识到情绪对我行为的影响', dim: 'perception' },

      { text: '我能理解复杂或矛盾的情绪状态', dim: 'understanding' },
      { text: '我知道哪些事情容易引发我的负面情绪', dim: 'understanding' },
      { text: '我能理解他人情绪背后的原因', dim: 'understanding' },
      { text: '我能分辨情绪与事实本身的区别', dim: 'understanding' },

      { text: '我能在情绪激动时让自己冷静下来', dim: 'regulation' },
      { text: '即使情绪低落，我也能继续完成任务', dim: 'regulation' },
      { text: '我能用合适的方式表达不满或愤怒', dim: 'regulation' },
      { text: '面对压力时，我能较快恢复情绪平衡', dim: 'regulation' },

      { text: '我的情绪能帮助我做出合适的决定', dim: 'utilization' },
      { text: '我能在社交中调节情绪以促进沟通', dim: 'utilization' },
      { text: '我能利用积极情绪提升效率', dim: 'utilization' },
      { text: '即使情绪不好，我也能与人理性沟通', dim: 'utilization' },

      { text: '我很少被情绪完全左右行为', dim: 'stability' },
      { text: '情绪问题通常不会长期困扰我', dim: 'stability' },
      { text: '我能理解并接纳自己的情绪', dim: 'stability' },
      { text: '总体来说，我能很好地管理自己的情绪', dim: 'stability' }
    ],

    options: [
      { label: '非常不同意', value: 1 },
      { label: '不同意', value: 2 },
      { label: '一般', value: 3 },
      { label: '同意', value: 4 },
      { label: '非常同意', value: 5 }
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
    if (Object.keys(this.data.answers).length < 20) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    let totalScore = 0
    const dimScores = { perception:0, understanding:0, regulation:0, utilization:0, stability:0 }

    Object.keys(this.data.answers).forEach((key) => {
      const index = Number(key)
      const value = this.data.answers[key]
      const dim = this.data.questions[index].dim

      totalScore += value

      if (dimScores[dim] !== undefined) dimScores[dim] += value
    })

    this.setData({
      result: this.getResult(totalScore, dimScores)
    })
  },

  getResult(totalScore, dimScores) {
    let level, desc, tip, levelClass;

    if (totalScore <= 49) {
      level = '较低';
      desc = '情绪觉察与调节能力较弱';
      tip = '建议关注自我情绪成长';
      levelClass = 'level-low';
    } else if (totalScore <= 69) {
      level = '中等偏低';
      desc = '情绪管理有待提升';
      tip = '仍有较大提升空间';
      levelClass = 'level-medium-low';
    } else if (totalScore <= 84) {
      level = '中等偏高';
      desc = '情绪智力良好';
      tip = '可有效识别与调节情绪';
      levelClass = 'level-medium-high';
    } else {
      level = '较高';
      desc = '情绪觉察与调节能力较强';
      tip = '继续保持良好的情绪管理';
      levelClass = 'level-high';
    }

    return {
      totalScore,
      level,
      desc,
      tip,
      levelClass,
      detail: {
        perception: dimScores.perception,
        understanding: dimScores.understanding,
        regulation: dimScores.regulation,
        utilization: dimScores.utilization
      },
      note: 'EQ 为能力倾向评估，非人格好坏判断'
    };
  }
})
