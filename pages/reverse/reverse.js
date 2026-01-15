const app = getApp()

const questions = [
  { id:1, dim:'emotional_drain', question:'这段关系是否让你感到情绪被消耗？' },
  { id:2, dim:'self_doubt', question:'你是否因此怀疑自己的判断？' },
  { id:3, dim:'boundary_erosion', question:'你的个人界限是否被削弱？' },
  { id:4, dim:'guilt_pressure', question:'你是否经常感到内疚或被施压？' },
  { id:5, dim:'avoidance', question:'你是否回避表达真实感受？' },
  { id:6, dim:'imbalance', question:'你是否感到关系付出不平衡？' }
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
    ]
  },

  onChange(e){
    console.log('Selected value:', e.detail.value)
    this.setData({ selectedValue: e.detail.value }, () => {
      console.log('selectedValue after setData:', this.data.selectedValue)
    })
  },

  next(){
    console.log('Checking selectedValue in next():', this.data.selectedValue)
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
