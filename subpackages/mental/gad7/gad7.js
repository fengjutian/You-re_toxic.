Page({
  data: {
    questions: [
      '感到紧张、焦虑或坐立不安',
      '不能停止或控制担忧',
      '对各种事情过度担心',
      '难以放松',
      '因为不安而难以静坐',
      '容易烦躁或易怒',
      '害怕将要发生可怕的事情'
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
    if (Object.keys(this.data.answers).length < 7) {
      wx.showToast({ title: '请完成所有题目', icon: 'none' })
      return
    }

    const score = Object.values(this.data.answers).reduce((a, b) => a + b, 0)
    this.setData({ result: this.getResult(score) })
  },

  getResult(score) {
    let level, desc, tip, levelClass, clinicalInfo;

    if (score <= 4) {
      level = '无/极轻度';
      desc = '结果处于正常范围';
      tip = '保持良好作息与压力管理';
      levelClass = 'level-normal';
      clinicalInfo = null;
    } else if (score <= 9) {
      level = '轻度焦虑';
      desc = '存在一定焦虑症状';
      tip = '建议关注压力来源并进行自我调节';
      levelClass = 'level-mild';
      clinicalInfo = null;
    } else if (score <= 14) {
      level = '中度焦虑';
      desc = '焦虑症状已较明显';
      tip = '建议进一步评估或心理干预';
      levelClass = 'level-moderate';
      clinicalInfo = {
        isClinical: true,
        note: '≥10分为广泛性焦虑障碍（GAD）筛查推荐切点'
      };
    } else {
      level = '重度焦虑';
      desc = '焦虑程度较高';
      tip = '高度建议专业心理/精神科评估';
      levelClass = 'level-severe';
      clinicalInfo = {
        isClinical: true,
        note: '≥10分为广泛性焦虑障碍（GAD）筛查推荐切点'
      };
    }

    return {
      score,
      level,
      desc,
      tip,
      levelClass,
      clinicalInfo
    };
  }
})
