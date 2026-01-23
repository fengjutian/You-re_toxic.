Page({
  data: {
    questions: [
      // D
      { text: '我喜欢掌控局面并快速做决定', options:[{label:'是',value:'D'},{label:'否',value:'X'}]},
      { text: '面对挑战我会主动迎上去', options:[{label:'是',value:'D'},{label:'否',value:'X'}]},
      { text: '我更关注结果而不是过程', options:[{label:'是',value:'D'},{label:'否',value:'X'}]},
      { text: '我讨厌拖延和犹豫不决', options:[{label:'是',value:'D'},{label:'否',value:'X'}]},
      { text: '我习惯直接指出问题', options:[{label:'是',value:'D'},{label:'否',value:'X'}]},
      { text: '我愿意承担责任和风险', options:[{label:'是',value:'D'},{label:'否',value:'X'}]},

      // I
      { text: '我容易与陌生人交谈', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text: '我喜欢表达自己的想法', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text: '我在团队中气氛活跃', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text: '我乐于影响和说服他人', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text: '我讨厌枯燥和重复', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text: '我情绪表达比较外显', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},

      // S
      { text: '我做事稳重、不急躁', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text: '我更在意团队和谐', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text: '我不喜欢频繁变化', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text: '我对他人很有耐心', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text: '我愿意长期坚持一件事', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text: '我重视稳定和安全感', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},

      // C
      { text: '我做事前会仔细分析', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text: '我非常注重细节', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text: '我遵循规则和标准', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text: '我追求准确而不是速度', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text: '我不喜欢犯错', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text: '我习惯理性思考', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
    ],
    answers: {},
    result: null
  },

  onSelect(e) {
    this.setData({
      answers: { ...this.data.answers, [e.currentTarget.dataset.index]: e.detail.value }
    })
  },

  submit() {
    if (Object.keys(this.data.answers).length < this.data.questions.length) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    const score = { D:0, I:0, S:0, C:0 }
    Object.values(this.data.answers).forEach(v => {
      if (score[v] !== undefined) score[v]++
    })

    const sorted = Object.entries(score).sort((a,b)=>b[1]-a[1])
    const main = sorted[0][0]
    const combo = sorted[1][0]

    const descMap = {
      D:'果断直接，目标导向，适合决策与领导角色',
      I:'热情外向，善于沟通，适合市场与社交型岗位',
      S:'稳定可靠，重视关系，适合支持与协作角色',
      C:'理性严谨，追求准确，适合专业与分析工作'
    }

    // 四维度详细信息
    const dimDetails = {
      D: {
        name: '支配型',
        english: 'Dominance',
        desc: '果断、目标导向、行动快',
        keywords: ['果断', '目标导向', '行动快']
      },
      I: {
        name: '影响型',
        english: 'Influence',
        desc: '外向、表达力强、善社交',
        keywords: ['外向', '表达力强', '善社交']
      },
      S: {
        name: '稳定型',
        english: 'Steadiness',
        desc: '耐心、可靠、重关系',
        keywords: ['耐心', '可靠', '重关系']
      },
      C: {
        name: '谨慎型',
        english: 'Conscientiousness',
        desc: '理性、严谨、重规则',
        keywords: ['理性', '严谨', '重规则']
      }
    }

    // 各维度得分
    const scores = Object.keys(score).map(dim => ({
      dim,
      ...dimDetails[dim],
      count: score[dim],
      max: 8,
      isMain: dim === main,
      isCombo: dim === combo
    }))

    this.setData({
      result: {
        main,
        combo: main + '/' + combo,
        desc: descMap[main],
        scores
      }
    })
  }
})
