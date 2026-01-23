Page({
  data: {
    questions: [
      // VCI
      { text:'我能较好地理解抽象概念和词语含义', factor:'VCI' },
      { text:'我善于用语言解释复杂问题', factor:'VCI' },
      { text:'我阅读理解能力较强', factor:'VCI' },
      { text:'我能准确表达自己的想法', factor:'VCI' },

      // PRI
      { text:'我擅长通过图形或结构理解问题', factor:'PRI' },
      { text:'我能快速发现事物之间的规律', factor:'PRI' },
      { text:'我对空间关系比较敏感', factor:'PRI' },
      { text:'我善于解决非语言类问题', factor:'PRI' },

      // WMI
      { text:'我能在脑中同时处理多条信息', factor:'WMI' },
      { text:'我能短时间记住并操作信息', factor:'WMI' },
      { text:'我在心算或逻辑步骤中表现良好', factor:'WMI' },
      { text:'我不容易被干扰打断思路', factor:'WMI' },

      // PSI
      { text:'我完成任务的速度较快', factor:'PSI' },
      { text:'我能在压力下保持效率', factor:'PSI' },
      { text:'我处理重复任务时依然准确', factor:'PSI' },
      { text:'我反应速度较快', factor:'PSI' },
    ].map(q => ({
      ...q,
      options: [
        { label:'不符合', value:0 },
        { label:'一般', value:1 },
        { label:'符合', value:2 }
      ]
    })),

    answers: {},
    result: null
  },

  onSelect(e) {
    this.setData({
      answers: { ...this.data.answers, [e.currentTarget.dataset.index]: Number(e.detail.value) }
    })
  },

  submit() {
    if (Object.keys(this.data.answers).length < this.data.questions.length) {
      wx.showToast({ title:'请完成所有题目', icon:'none' })
      return
    }

    const scores = { VCI:0, PRI:0, WMI:0, PSI:0 }
    this.data.questions.forEach((q, i) => {
      scores[q.factor] += this.data.answers[i]
    })

    const dimensionMap = {
      VCI: {
        name: '言语理解指数',
        shortName: '言语理解',
        desc: '测量词汇理解、语言推理和抽象思维能力，反映个体在语言表达、概念形成和言语逻辑方面的能力',
        keywords: ['词汇理解', '语言推理', '抽象思维'],
        coverage: '与 EQ 的情绪理解和表达维度、MBTI 的直觉(N)维度相关'
      },
      PRI: {
        name: '知觉推理指数',
        shortName: '知觉推理',
        desc: '测量非语言问题解决、空间感知和模式识别能力，反映个体在视觉空间推理、抽象推理和量化分析方面的能力',
        keywords: ['空间感知', '模式识别', '抽象推理'],
        coverage: '与 Big Five 的开放性维度、MBTI 的直觉(N)维度相关'
      },
      WMI: {
        name: '工作记忆指数',
        shortName: '工作记忆',
        desc: '测量短时记忆、信息操作和注意力控制能力，反映个体在保持信息、同时处理信息、数字广度方面的能力',
        keywords: ['短时记忆', '注意力控制', '信息操作'],
        coverage: '与 PSS-14 的压力管理能力、Big Five 的尽责性维度相关'
      },
      PSI: {
        name: '加工速度指数',
        shortName: '加工速度',
        desc: '测量思维敏捷性、反应速度和执行效率能力，反映个体在快速处理信息、符号搜索和认知速度方面的能力',
        keywords: ['思维敏捷', '反应速度', '执行效率'],
        coverage: '与 DISC 的支配型(D)维度、Big Five 的尽责性维度相关'
      }
    }

    const maxScore = 8
    this.setData({
      result: Object.keys(scores).map(k => {
        const score = scores[k]
        const percentage = Math.round(score / maxScore * 100)
        let level = '一般'
        let levelClass = 'level-normal'
        
        if (percentage >= 75) {
          level = '优秀'
          levelClass = 'level-high'
        } else if (percentage >= 50) {
          level = '良好'
          levelClass = 'level-good'
        }

        return {
          key: k,
          name: dimensionMap[k].name,
          shortName: dimensionMap[k].shortName,
          score: score,
          maxScore: maxScore,
          percentage: percentage,
          level: level,
          levelClass: levelClass,
          desc: dimensionMap[k].desc,
          keywords: dimensionMap[k].keywords,
          coverage: dimensionMap[k].coverage
        }
      })
    })
  }
})
