const app = getApp()

const questions = [
  // emotional_drain
  { id: 1, dim: 'emotional_drain', question: '这段关系是否让你感到情绪被消耗？' },
  { id: 2, dim: 'emotional_drain', question: '你是否经常感到在这段关系中精力被占用过多？' },
  { id: 3, dim: 'emotional_drain', question: '在互动结束后，你是否需要很长时间恢复情绪？' },

  // self_doubt
  { id: 4, dim: 'self_doubt', question: '你是否因此怀疑自己的判断？' },
  { id: 5, dim: 'self_doubt', question: '当对方提出批评时，你是否容易怀疑自己的能力？' },
  { id: 6, dim: 'self_doubt', question: '你是否常常回顾自己的决定，担心不够正确？' },

  // boundary_erosion
  { id: 7, dim: 'boundary_erosion', question: '你的个人界限是否被削弱？' },
  { id: 8, dim: 'boundary_erosion', question: '你是否在关系中感到难以拒绝对方的要求？' },
  { id: 9, dim: 'boundary_erosion', question: '你是否为了避免冲突而忽略自己的需求？' },

  // guilt_pressure
  { id: 10, dim: 'guilt_pressure', question: '你是否经常感到内疚或被施压？' },
  { id: 11, dim: 'guilt_pressure', question: '你是否会因对方的情绪而承担额外责任？' },
  { id: 12, dim: 'guilt_pressure', question: '你是否担心拒绝会让对方失望或生气？' },

  // avoidance
  { id: 13, dim: 'avoidance', question: '你是否回避表达真实感受？' },
  { id: 14, dim: 'avoidance', question: '你是否避免与对方讨论敏感话题以保持关系平稳？' },
  { id: 15, dim: 'avoidance', question: '当有分歧时，你是否倾向于沉默或退缩？' },

  // imbalance
  { id: 16, dim: 'imbalance', question: '你是否感到关系付出不平衡？' },
  { id: 17, dim: 'imbalance', question: '你是否经常承担更多责任，而对方贡献较少？' },
  { id: 18, dim: 'imbalance', question: '你是否感到投入与回报不匹配，产生不满？' }
]


Page({
  data: {
    index:0,
    current:questions[0],
    selectedValue:'',
    options:[
      { value:'0', label:'从不' },
      { value:'1', label:'偶尔' },
      { value:'2', label:'经常' },
      { value:'3', label:'几乎总是' }
    ],
    questionsLength: questions.length
  },

  onChange(e){
    this.setData({ selectedValue: e.detail.value })
  },

  next() {
    if(this.data.selectedValue === ''){
      wx.showToast({ title:'请选择一个选项', icon:'none' })
      return
    }

    const { current, selectedValue } = this.data
    const { dim } = current

    if(!app.globalData.rtdrsAnswers[dim]){
      app.globalData.rtdrsAnswers[dim] = []
    }
    app.globalData.rtdrsAnswers[dim].push(Number(selectedValue))

    console.log(`Selected value for`, app.globalData)

    const nextIndex = this.data.index + 1
    if(nextIndex < questions.length){
      this.setData({
        index: nextIndex,
        current: questions[nextIndex],
        selectedValue:''
      })
    }else{
      wx.navigateTo({ url:'/pages/result/result' })
    }
  }
})
