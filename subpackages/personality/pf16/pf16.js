Page({
  data: {
    questions: [
      { text:'我很容易与人亲近', factor:'A' },
      { text:'我更倾向保持距离感', factor:'A', reverse:true },

      { text:'我善于理解复杂问题', factor:'B' },
      { text:'我不太喜欢需要动脑的事情', factor:'B', reverse:true },

      { text:'我情绪通常比较稳定', factor:'C' },
      { text:'我容易情绪波动', factor:'C', reverse:true },

      { text:'我喜欢主导局面', factor:'E' },
      { text:'我更愿意顺从他人', factor:'E', reverse:true },

      { text:'我性格活跃、爱表达', factor:'F' },
      { text:'我比较安静克制', factor:'F', reverse:true },

      { text:'我严格遵守规则', factor:'G' },
      { text:'我更随意灵活', factor:'G', reverse:true },

      { text:'我在社交中很大胆', factor:'H' },
      { text:'我在社交中容易紧张', factor:'H', reverse:true },

      { text:'我对他人情绪很敏感', factor:'I' },
      { text:'我做事偏理性冷静', factor:'I', reverse:true },

      { text:'我对他人保持警惕', factor:'L' },
      { text:'我容易信任别人', factor:'L', reverse:true },

      { text:'我经常沉浸在想象中', factor:'M' },
      { text:'我更关注现实事务', factor:'M', reverse:true },

      { text:'我不轻易暴露内心想法', factor:'N' },
      { text:'我比较坦率直接', factor:'N', reverse:true },

      { text:'我常担心自己做得不够好', factor:'O' },
      { text:'我对自己较有信心', factor:'O', reverse:true },

      { text:'我愿意尝试新方法', factor:'Q1' },
      { text:'我偏好传统方式', factor:'Q1', reverse:true },

      { text:'我喜欢独立完成任务', factor:'Q2' },
      { text:'我更依赖团队', factor:'Q2', reverse:true },

      { text:'我做事自律有计划', factor:'Q3' },
      { text:'我容易拖延', factor:'Q3', reverse:true },

      { text:'我经常感到紧张焦虑', factor:'Q4' },
      { text:'我比较放松', factor:'Q4', reverse:true },
    ].map(q => ({
      ...q,
      options: [
        { label:'符合', value:1 },
        { label:'不符合', value:0 }
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
      const val = this.data.answers[i]
      const score = q.reverse ? 1 - val : val
      scores[q.factor] = (scores[q.factor] || 0) + score
    })

    const descMap = {
      A:'人际亲和程度',
      B:'认知与推理能力',
      C:'情绪稳定水平',
      E:'支配与主导倾向',
      F:'活跃与表达倾向',
      G:'规则与责任意识',
      H:'社交大胆程度',
      I:'情感敏感度',
      L:'警觉与怀疑程度',
      M:'想象与抽象倾向',
      N:'私密与谨慎程度',
      O:'自我担忧程度',
      Q1:'变革与开放倾向',
      Q2:'独立自主程度',
      Q3:'自律与控制能力',
      Q4:'紧张与压力水平'
    }

    // 16个基本人格因素详细信息
    const factorDetails = {
      A: {
        name: '乐群性',
        english: 'Warmth',
        shortDesc: '人际亲和程度',
        keywords: ['亲和', '友好', '合作']
      },
      B: {
        name: '推理能力',
        english: 'Reasoning',
        shortDesc: '认知与推理能力',
        keywords: ['理性', '分析', '逻辑']
      },
      C: {
        name: '情绪稳定性',
        english: 'Emotional Stability',
        shortDesc: '情绪稳定水平',
        keywords: ['稳定', '冷静', '抗压']
      },
      E: {
        name: '支配性',
        english: 'Dominance',
        shortDesc: '支配与主导倾向',
        keywords: ['主导', '果断', '影响']
      },
      F: {
        name: '活跃性',
        english: 'Liveliness',
        shortDesc: '活跃与表达倾向',
        keywords: ['活跃', '外向', '表达']
      },
      G: {
        name: '规则意识',
        english: 'Rule-Consciousness',
        shortDesc: '规则与责任意识',
        keywords: ['规则', '责任', '秩序']
      },
      H: {
        name: '社交大胆性',
        english: 'Social Boldness',
        shortDesc: '社交大胆程度',
        keywords: ['大胆', '社交', '主动']
      },
      I: {
        name: '敏感性',
        english: 'Sensitivity',
        shortDesc: '情感敏感度',
        keywords: ['敏感', '情感', '共情']
      },
      L: {
        name: '警觉性',
        english: 'Vigilance',
        shortDesc: '警觉与怀疑程度',
        keywords: ['警觉', '怀疑', '审慎']
      },
      M: {
        name: '抽象性',
        english: 'Abstractedness',
        shortDesc: '想象与抽象倾向',
        keywords: ['抽象', '想象', '创意']
      },
      N: {
        name: '私密性',
        english: 'Privateness',
        shortDesc: '私密与谨慎程度',
        keywords: ['私密', '谨慎', '保守']
      },
      O: {
        name: '忧虑性',
        english: 'Apprehension',
        shortDesc: '自我担忧程度',
        keywords: ['忧虑', '担忧', '焦虑']
      },
      Q1: {
        name: '开放性',
        english: 'Openness to Change',
        shortDesc: '变革与开放倾向',
        keywords: ['开放', '变革', '适应']
      },
      Q2: {
        name: '独立性',
        english: 'Self-Reliance',
        shortDesc: '独立自主程度',
        keywords: ['独立', '自主', '自信']
      },
      Q3: {
        name: '自律性',
        english: 'Perfectionism',
        shortDesc: '自律与控制能力',
        keywords: ['自律', '完美', '控制']
      },
      Q4: {
        name: '紧张性',
        english: 'Tension',
        shortDesc: '紧张与压力水平',
        keywords: ['紧张', '压力', '松弛']
      }
    }

    this.setData({
      result: {
        list: Object.keys(scores).map(k => ({
          key: k,
          score: scores[k],
          desc: descMap[k],
          ...factorDetails[k]
        }))
      }
    })
  }
})
