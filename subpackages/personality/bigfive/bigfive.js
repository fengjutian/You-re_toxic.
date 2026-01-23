Page({
  data: {
    // 40题，大五人格，每维8题，含反向计分
    questions: [
      { text: '我喜欢尝试新事物和新体验', dim: 'O', reverse:false },
      { text: '我喜欢探索不同的观点和思想', dim: 'O', reverse:false },
      { text: '我喜欢艺术和美的事物', dim: 'O', reverse:false },
      { text: '我不喜欢变化和新想法', dim: 'O', reverse:true },
      { text: '我喜欢解决复杂问题', dim: 'O', reverse:false },
      { text: '我不喜欢尝试陌生的活动', dim: 'O', reverse:true },
      { text: '我喜欢有创造性的活动', dim: 'O', reverse:false },
      { text: '我喜欢思考抽象问题', dim: 'O', reverse:false },

      { text: '我总是按计划完成任务', dim: 'C', reverse:false },
      { text: '我容易拖延和忘事', dim: 'C', reverse:true },
      { text: '我注重细节，做事认真', dim: 'C', reverse:false },
      { text: '我经常做事随意，不按步骤', dim: 'C', reverse:true },
      { text: '我有条理，喜欢规划生活', dim: 'C', reverse:false },
      { text: '我缺乏纪律性', dim: 'C', reverse:true },
      { text: '我能够按时完成任务', dim: 'C', reverse:false },
      { text: '我做事通常井井有条', dim: 'C', reverse:false },

      { text: '我喜欢参加社交活动', dim: 'E', reverse:false },
      { text: '我喜欢与人交谈和分享', dim: 'E', reverse:false },
      { text: '我常感到充满活力', dim: 'E', reverse:false },
      { text: '我喜欢独处而非与人交往', dim: 'E', reverse:true },
      { text: '我喜欢成为注意的中心', dim: 'E', reverse:false },
      { text: '我不喜欢热闹场合', dim: 'E', reverse:true },
      { text: '我主动与陌生人交流', dim: 'E', reverse:false },
      { text: '我喜欢群体活动', dim: 'E', reverse:false },

      { text: '我乐于助人', dim: 'A', reverse:false },
      { text: '我关心他人的感受', dim: 'A', reverse:false },
      { text: '我容易原谅他人的过错', dim: 'A', reverse:false },
      { text: '我对他人态度冷漠', dim: 'A', reverse:true },
      { text: '我与人相处融洽', dim: 'A', reverse:false },
      { text: '我不喜欢帮助别人', dim: 'A', reverse:true },
      { text: '我善于合作', dim: 'A', reverse:false },
      { text: '我容易与人产生冲突', dim: 'A', reverse:true },

      { text: '我容易紧张和焦虑', dim: 'N', reverse:false },
      { text: '我经常感到情绪低落', dim: 'N', reverse:false },
      { text: '我很容易生气或沮丧', dim: 'N', reverse:false },
      { text: '我情绪通常稳定', dim: 'N', reverse:true },
      { text: '我经常担心一些小事', dim: 'N', reverse:false },
      { text: '我能够轻松应对压力', dim: 'N', reverse:true },
      { text: '我容易感到不安', dim: 'N', reverse:false },
      { text: '我情绪波动大', dim: 'N', reverse:false }
    ],

    answers: {},
    result: null
  },

  onSelect(e) {
    const index = e.currentTarget.dataset.index
    const value = parseInt(e.detail.value)
    this.setData({
      answers: { ...this.data.answers, [index]: value }
    })
  },

  submit() {
    if (Object.keys(this.data.answers).length < this.data.questions.length) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    // 五维度得分统计
    const scores = { O:0, C:0, E:0, A:0, N:0 }
    this.data.questions.forEach((q,i) => {
      let ans = this.data.answers[i]
      if (q.reverse) ans = 6 - ans // 反向计分：6-1=5, 6-5=1
      scores[q.dim] += ans
    })

    // 维度解释
    const dimInfo = {
      O: { name: '开放性 (Openness)', desc: '想象力、创造力、好奇心', min: 8, max: 40 },
      C: { name: '责任心 (Conscientiousness)', desc: '自律、计划性、可靠性', min: 8, max: 40 },
      E: { name: '外向性 (Extraversion)', desc: '社交性、活力、热情', min: 8, max: 40 },
      A: { name: '宜人性 (Agreeableness)', desc: '合作、友善、信任他人', min: 8, max: 40 },
      N: { name: '神经质 (Neuroticism)', desc: '情绪稳定性（分高易焦虑）', min: 8, max: 40 }
    }

    // 计算各维度得分百分比
    const result = Object.keys(scores).map(dim => ({
      dim,
      name: dimInfo[dim].name,
      desc: dimInfo[dim].desc,
      score: scores[dim],
      min: dimInfo[dim].min,
      max: dimInfo[dim].max,
      percentage: Math.round((scores[dim] - 8) / 32 * 100)
    }))

    this.setData({ result })
  }
})
