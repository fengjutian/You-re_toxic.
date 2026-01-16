const app = getApp()

/**
 * 维度名称映射表
 * 将技术维度键名映射为用户友好的中文名称
 * 
 * 技术键名: 用于数据存储和处理
 * 中文名称: 用于用户界面展示
 */
const dimNames = {
  'control': '控制行为',          // 对方对用户决定的干预程度
  'devalue': '情感贬低',          // 对方对用户感受的否定程度
  'selfish': '自我中心',          // 对方关注自身需求的程度
  'emotional': '情绪依赖',        // 对方情绪对用户的影响程度
  'manipulation': '操纵行为',      // 对方通过暗示影响用户的程度
  'distrust': '不信任',           // 对方对用户的质疑程度
  'emotional_drain': '情绪消耗',   // 关系对用户情绪的消耗程度
  'self_doubt': '自我怀疑',        // 关系引发用户自我质疑的程度
  'boundary_erosion': '边界侵蚀',   // 对方对用户个人界限的侵犯程度
  'guilt_pressure': '内疚施压',     // 对方使用户产生内疚感的程度
  'avoidance': '回避沟通',         // 用户回避表达真实感受的程度
  'imbalance': '付出失衡'          // 关系中付出与回报的不平衡程度
}

Page({
  data:{
    /**
     * 默认分析结果对象
     * 用于页面初始渲染和数据兜底
     */
    analysis:{
      status: '暂无明显结构性风险',  // 默认关系状态
      tirsHigh: [],                   // 默认高风险维度为空数组
      rtdrsTop: ''                    // 默认主要自我消耗体验为空字符串
    }
  },
  
  /**
   * 页面加载时执行的主算法
   * 1. 获取用户在两个评估页面的答案
   * 2. 计算高风险维度
   * 3. 确定主要自我消耗体验
   * 4. 评估关系整体状态
   * 5. 存储和展示分析结果
   */
  onLoad(){
    const tirs = app.globalData.tirsAnswers || {}
    const rtdrs = app.globalData.rtdrsAnswers || {}

    /**
     * 第一部分：TIRS (他人行为风险评估) 分析
     * 计算每个维度的加权平均分，识别高风险维度
     * 
     * 分析逻辑：
     * 1. 遍历所有TIRS维度
     * 2. 计算每个维度所有问题答案的平均值
     * 3. 如果平均值 >= 2（即"经常"或更严重），则标记为高风险维度
     * 4. 收集所有高风险维度的用户友好名称
     */
    const tirsHigh = [];
    
    // 遍历TIRS评估的所有维度
    Object.keys(tirs).forEach(dim => {
      // 获取当前维度的所有答案（默认为空数组）
      const arr = tirs[dim] || [];
      console.log(`Dimension ${dim}: Answers = [${arr.join(', ')}]`);
      
      // 如果该维度没有答案，跳过处理
      if (arr.length === 0) return;
      
      // 计算当前维度的平均分数
      // 使用reduce函数累加所有答案值，然后除以答案数量
      const avg = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / arr.length;
      console.log(`Dimension ${dim}: Average = ${avg}`);
      
      // 风险阈值判断：如果平均分 >= 2（对应选项"经常"）
      // 2分对应选项：'经常' (value: '2')
      // 3分对应选项：'几乎总是' (value: '3')
      if (avg >= 2) {
        // 将技术维度键名转换为用户友好的中文名称
        const dimName = dimNames[dim] || dim;
        console.log(`Adding high-risk dimension: ${dimName}`);
        // 添加到高风险维度数组
        tirsHigh.push(dimName);
      }
    });
    
    console.log('Final tirsHigh:', tirsHigh);

    /**
     * 第二部分：RTDRS (自我消耗风险评估) 分析
     * 找出自我消耗程度最高的维度
     * 
     * 分析逻辑：
     * 1. 遍历所有RTDRS维度
     * 2. 找出每个维度的最高分数（最严重的情况）
     * 3. 比较所有维度的最高分数，确定最严重的维度
     */
    let rtdrsTop = '';        // 存储最严重的自我消耗维度名称
    let maxVal = -1;          // 存储最高分数（初始化为-1确保任何有效分数都会替换它）
    
    // 遍历RTDRS评估的所有维度
    Object.keys(rtdrs).forEach(dim=>{
      // 获取当前维度的所有答案（默认为空数组）
      const arr = rtdrs[dim] || [];
      
      // 如果该维度没有答案，跳过处理
      if (arr.length === 0) return;
      
      // 找出当前维度的最高分数
      // 使用Math.max()函数找出数组中的最大值
      // 使用扩展运算符(...)将数组转换为参数列表
      const val = Math.max(...arr);
      
      // 如果当前维度的最高分数大于已知的最高分数
      if(val > maxVal){
        // 更新最高分数记录
        maxVal = val;
        // 更新最严重的自我消耗维度名称（使用用户友好名称）
        rtdrsTop = dimNames[dim] || dim;
      }
    });

    /**
     * 第三部分：关系整体状态评估
     * 根据TIRS和RTDRS的分析结果，综合判断关系的整体风险状态
     * 
     * 评估规则（优先级从高到低）：
     * 1. 高风险消耗型关系：≥2个高风险他人行为维度 AND 自我消耗程度≥2
     * 2. 内在压力/边界议题：0个高风险他人行为维度 AND 自我消耗程度≥2
     * 3. 潜在风险信号：≥1个高风险他人行为维度 AND 自我消耗程度≤1
     * 4. 低风险：不符合上述任何情况
     */
    // 默认状态为低风险
    let status = '暂无明显结构性风险';
    
    // 高风险消耗型关系判断
    if(tirsHigh.length >= 2 && maxVal >= 2){
      status = '呈现出高风险的消耗型关系特征';
    }
    // 内在压力/边界议题判断
    else if(tirsHigh.length === 0 && maxVal >= 2){
      status = '关系中可能存在内在压力或边界议题';
    }
    // 潜在风险信号判断
    else if(tirsHigh.length >= 1 && maxVal <= 1){
      status = '关系中存在潜在风险信号';
    }

    /**
     * 第四部分：数据兜底处理
     * 确保所有输出数据都有合理的默认值，避免页面显示异常
     */
    // 如果没有高风险维度，提供友好的兜底信息
    const safeTirsHigh = tirsHigh.length > 0 ? tirsHigh : ['未发现明显高风险维度'];
    
    /**
     * 第五部分：结果整合与存储
     * 整合所有分析结果，存储到全局数据，并更新页面显示
     */
    // 整合最终的分析结果
    const analysis = {
      status: status,                 // 关系整体状态
      tirsHigh: safeTirsHigh,        // 高风险他人行为维度
      rtdrsTop: rtdrsTop             // 最严重的自我消耗体验
    };
    
    // 将分析结果存储到全局数据，供其他页面使用
    app.globalData.analysis = analysis;
    
    // 更新页面数据，触发UI重新渲染
    this.setData({ analysis });
  },
  
  /**
   * 页面导航：前往保护建议页面
   * 
   * 用户点击"查看保护建议"按钮时触发
   * 使用wx.navigateTo()进行页面跳转
   */
  goTips(){
    wx.navigateTo({ url:'/pages/tips/tips' })
  }
})
