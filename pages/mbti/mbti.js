Page({
  data: {
    // 40 题示例，标记维度 E/I S/N T/F J/P
    questions: [
        // E/I 外向/内向 10题
        { text: '我更喜欢在人多的场合交流和获得能量', options:[{label:'A: 同意 (E)', value:'E'},{label:'B: 不同意 (I)', value:'I'}] },
        { text: '我喜欢独处或在小圈子中交流', options:[{label:'A: 不同意 (E)', value:'E'},{label:'B: 同意 (I)', value:'I'}] },
        { text: '我在人群中感到充满活力', options:[{label:'A: 同意 (E)', value:'E'},{label:'B: 不同意 (I)', value:'I'}] },
        { text: '我喜欢静静思考而不是热闹交际', options:[{label:'A: 不同意 (E)', value:'E'},{label:'B: 同意 (I)', value:'I'}] },
        { text: '我在社交场合中很容易表现自己', options:[{label:'A: 同意 (E)', value:'E'},{label:'B: 不同意 (I)', value:'I'}] },
        { text: '我通常更喜欢独自处理问题', options:[{label:'A: 不同意 (E)', value:'E'},{label:'B: 同意 (I)', value:'I'}] },
        { text: '我乐于主动结识新朋友', options:[{label:'A: 同意 (E)', value:'E'},{label:'B: 不同意 (I)', value:'I'}] },
        { text: '我更享受安静的环境', options:[{label:'A: 不同意 (E)', value:'E'},{label:'B: 同意 (I)', value:'I'}] },
        { text: '我在群体活动中感到充满动力', options:[{label:'A: 同意 (E)', value:'E'},{label:'B: 不同意 (I)', value:'I'}] },
        { text: '我喜欢先观察再参与', options:[{label:'A: 不同意 (E)', value:'E'},{label:'B: 同意 (I)', value:'I'}] },

        // S/N 感觉/直觉 10题
        { text: '我更关注现实、具体细节', options:[{label:'A: 同意 (S)', value:'S'},{label:'B: 不同意 (N)', value:'N'}] },
        { text: '我更关注未来、可能性', options:[{label:'A: 不同意 (S)', value:'S'},{label:'B: 同意 (N)', value:'N'}] },
        { text: '我喜欢用经验解决问题', options:[{label:'A: 同意 (S)', value:'S'},{label:'B: 不同意 (N)', value:'N'}] },
        { text: '我喜欢探索抽象理论', options:[{label:'A: 不同意 (S)', value:'S'},{label:'B: 同意 (N)', value:'N'}] },
        { text: '我重视实际和现有事实', options:[{label:'A: 同意 (S)', value:'S'},{label:'B: 不同意 (N)', value:'N'}] },
        { text: '我喜欢想象各种可能发生的情况', options:[{label:'A: 不同意 (S)', value:'S'},{label:'B: 同意 (N)', value:'N'}] },
        { text: '我依赖经验判断事物', options:[{label:'A: 同意 (S)', value:'S'},{label:'B: 不同意 (N)', value:'N'}] },
        { text: '我喜欢提出新颖的想法和创意', options:[{label:'A: 不同意 (S)', value:'S'},{label:'B: 同意 (N)', value:'N'}] },
        { text: '我注重眼前可见的事物', options:[{label:'A: 同意 (S)', value:'S'},{label:'B: 不同意 (N)', value:'N'}] },
        { text: '我常思考未来可能发生的情况', options:[{label:'A: 不同意 (S)', value:'S'},{label:'B: 同意 (N)', value:'N'}] },

        // T/F 思考/情感 10题
        { text: '我做决定更依赖逻辑和事实', options:[{label:'A: 同意 (T)', value:'T'},{label:'B: 不同意 (F)', value:'F'}] },
        { text: '我做决定更依赖情感和他人感受', options:[{label:'A: 不同意 (T)', value:'T'},{label:'B: 同意 (F)', value:'F'}] },
        { text: '我更重视客观分析', options:[{label:'A: 同意 (T)', value:'T'},{label:'B: 不同意 (F)', value:'F'}] },
        { text: '我更关心他人的感受', options:[{label:'A: 不同意 (T)', value:'T'},{label:'B: 同意 (F)', value:'F'}] },
        { text: '我倾向用逻辑解决问题', options:[{label:'A: 同意 (T)', value:'T'},{label:'B: 不同意 (F)', value:'F'}] },
        { text: '我会考虑决策对他人的影响', options:[{label:'A: 不同意 (T)', value:'T'},{label:'B: 同意 (F)', value:'F'}] },
        { text: '我喜欢理性分析事情', options:[{label:'A: 同意 (T)', value:'T'},{label:'B: 不同意 (F)', value:'F'}] },
        { text: '我容易受到他人情绪影响', options:[{label:'A: 不同意 (T)', value:'T'},{label:'B: 同意 (F)', value:'F'}] },
        { text: '我判断问题主要依据事实和逻辑', options:[{label:'A: 同意 (T)', value:'T'},{label:'B: 不同意 (F)', value:'F'}] },
        { text: '我做事会考虑人与人之间的关系', options:[{label:'A: 不同意 (T)', value:'T'},{label:'B: 同意 (F)', value:'F'}] },

        // J/P 判断/知觉 10题
        { text: '我喜欢计划、有条理地安排生活', options:[{label:'A: 同意 (J)', value:'J'},{label:'B: 不同意 (P)', value:'P'}] },
        { text: '我喜欢灵活、随性地处理事情', options:[{label:'A: 不同意 (J)', value:'J'},{label:'B: 同意 (P)', value:'P'}] },
        { text: '我倾向提前安排和组织', options:[{label:'A: 同意 (J)', value:'J'},{label:'B: 不同意 (P)', value:'P'}] },
        { text: '我喜欢顺其自然，不刻意计划', options:[{label:'A: 不同意 (J)', value:'J'},{label:'B: 同意 (P)', value:'P'}] },
        { text: '我喜欢按时间表行事', options:[{label:'A: 同意 (J)', value:'J'},{label:'B: 不同意 (P)', value:'P'}] },
        { text: '我倾向灵活应对变化', options:[{label:'A: 不同意 (J)', value:'J'},{label:'B: 同意 (P)', value:'P'}] },
        { text: '我注重完成任务的计划性', options:[{label:'A: 同意 (J)', value:'J'},{label:'B: 不同意 (P)', value:'P'}] },
        { text: '我更喜欢随时应变而非严格执行计划', options:[{label:'A: 不同意 (J)', value:'J'},{label:'B: 同意 (P)', value:'P'}] },
        { text: '我喜欢有条理地安排工作和生活', options:[{label:'A: 同意 (J)', value:'J'},{label:'B: 不同意 (P)', value:'P'}] },
        { text: '我喜欢灵活处理日常事务', options:[{label:'A: 不同意 (J)', value:'J'},{label:'B: 同意 (P)', value:'P'}] }
    ],

    answers: {},
    result: null
  },

  onSelect(e) {
    const index = e.currentTarget.dataset.index
    const value = e.detail.value
    this.setData({
      answers: { ...this.data.answers, [index]: value }
    })
  },

  submit() {
    if (Object.keys(this.data.answers).length < this.data.questions.length) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    // 统计四维度得分
    const dims = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 }
    Object.values(this.data.answers).forEach(v => dims[v] += 1)

    const EI = dims.E >= dims.I ? 'E' : 'I'
    const SN = dims.S >= dims.N ? 'S' : 'N'
    const TF = dims.T >= dims.F ? 'T' : 'F'
    const JP = dims.J >= dims.P ? 'J' : 'P'

    const type = EI + SN + TF + JP

    const descriptions = {
      ISTJ:'负责、实际、细致',
      ISFJ:'体贴、忠诚、稳重',
      INFJ:'理想主义、富有洞察力',
      INTJ:'理性、战略型、独立',
      ISTP:'冷静、分析型、灵活',
      ISFP:'温和、感性、灵活',
      INFP:'理想主义、忠诚、创造',
      INTP:'理性、好奇、独立思考',
      ESTP:'外向、行动导向、适应力强',
      ESFP:'外向、友善、享乐型',
      ENFP:'热情、创新、善于沟通',
      ENTP:'聪明、好辩、喜欢挑战',
      ESTJ:'组织能力强、效率导向',
      ESFJ:'合群、热心、注重他人',
      ENFJ:'领导力强、善于沟通',
      ENTJ:'战略型、果断、目标导向'
    }

    // 维度详情
    const dimDetails = {
      E: '外向 - 从外界获得能量',
      I: '内向 - 从内在获得能量',
      S: '感觉 - 关注现实具体信息',
      N: '直觉 - 关注未来可能性',
      T: '思考 - 做决定依赖逻辑',
      F: '情感 - 做决定依赖情感',
      J: '判断 - 倾向于计划有条理',
      P: '知觉 - 倾向于灵活随性'
    }

    this.setData({
      result: {
        type,
        desc: descriptions[type] || '',
        dimDetails,
        dims: {
          EI: { E: dims.E, I: dims.I, label: '外向(E) / 内向(I)' },
          SN: { S: dims.S, N: dims.N, label: '感觉(S) / 直觉(N)' },
          TF: { T: dims.T, F: dims.F, label: '思考(T) / 情感(F)' },
          JP: { J: dims.J, P: dims.P, label: '判断(J) / 知觉(P)' }
        },
        note: 'MBTI 是性格倾向评估工具，反映偏好而非能力优劣'
      }
    })
  }
})
