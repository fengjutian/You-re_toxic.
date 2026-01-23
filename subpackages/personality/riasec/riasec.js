Page({
  data: {
    questions: [
      // R
      { text:'我喜欢修理或操作机械设备', options:[{label:'是',value:'R'},{label:'否',value:'X'}]},
      { text:'我更愿意做动手的事情', options:[{label:'是',value:'R'},{label:'否',value:'X'}]},
      { text:'我喜欢户外或实际操作的工作', options:[{label:'是',value:'R'},{label:'否',value:'X'}]},
      { text:'我对工具和设备感兴趣', options:[{label:'是',value:'R'},{label:'否',value:'X'}]},

      // I
      { text:'我喜欢分析问题并找出原因', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text:'我对科学或研究类内容感兴趣', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text:'我享受独立思考复杂问题', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},
      { text:'我喜欢探索未知领域', options:[{label:'是',value:'I'},{label:'否',value:'X'}]},

      // A
      { text:'我喜欢创作或艺术表达', options:[{label:'是',value:'A'},{label:'否',value:'X'}]},
      { text:'我不喜欢被规则严格限制', options:[{label:'是',value:'A'},{label:'否',value:'X'}]},
      { text:'我有较强的想象力', options:[{label:'是',value:'A'},{label:'否',value:'X'}]},
      { text:'我喜欢设计或写作', options:[{label:'是',value:'A'},{label:'否',value:'X'}]},

      // S
      { text:'我喜欢帮助他人解决问题', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text:'我愿意倾听他人的感受', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text:'我对教育或服务工作有兴趣', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},
      { text:'我享受与人互动', options:[{label:'是',value:'S'},{label:'否',value:'X'}]},

      // E
      { text:'我喜欢领导和影响他人', options:[{label:'是',value:'E'},{label:'否',value:'X'}]},
      { text:'我对商业或创业感兴趣', options:[{label:'是',value:'E'},{label:'否',value:'X'}]},
      { text:'我敢于承担风险', options:[{label:'是',value:'E'},{label:'否',value:'X'}]},
      { text:'我喜欢说服别人接受我的观点', options:[{label:'是',value:'E'},{label:'否',value:'X'}]},

      // C
      { text:'我做事有条理、按流程', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text:'我喜欢处理数据或表格', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text:'我遵守规则和制度', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
      { text:'我偏好稳定、清晰的工作', options:[{label:'是',value:'C'},{label:'否',value:'X'}]},
    ],
    answers: {},
    result: null
  },

  onSelect(e) {
    this.setData({
      answers: { ...this.data.answers, [e.currentTarget.dataset.index]: e.detail.value }
    })
  },

  submit() {
    if (Object.keys(this.data.answers).length < this.data.questions.length) {
      wx.showToast({ title:'请完成所有题目', icon:'none' })
      return
    }

    const score = { R:0,I:0,A:0,S:0,E:0,C:0 }
    Object.values(this.data.answers).forEach(v=>{
      if(score[v]!==undefined) score[v]++
    })

    const sorted = Object.entries(score).sort((a,b)=>b[1]-a[1])
    const code = sorted.slice(0,3).map(i=>i[0]).join('')

    const descMap = {
      R:'偏好实践与动手操作',
      I:'偏好研究与分析',
      A:'偏好创造与表达',
      S:'偏好助人与服务',
      E:'偏好领导与商业',
      C:'偏好规则与秩序'
    }

    const jobMap = {
      R:'工程师、技师、设备维护',
      I:'研究员、数据分析、科研',
      A:'设计师、作家、艺术创作',
      S:'教师、咨询、社会服务',
      E:'管理者、销售、创业',
      C:'财务、行政、运营'
    }

    // 六维度详细信息
    const dimDetails = {
      R: {
        name: '现实型',
        english: 'Realistic',
        desc: '擅长使用工具、机械设备，喜欢动手操作',
        keywords: ['实践', '操作', '工具']
      },
      I: {
        name: '研究型',
        english: 'Investigative',
        desc: '喜欢分析问题、探索未知领域',
        keywords: ['研究', '分析', '探索']
      },
      A: {
        name: '艺术型',
        english: 'Artistic',
        desc: '富有创造力，喜欢表达和创作',
        keywords: ['创造', '表达', '艺术']
      },
      S: {
        name: '社会型',
        english: 'Social',
        desc: '乐于助人，擅长人际互动',
        keywords: ['助人', '互动', '服务']
      },
      E: {
        name: '企业型',
        english: 'Enterprising',
        desc: '喜欢领导、销售和创业',
        keywords: ['领导', '销售', '创业']
      },
      C: {
        name: '常规型',
        english: 'Conventional',
        desc: '注重规则、秩序和数据处理',
        keywords: ['规则', '秩序', '数据']
      }
    }

    // 各维度得分
    const scores = Object.keys(score).map(dim => ({
      dim,
      ...dimDetails[dim],
      count: score[dim],
      max: 4,
      isMain: code.includes(dim)
    }))

    this.setData({
      result: {
        code,
        summary: code.split('').map(k=>descMap[k]).join(' / '),
        jobs: code.split('').map(k=>jobMap[k]).join('、'),
        scores,
        typeScope: '职业兴趣匹配',
        comparison: 'RIASEC 侧重职业兴趣，与其他测试工具互补'
      }
    })
  }
})
