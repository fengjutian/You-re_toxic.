Page({
  data: {
    questions:[
      // 作息规律
      { text:'我每天大致同一时间睡觉和起床', factor:'作息规律', reverse:false },
      { text:'我周末作息时间与工作日差别不大', factor:'作息规律', reverse:false },
      { text:'我很少熬夜', factor:'作息规律', reverse:false },
      { text:'我每天保证固定睡眠时间', factor:'作息规律', reverse:false },

      // 睡眠质量
      { text:'我容易入睡，睡眠深度良好', factor:'睡眠质量', reverse:false },
      { text:'我夜间很少醒来', factor:'睡眠质量', reverse:false },
      { text:'我早晨起床感觉精力充沛', factor:'睡眠质量', reverse:false },
      { text:'我入睡前很少受压力影响', factor:'睡眠质量', reverse:false },

      // 饮食习惯
      { text:'我有规律地吃三餐', factor:'饮食习惯', reverse:false },
      { text:'我注意饮食健康，避免垃圾食品', factor:'饮食习惯', reverse:false },
      { text:'我会摄入足够的蔬菜和水果', factor:'饮食习惯', reverse:false },
      { text:'我避免过量饮料和高糖食品', factor:'饮食习惯', reverse:false },

      // 运动习惯
      { text:'我每周会保持适量运动', factor:'运动习惯', reverse:false },
      { text:'我喜欢户外活动', factor:'运动习惯', reverse:false },
      { text:'我会规律锻炼身体', factor:'运动习惯', reverse:false },
      { text:'我在日常生活中保持活跃', factor:'运动习惯', reverse:false },

      // 电子产品使用
      { text:'我睡前很少使用手机或电脑', factor:'电子产品使用', reverse:false },
      { text:'我避免在床上看电子设备', factor:'电子产品使用', reverse:false },
      { text:'我不在睡前长时间刷社交软件', factor:'电子产品使用', reverse:false },
      { text:'我能控制睡前屏幕时间', factor:'电子产品使用', reverse:false },

      // 压力管理
      { text:'我能够较好管理日常压力', factor:'压力管理', reverse:false },
      { text:'我能通过运动或兴趣缓解压力', factor:'压力管理', reverse:false },
      { text:'我不会因压力影响睡眠', factor:'压力管理', reverse:false },
      { text:'我有适合自己的放松方法', factor:'压力管理', reverse:false },
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
      '作息规律': {
        name: '作息规律',
        desc: '测量上床和起床时间的规律性，反映个体的生物钟稳定性和作息管理能力',
        keywords: ['固定睡眠时间', '作息一致', '生物钟稳定'],
        advice: {
          high: '作息非常规律，继续保持！有助于保持良好的精神状态。',
          mid: '作息基本规律，可进一步优化周末和作息一致性。',
          low: '作息不够规律，建议逐步调整，每天固定睡眠时间。'
        }
      },
      '睡眠质量': {
        name: '睡眠质量',
        desc: '测量入睡难度、夜间醒来次数和睡眠深度，反映个体的睡眠健康状况',
        keywords: ['快速入睡', '深度睡眠', '精力充沛'],
        advice: {
          high: '睡眠质量很好，保持良好习惯可继续改善。',
          mid: '睡眠质量尚可，注意减少夜间干扰和压力影响。',
          low: '睡眠质量有待改善，建议优化睡眠环境和睡前放松。'
        }
      },
      '饮食习惯': {
        name: '饮食习惯',
        desc: '测量早餐规律性、饮食均衡程度和营养摄入情况，反映个体的饮食健康水平',
        keywords: ['规律三餐', '均衡营养', '健康饮食'],
        advice: {
          high: '饮食习惯非常健康，继续保持均衡营养。',
          mid: '饮食习惯基本良好，注意增加蔬果摄入和减少垃圾食品。',
          low: '饮食习惯需要改善，建议规律三餐，多吃蔬果，少油炸。'
        }
      },
      '运动习惯': {
        name: '运动习惯',
        desc: '测量运动频率、持续时间和日常活跃度，反映个体的身体活动水平',
        keywords: ['规律运动', '户外活动', '身体活跃'],
        advice: {
          high: '运动习惯很好，有助于身心健康！',
          mid: '运动习惯尚可，可尝试增加运动种类和频率。',
          low: '运动不足，建议从轻度运动开始，逐步增加运动量。'
        }
      },
      '电子产品使用': {
        name: '电子产品使用',
        desc: '测量睡前使用手机、电脑等电子设备的时间和习惯，反映个体的屏幕使用管理能力',
        keywords: ['控制屏幕时间', '睡前远离设备', '保护视力'],
        advice: {
          high: '电子设备使用控制很好，有助于改善睡眠和健康。',
          mid: '屏幕时间基本可控，注意睡前减少使用。',
          low: '电子设备使用过多，建议睡前1-2小时停止使用。'
        }
      },
      '压力管理': {
        name: '压力管理',
        desc: '测量日常压力对睡眠和生活的影响以及应对能力，反映个体的心理健康水平',
        keywords: ['情绪调节', '压力释放', '保持心态'],
        advice: {
          high: '压力管理能力很强，能有效应对生活压力！',
          mid: '压力管理基本良好，可学习更多放松技巧。',
          low: '压力管理需要提升，建议尝试运动、冥想等方式。'
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
        let advice = dimensionMap[k].advice.mid

        if (percentage >= 75) {
          level = '优秀'
          levelClass = 'level-high'
          advice = dimensionMap[k].advice.high
        } else if (percentage >= 50) {
          level = '良好'
          levelClass = 'level-good'
          advice = dimensionMap[k].advice.mid
        } else {
          level = '需改善'
          levelClass = 'level-low'
          advice = dimensionMap[k].advice.low
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
          advice: advice,
          keywords: dimensionMap[k].keywords
        }
      })
    })
  }
})
