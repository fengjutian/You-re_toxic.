Page({
  data: {
    questions: [
      // Pattern
      { text:'我能快速发现事物中的重复模式', factor:'Pattern' },
      { text:'我对视觉或结构规律比较敏感', factor:'Pattern' },
      { text:'我能从杂乱信息中找出规律', factor:'Pattern' },
      { text:'我容易识别形式上的相似性', factor:'Pattern' },

      // Relation
      { text:'我能理解事物之间的对应关系', factor:'Relation' },
      { text:'我善于比较多个对象的异同', factor:'Relation' },
      { text:'我能推断元素之间的逻辑联系', factor:'Relation' },
      { text:'我能通过关系变化预测结果', factor:'Relation' },

      // Transformation
      { text:'我能理解规则如何从一个状态变到另一个状态', factor:'Transformation' },
      { text:'我容易发现变化背后的规则', factor:'Transformation' },
      { text:'我能将已知规则迁移到新问题', factor:'Transformation' },
      { text:'我能连续跟踪多步变化', factor:'Transformation' },

      // Abstraction
      { text:'我能从具体例子中总结抽象规则', factor:'Abstraction' },
      { text:'我善于忽略无关细节抓住核心', factor:'Abstraction' },
      { text:'我能在陌生问题中迅速建立模型', factor:'Abstraction' },
      { text:'我对高度抽象问题接受度较高', factor:'Abstraction' },
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

    const scores = {
      Pattern:0,
      Relation:0,
      Transformation:0,
      Abstraction:0
    }

    this.data.questions.forEach((q, i) => {
      scores[q.factor] += this.data.answers[i]
    })

    const dimensionMap = {
      Pattern: {
        name: '图形模式识别',
        shortName: '模式识别',
        desc: '测量发现重复规律、视觉结构敏感度和形式相似性识别能力，反映个体在观察力和结构感知方面的能力',
        keywords: ['视觉规律', '结构敏感', '模式识别'],
        coverage: '与 WAIS 的知觉推理指数(PRI)、Big Five 的开放性维度相关'
      },
      Relation: {
        name: '关系推理能力',
        shortName: '关系推理',
        desc: '测量理解事物间对应关系、比较异同和逻辑联系推断能力，反映个体在比较思维和逻辑推理方面的能力',
        keywords: ['对应关系', '比较思维', '逻辑推理'],
        coverage: '与 WAIS 的工作记忆指数(WMI)、MBTI 的思维(T)维度相关'
      },
      Transformation: {
        name: '变化规则迁移',
        shortName: '规则迁移',
        desc: '测量理解状态变化规则、发现变化背后机制和规则迁移能力，反映个体在动态思维和规则应用方面的能力',
        keywords: ['状态变化', '规则迁移', '动态思维'],
        coverage: '与 WAIS 的加工速度指数(PSI)、DISC 的支配型(D)维度相关'
      },
      Abstraction: {
        name: '抽象归纳能力',
        shortName: '抽象归纳',
        desc: '测量从具体案例总结规则、忽略无关细节抓住核心和概念建模能力，反映个体在抽象思维和概念化方面的能力',
        keywords: ['抽象思维', '概念建模', '归纳总结'],
        coverage: '与 WAIS 的言语理解指数(VCI)、MBTI 的直觉(N)维度相关'
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
