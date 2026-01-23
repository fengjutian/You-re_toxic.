Page({
  data: {
    questions: [
      { text:'我对他人的动机会时常怀疑', factor:'偏执型', reverse:false },
      { text:'我容易记住别人对我的冒犯', factor:'偏执型', reverse:false },
      { text:'我很难轻易信任别人', factor:'偏执型', reverse:false },
      { text:'我对批评非常敏感', factor:'偏执型', reverse:false },

      { text:'我喜欢独处，不太主动社交', factor:'分裂型', reverse:false },
      { text:'我对社交活动兴趣不大', factor:'分裂型', reverse:false },
      { text:'我很少主动表达自己的感受', factor:'分裂型', reverse:false },
      { text:'我不喜欢参与群体活动', factor:'分裂型', reverse:false },

      { text:'我有时候想法比较奇特或另类', factor:'分裂型人格', reverse:false },
      { text:'我的行为有时让别人觉得怪异', factor:'分裂型人格', reverse:false },
      { text:'我对新奇事物有独特理解方式', factor:'分裂型人格', reverse:false },
      { text:'我有时难以让他人理解我的观点', factor:'分裂型人格', reverse:false },

      { text:'我容易冒险，规则意识不强', factor:'反社会型', reverse:false },
      { text:'我不太在意社会规范', factor:'反社会型', reverse:false },
      { text:'我做事常凭冲动而非计划', factor:'反社会型', reverse:false },
      { text:'我在处理规则或限制时容易反感', factor:'反社会型', reverse:false },

      { text:'我情绪容易大起大落', factor:'边缘型', reverse:false },
      { text:'我的人际关系容易波动', factor:'边缘型', reverse:false },
      { text:'我对被忽视或拒绝很敏感', factor:'边缘型', reverse:false },
      { text:'我有时难以控制冲动行为', factor:'边缘型', reverse:false },

      { text:'我喜欢成为关注的中心', factor:'戏剧型', reverse:false },
      { text:'我的情绪表现容易夸张', factor:'戏剧型', reverse:false },
      { text:'我希望他人注意我的感受', factor:'戏剧型', reverse:false },
      { text:'我擅长吸引他人的目光', factor:'戏剧型', reverse:false },

      { text:'我在意他人对我的评价', factor:'自恋型', reverse:false },
      { text:'我喜欢被别人称赞', factor:'自恋型', reverse:false },
      { text:'我常常觉得自己很特别', factor:'自恋型', reverse:false },
      { text:'我喜欢领导或主导他人', factor:'自恋型', reverse:false },

      { text:'我害怕被批评，常回避社交', factor:'回避型', reverse:false },
      { text:'我在人群中容易紧张', factor:'回避型', reverse:false },
      { text:'我不喜欢让别人注意到自己的弱点', factor:'回避型', reverse:false },
      { text:'我常避免新的社交挑战', factor:'回避型', reverse:false },

      { text:'我倾向依赖他人的决策', factor:'依赖型', reverse:false },
      { text:'我遇到困难时希望有人帮我', factor:'依赖型', reverse:false },
      { text:'我不喜欢独自做重要决定', factor:'依赖型', reverse:false },
      { text:'我希望他人为我提供指导', factor:'依赖型', reverse:false },

      { text:'我注重秩序、计划和完美', factor:'强迫型', reverse:false },
      { text:'我喜欢控制生活中的细节', factor:'强迫型', reverse:false },
      { text:'我对规则和标准非常关注', factor:'强迫型', reverse:false },
      { text:'我做事情往往追求完美', factor:'强迫型', reverse:false },
    ].map(q=>({
      ...q,
      options:[
        { label:'符合', value:1 },
        { label:'不符合', value:0 }
      ]
    })),

    answers: {},
    result: null
  },

  // 选择题回调
  onSelect(e) {
    const index = e.currentTarget.dataset.index
    const value = Number(e.detail.value)
    this.setData({
      answers:{ ...this.data.answers, [index]: value }
    })
  },

  // 提交
  submit() {
    if (Object.keys(this.data.answers).length < this.data.questions.length){
      wx.showToast({ title:'请完成所有题目', icon:'none' })
      return
    }

    // 统计各维度得分
    const scores = {}
    this.data.questions.forEach((q,i)=>{
      const val = this.data.answers[i]
      const score = q.reverse ? 1-val : val
      scores[q.factor] = (scores[q.factor]||0) + score
    })

    // 描述
    const descMap = {
      '偏执型':'倾向怀疑和敏感',
      '分裂型':'偏好独处和社交退缩',
      '分裂型人格':'思维或行为略独特',
      '反社会型':'规则意识弱，冒险倾向',
      '边缘型':'情绪波动大，人际关系不稳定',
      '戏剧型':'希望引起注意，情绪表达强烈',
      '自恋型':'自我中心，重视他人认可',
      '回避型':'害怕批评，社交回避',
      '依赖型':'倾向依赖他人',
      '强迫型':'注重秩序、完美和计划'
    }

    // 维度配置
    const maxScore = 4
    this.setData({
      result: Object.keys(scores).map(k=>{
        const score = scores[k]
        const percentage = Math.round(score / maxScore * 100)
        let level = '正常'
        let levelClass = 'level-normal'

        if (percentage >= 75) {
          level = '明显倾向'
          levelClass = 'level-high'
        } else if (percentage >= 50) {
          level = '轻度倾向'
          levelClass = 'level-mild'
        }

        return {
          key: k,
          score: score,
          maxScore: maxScore,
          percentage: percentage,
          level: level,
          levelClass: levelClass,
          desc: descMap[k]
        }
      })
    })
  }
})
