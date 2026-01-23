Page({
  data: {
    questions: [
      // 语言
      { text:'我喜欢阅读、写作或讲故事', factor:'语言智力' },
      { text:'我能用语言清楚表达复杂想法', factor:'语言智力' },
      { text:'我对词汇和表达比较敏感', factor:'语言智力' },

      // 逻辑
      { text:'我喜欢分析问题和推理', factor:'逻辑-数学智力' },
      { text:'我对数字或逻辑结构不反感', factor:'逻辑-数学智力' },
      { text:'我喜欢解决逻辑难题', factor:'逻辑-数学智力' },

      // 空间
      { text:'我能在脑中想象物体的结构', factor:'空间智力' },
      { text:'我对图形、地图较敏感', factor:'空间智力' },
      { text:'我善于通过视觉理解信息', factor:'空间智力' },

      // 音乐
      { text:'我对旋律或节奏敏感', factor:'音乐智力' },
      { text:'我容易记住音乐', factor:'音乐智力' },
      { text:'音乐能显著影响我的情绪', factor:'音乐智力' },

      // 身体
      { text:'我喜欢通过动手或身体活动学习', factor:'身体-动觉智力' },
      { text:'我协调性和动作控制较好', factor:'身体-动觉智力' },
      { text:'我不喜欢长时间静坐', factor:'身体-动觉智力' },

      // 人际
      { text:'我容易理解他人的情绪', factor:'人际智力' },
      { text:'我善于与人合作', factor:'人际智力' },
      { text:'我在群体中沟通顺畅', factor:'人际智力' },

      // 内省
      { text:'我清楚自己的情绪与动机', factor:'内省智力' },
      { text:'我经常自我反思', factor:'内省智力' },
      { text:'我了解自己的优势和不足', factor:'内省智力' },

      // 自然
      { text:'我对自然环境或生物感兴趣', factor:'自然观察智力' },
      { text:'我容易注意到自然界的变化', factor:'自然观察智力' },
      { text:'我喜欢户外或与自然相关活动', factor:'自然观察智力' },
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

    const scores = {}
    this.data.questions.forEach((q, i) => {
      scores[q.factor] = (scores[q.factor] || 0) + this.data.answers[i]
    })

    const dimensionMap = {
      '语言智力': {
        name: '语言智力',
        shortName: '语言',
        enName: 'Linguistic',
        desc: '测量词汇掌握、语言表达和文字理解能力，反映个体在阅读、写作、演讲和语言学习方面的天赋',
        keywords: ['词汇表达', '阅读写作', '语言学习'],
        coverage: '与 WAIS 的言语理解指数(VCI)、EQ 的情绪表达维度相关'
      },
      '逻辑-数学智力': {
        name: '逻辑-数学智力',
        shortName: '逻辑',
        enName: 'Logical–Mathematical',
        desc: '测量分析问题、数学运算和逻辑推理能力，反映个体在抽象思维、系统化和数学建模方面的优势',
        keywords: ['逻辑分析', '数学运算', '抽象推理'],
        coverage: '与 WAIS 的知觉推理指数(PRI)、Raven 的 Relation 维度相关'
      },
      '空间智力': {
        name: '空间智力',
        shortName: '空间',
        enName: 'Spatial',
        desc: '测量视觉想象、空间导航和图形识别能力，反映个体在三维思维、艺术设计和地理感知方面的能力',
        keywords: ['视觉想象', '三维空间', '图形识别'],
        coverage: '与 WAIS 的知觉推理指数(PRI)、Raven 的 Pattern 维度相关'
      },
      '音乐智力': {
        name: '音乐智力',
        shortName: '音乐',
        enName: 'Musical',
        desc: '测量节奏感知、旋律记忆和听觉敏感度能力，反映个体在音乐创作、演奏和音乐欣赏方面的天赋',
        keywords: ['节奏感知', '旋律记忆', '听觉敏感'],
        coverage: '与 EQ 的情绪感知维度相关，是相对独立的智力维度'
      },
      '身体-动觉智力': {
        name: '身体-动觉智力',
        shortName: '身体',
        enName: 'Bodily–Kinesthetic',
        desc: '测量身体协调、动作控制和手工操作能力，反映个体在体育运动、舞蹈、手工艺和操作技能方面的优势',
        keywords: ['身体协调', '动作控制', '手工操作'],
        coverage: '与 DISC 的行动力维度相关，强调实践能力'
      },
      '人际智力': {
        name: '人际智力',
        shortName: '人际',
        enName: 'Interpersonal',
        desc: '测量理解他人、沟通协作和社交敏感度能力，反映个体在团队合作、领导力和社交互动方面的能力',
        keywords: ['理解他人', '沟通协作', '社交敏感'],
        coverage: '与 EQ 的情绪理解和运用维度、DISC 的影响型(I)维度相关'
      },
      '内省智力': {
        name: '内省智力',
        shortName: '内省',
        enName: 'Intrapersonal',
        desc: '测量自我认知、情绪管理和自我反思能力，反映个体在自我规划、心理调节和深度思考方面的能力',
        keywords: ['自我认知', '情绪管理', '自我反思'],
        coverage: '与 EQ 的情绪调节维度、MBTI 的内向(I)维度相关'
      },
      '自然观察智力': {
        name: '自然观察智力',
        shortName: '自然',
        enName: 'Naturalistic',
        desc: '测量自然敏感度、生物识别和环境感知能力，反映个体在生物分类、环境研究和生态理解方面的能力',
        keywords: ['自然敏感', '生物识别', '环境感知'],
        coverage: '与 Raven 的 Pattern 维度、Big Five 的开放性维度相关'
      }
    }

    const maxScore = 6
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
          enName: dimensionMap[k].enName,
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
