Page({
  data: {
    questions: [
      '做事提不起兴趣或没有乐趣',
      '感到情绪低落、沮丧或绝望',
      '入睡困难、易醒或睡得过多',
      '感到疲倦或精力不足',
      '食欲不振或暴饮暴食',
      '觉得自己很糟，或觉得自己失败、让自己或家人失望',
      '难以集中注意力（如阅读、看电视）',
      '行动或说话变慢，或相反地坐立不安',
      '有不如死了算了，或以某种方式伤害自己的想法'
    ],
    options: [
      { label: '完全没有', value: 0 },
      { label: '几天', value: 1 },
      { label: '超过一半天数', value: 2 },
      { label: '几乎每天', value: 3 }
    ],
    impactOptions: [
      '完全没有',
      '有些困难',
      '非常困难',
      '极其困难'
    ],
    answers: {},
    impact: '',
    result: null
  },

  onSelect(e) {
    const index = e.currentTarget.dataset.index
    const value = Number(e.detail.value)
    this.setData({
      answers: { ...this.data.answers, [index]: value }
    })
  },

  onImpactSelect(e) {
    this.setData({ impact: e.detail.value })
  },

  submit() {
    if (Object.keys(this.data.answers).length < 9) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    const values = Object.values(this.data.answers)
    const score = values.reduce((a, b) => a + b, 0)
    const suicideItem = this.data.answers[8] // 第9题

    this.setData({
      result: this.getResult(score, suicideItem)
    })
  },

  getResult(score, suicideItem) {
    let level, desc, tip, levelClass, clinicalInfo, alert

    if (score <= 4) {
      level = '无/极轻度';
      desc = '结果处于正常范围';
      tip = '保持良好作息与情绪管理';
      levelClass = 'level-normal';
      clinicalInfo = null;
    } else if (score <= 9) {
      level = '轻度抑郁';
      desc = '存在一定抑郁症状';
      tip = '建议关注情绪与生活方式';
      levelClass = 'level-mild';
      clinicalInfo = null;
    } else if (score <= 14) {
      level = '中度抑郁';
      desc = '抑郁症状较明显';
      tip = '建议进一步心理评估';
      levelClass = 'level-moderate';
      clinicalInfo = {
        isClinical: true,
        note: '≥10分为抑郁障碍筛查推荐切点'
      };
    } else if (score <= 19) {
      level = '中重度抑郁';
      desc = '抑郁程度较高';
      tip = '建议专业心理干预';
      levelClass = 'level-moderate-severe';
      clinicalInfo = {
        isClinical: true,
        note: '≥10分为抑郁障碍筛查推荐切点'
      };
    } else {
      level = '重度抑郁';
      desc = '抑郁程度严重';
      tip = '强烈建议尽快就医评估';
      levelClass = 'level-severe';
      clinicalInfo = {
        isClinical: true,
        note: '≥10分为抑郁障碍筛查推荐切点'
      };
    }

    // 🚨 第9题安全提示（不论总分）
    if (suicideItem > 0) {
      alert = '你在问卷中提到自我伤害相关想法。请尽快联系专业人士或当地心理援助热线获取支持。'
    }

    return {
      score,
      level,
      desc,
      tip,
      levelClass,
      clinicalInfo,
      alert
    };
  }
})
