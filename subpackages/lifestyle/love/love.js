Page({
  data: {
    questions:[
      // 依恋风格
      { text:'我害怕伴侣离开我', factor:'依恋风格', reverse:false },
      { text:'我在恋爱中喜欢保持独立', factor:'依恋风格', reverse:false },
      { text:'我渴望亲密但担心被拒绝', factor:'依恋风格', reverse:false },
      { text:'我容易在亲密关系中感到不安', factor:'依恋风格', reverse:false },

      // 爱情价值观
      { text:'我认为爱情主要是浪漫和激情', factor:'爱情价值观', reverse:false },
      { text:'我重视稳定和承诺超过激情', factor:'爱情价值观', reverse:false },
      { text:'我喜欢和伴侣分享生活的点滴', factor:'爱情价值观', reverse:false },
      { text:'我认为理解和信任比浪漫更重要', factor:'爱情价值观', reverse:false },

      // 沟通与冲突
      { text:'我倾向直接表达不满', factor:'沟通与冲突', reverse:false },
      { text:'我在争吵时容易退缩', factor:'沟通与冲突', reverse:false },
      { text:'我能有效倾听伴侣的意见', factor:'沟通与冲突', reverse:false },
      { text:'我在情绪激动时容易说重话', factor:'沟通与冲突', reverse:false },

      // 情感满意度
      { text:'我对目前或理想的关系感到满足', factor:'情感满意度', reverse:false },
      { text:'我认为自己在恋爱中获得了成长', factor:'情感满意度', reverse:false },
      { text:'我对伴侣的理解和支持感到满意', factor:'情感满意度', reverse:false },
      { text:'我感到在关系中能做真实的自己', factor:'情感满意度', reverse:false },
    ].map(q=>({
      ...q,
      options:[
        { label:'符合', value:2 },
        { label:'一般', value:1 },
        { label:'不符合', value:0 }
      ]
    })),

    answers:{},
    result:null
  },

  onSelect(e){
    const index = e.currentTarget.dataset.index
    const value = Number(e.detail.value)
    this.setData({
      answers:{ ...this.data.answers, [index]: value }
    })
  },

  submit(){
    if(Object.keys(this.data.answers).length < this.data.questions.length){
      wx.showToast({ title:'请完成所有题目', icon:'none' })
      return
    }

    const scores = {}
    this.data.questions.forEach((q,i)=>{
      const val = this.data.answers[i]
      const score = q.reverse ? 2-val : val
      scores[q.factor] = (scores[q.factor]||0)+score
    })

    const dimensionMap = {
      '依恋风格': {
        name: '依恋风格',
        desc: '反映你在亲密关系中的依恋模式，包括安全型（信任、独立）、焦虑型（害怕被弃、过度依赖）、回避型（逃避亲密、保持距离）',
        keywords: ['信任', '依赖', '独立'],
        subtypes: {
          high: '焦虑型倾向 - 害怕伴侣离开，渴望过度亲密',
          mid: '安全型倾向 - 能够平衡亲密与独立',
          low: '回避型倾向 - 倾向独立处理情绪，回避亲密'
        }
      },
      '爱情价值观': {
        name: '爱情价值观',
        desc: '反映你在爱情中最重视的因素，包括承诺（稳定、责任）、激情（浪漫、心动）、亲密（理解、分享）',
        keywords: ['承诺', '激情', '亲密'],
        subtypes: {
          high: '重视浪漫与激情 - 认为爱情主要是浪漫激情',
          mid: '平衡重视 - 兼顾承诺、激情和亲密',
          low: '重视承诺与稳定 - 更看重长期的承诺和稳定'
        }
      },
      '沟通与冲突': {
        name: '沟通与冲突处理',
        desc: '反映你在恋爱关系中的沟通方式和冲突应对策略，包括情绪表达（直接/间接）、冲突应对（对抗/退缩/协商）',
        keywords: ['情绪表达', '冲突应对', '倾听'],
        subtypes: {
          high: '直接表达型 - 倾向直接表达不满，不回避冲突',
          mid: '平衡沟通型 - 能够有效表达和倾听',
          low: '回避冲突型 - 在争吵时容易退缩，回避冲突'
        }
      },
      '情感满意度': {
        name: '情感满意度',
        desc: '反映你对当前或理想恋爱关系的满意程度，包括关系满足感、个人成长、理解支持、真实表达',
        keywords: ['关系满足', '成长', '理解支持'],
        subtypes: {
          high: '高度满足 - 对关系感到满足，能做真实的自己',
          mid: '中度满足 - 对关系基本满意，有改进空间',
          low: '低度满足 - 对关系不满，需要沟通和调整'
        }
      }
    }

    const maxScore = 8
    this.setData({
      result: Object.keys(scores).map(k=>{
        const score = scores[k]
        const percentage = Math.round(score / maxScore * 100)
        let level = '一般'
        let levelClass = 'level-normal'
        let subtypeDesc = dimensionMap[k].subtypes.mid

        if (percentage >= 70) {
          level = '强'
          levelClass = 'level-high'
          subtypeDesc = dimensionMap[k].subtypes.high
        } else if (percentage >= 40) {
          level = '中等'
          levelClass = 'level-medium'
          subtypeDesc = dimensionMap[k].subtypes.mid
        } else {
          level = '弱'
          levelClass = 'level-low'
          subtypeDesc = dimensionMap[k].subtypes.low
        }

        return {
          key: k,
          name: dimensionMap[k].name,
          score: score,
          maxScore: maxScore,
          percentage: percentage,
          level: level,
          levelClass: levelClass,
          desc: dimensionMap[k].desc,
          subtypeDesc: subtypeDesc,
          keywords: dimensionMap[k].keywords
        }
      })
    })
  }
})
