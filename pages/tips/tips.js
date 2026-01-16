const app = getApp()

const tipsMap = {
  control: [
    '意识到哪些行为属于干预你的决策，记录模式。',
    '在重要决定前列出自己的优先事项，明确边界后再讨论。',
    '当对方干预时使用“I感受…”句式表达需求，减少冲突。',
    '必要时延迟决策，确保选择来源于自身意愿。',
    '每天写下三件自己做出的独立决定，增强自主感。',
    '对干预行为保持观察者心态，分清事实与情绪反应。',
    '当产生不满时，先深呼吸再回应，避免情绪化。',
    '建立自我确认机制，确保重要决策由自身主导。',
    '与信任的人讨论决策过程，获得第三方视角。',
    '定期回顾被干预的模式，识别趋势并制定应对策略。'
  ],
  devalue: [
    '承认自己的感受，避免轻易否定自己的情绪。',
    '将感受写下来，与信任的人分享以获得支持。',
    '在沟通中使用“I感受…”句式表达自己，减少被弱化可能。',
    '每天写下三件自己做得好的事情，强化自我价值。',
    '记录贬低言语或行为模式，在安全环境中讨论。',
    '感受到被轻视时，先冷静回应而非顺从或冲突。',
    '练习积极自我肯定，如每天对自己说“我值得尊重”。',
    '与信任的人讨论边界问题，获得支持和反馈。',
    '识别潜在操控行为，学会保持心理防护。',
    '设置个人情绪恢复时间，缓解被贬低带来的压力。'
  ],
  selfish: [
    '评估关系中的付出与回报是否平衡，明确界限。',
    '学会说“不”，拒绝过度牺牲自己满足他人需求。',
    '设定小目标保护自身利益，避免被消耗。',
    '优先安排自我时间，维护心理和身体能量。',
    '观察互动模式，识别自我为中心行为信号。',
    '在冲突中坚持公平原则，避免盲目妥协。',
    '记录自己积极行动的效果，增强正向反馈。',
    '当对方过度自我中心时，先暂停再回应，确保情绪稳定。',
    '设定明确期望，防止对方过度索取。',
    '定期回顾付出与回报差异，做出调整或沟通。'
  ],
  emotional: [
    '留意自己情绪被影响的时刻，做情绪记录。',
    '设定个人情绪恢复时间，如短暂休息、冥想或散步。',
    '练习深呼吸或正念，让情绪不被外界牵动过度。',
    '建立情绪缓冲机制，如写日记、听音乐或运动。',
    '识别情绪触发点，提前准备应对策略。',
    '在互动中尝试保持观察者心态，分清自身与他人情绪。',
    '当情绪被影响时，先记录感受再回应，避免冲动。',
    '练习正向自我对话，如“我可以处理这些情绪”。',
    '通过运动或休息释放积累的情绪压力。',
    '定期回顾情绪波动，寻找模式并调整策略。'
  ],
  manipulation: [
    '识别暗示性压力，如“你不想的话就算了”可能在影响决定。',
    '在决策前停顿，问自己是否真正想做。',
    '与信任的人讨论情况，获得第三方视角。',
    '练习反问技巧，如“你希望我怎么做？”，避免被引导。',
    '关注行为模式而非单次事件，形成清晰判断。',
    '记录决策过程，确保自主选择。',
    '当感到受操控时，先深呼吸再回应，保持心理稳定。',
    '练习坚定语言和肢体语言，保护决策权。',
    '识别操控的触发情境，提前准备应对策略。',
    '在必要时寻求专业建议或信任朋友帮助分析情况。'
  ],
  distrust: [
    '注意质疑的频率与情境，记录事实。',
    '必要时要求明确沟通，避免模糊指责。',
    '维护边界，确保信息和行为透明可控。',
    '建立信任评估机制，区分合理质疑与不必要怀疑。',
    '寻求第三方或专业意见，核实指控是否合理。',
    '保持冷静回应，避免情绪化反应。',
    '练习正向沟通，清晰表达自己的观点和边界。',
    '识别反复质疑模式，制定心理防护策略。',
    '设定心理安全区，与信任人确认感受与判断。',
    '记录成功处理质疑的案例，增强自我信心。'
  ],
  emotional_drain: [
    '安排每日情绪修复时间，如运动、读书或听音乐。',
    '定期做心理减压练习，保持心理能量。',
    '避免长时间沉浸于消耗性关系，必要时短暂断开。',
    '设定每日或每周情绪检查点，监控能量水平。',
    '建立社交支持网络，在压力时寻求帮助。',
    '区分消耗性关系和建设性关系，调整投入比例。',
    '练习正向自我确认，认可自己付出的合理性。',
    '当能量被消耗时，优先处理自身需要再回应他人。',
    '记录消耗模式，形成行为认知图谱。',
    '使用情绪管理工具，如冥想或呼吸练习，缓解心理疲劳。'
  ],
  self_doubt: [
    '记录关键事实和证据，帮助确认判断。',
    '对不安感进行反思，而非盲目自责。',
    '向信任的人或专业人士寻求反馈和建议。',
    '练习自我肯定，记录个人成就和正向反馈。',
    '建立理性决策流程，减少情绪干扰。',
    '识别触发自我怀疑事件，提前准备应对策略。',
    '练习情境重构，将消极想法转化为学习机会。',
    '在怀疑时暂停做出重大决策，保护心理安全。',
    '记录成功决策案例，增强自信。',
    '与信任的人讨论不确定情境，获取支持和确认。'
  ],
  boundary_erosion: [
    '明确列出底线和界限，并在互动中坚持。',
    '被挑战时及时提醒自己：“这是我的界限。”',
    '学会礼貌而坚定地拒绝侵犯界限的请求。',
    '定期评估个人界限是否被尊重，必要时调整策略。',
    '使用坚定语言和肢体语言维护边界。',
    '在压力环境中，先暂停再回应，确保界限不被突破。',
    '与信任的人讨论界限问题，获得支持和建议。',
    '记录成功坚持界限的案例，增强自我效能感。',
    '识别侵界情境，提前制定应对策略。',
    '练习自我肯定，确认维护界限是合理和必要的。'
  ],
  guilt_pressure: [
    '分辨责任和过度内疚，避免被操控。',
    '承受压力时先自问：“我是否真正愿意承担？”',
    '建立自我确认机制，肯定自己的合理选择。',
    '识别操控性内疚言语，保持心理防护意识。',
    '练习情境重构，将压力和责任分离。',
    '必要时向信任的人说明情况，寻求支持。',
    '练习说“不”并保持情绪稳定，拒绝非合理要求。',
    '记录成功应对内疚压力的案例，增强自信。',
    '识别内疚触发点，提前准备心理应对策略。',
    '定期反思责任边界，确保不被过度操控。'
  ],
  avoidance: [
    '逐步练习安全表达自己的真实感受。',
    '用书面形式或信任朋友作为练习场景。',
    '小步尝试在低风险环境中表达不满或不同意见。',
    '识别回避模式触发点，建立应对策略。',
    '在互动中先确认自身感受再表达。',
    '设定明确表达目标，逐步增加难度和频率。',
    '记录成功表达案例，增强自我信心。',
    '练习正向自我肯定，认可自己表达的合理性。',
    '在情绪紧张时使用深呼吸或冥想缓解压力。',
    '与信任人分享表达体验，获得反馈和心理支持。'
  ],
  imbalance: [
    '审视付出与回报结构，确认关系是否公平。',
    '为自己制定合理的时间和精力分配计划。',
    '学会在不公平付出时表达感受并设定界限。',
    '记录付出与回报差异，进行客观分析。',
    '练习公平沟通技巧，确保双方理解和尊重。',
    '优先处理对自身心理和健康影响大的不平衡情况。',
    '记录成功处理不平衡情境的案例，增强自我效能感。',
    '识别反复不平衡模式，制定长期应对策略。',
    '与信任的人讨论付出与回报，获得第三方视角。',
    '练习正向自我肯定，认可自己合理付出的价值。'
  ]
}

const dimNameMap = {
  control:'控制行为',
  devalue:'轻视行为',
  selfish:'自我为主',
  emotional:'情绪影响',
  manipulation:'暗示操控',
  distrust:'不信任行为',
  emotional_drain:'情绪消耗',
  self_doubt:'自我怀疑',
  boundary_erosion:'界限削弱',
  guilt_pressure:'内疚压力',
  avoidance:'回避表达',
  imbalance:'付出失衡'
}

// Reverse mapping: user-friendly name to technical name
const reverseDimMap = {
  '控制行为': 'control',
  '情感贬低': 'devalue',  // Note: This matches the name used in result.js
  '自我中心': 'selfish',  // Note: This matches the name used in result.js
  '情绪依赖': 'emotional', // Note: This matches the name used in result.js
  '操纵行为': 'manipulation', // Note: This matches the name used in result.js
  '不信任': 'distrust', // Note: This matches the name used in result.js
  '情绪消耗': 'emotional_drain',
  '自我怀疑': 'self_doubt',
  '边界侵蚀': 'boundary_erosion',  // Note: This matches the name used in result.js
  '内疚施压': 'guilt_pressure', // Note: This matches the name used in result.js
  '回避沟通': 'avoidance', // Note: This matches the name used in result.js
  '付出失衡': 'imbalance',
  // Also include the original dimNameMap mappings for backward compatibility
  ...Object.fromEntries(Object.entries(dimNameMap).map(([key, value]) => [value, key]))
}

// Dimension color mapping for visual enhancement
const dimColors = {
  'control': '#FF6B6B',        // 红色 - 控制行为
  'devalue': '#FFA502',        // 橙色 - 情感贬低
  'selfish': '#FFD93D',        // 黄色 - 自我中心
  'emotional': '#6BCB77',      // 绿色 - 情绪依赖
  'manipulation': '#4D96FF',   // 蓝色 - 操纵行为
  'distrust': '#9D84B7',       // 紫色 - 不信任
  'emotional_drain': '#FF6B6B', // 红色 - 情绪消耗
  'self_doubt': '#FFA502',      // 橙色 - 自我怀疑
  'boundary_erosion': '#FFD93D',// 黄色 - 边界侵蚀
  'guilt_pressure': '#6BCB77',  // 绿色 - 内疚施压
  'avoidance': '#4D96FF',       // 蓝色 - 回避沟通
  'imbalance': '#9D84B7',       // 紫色 - 付出失衡
  '一般建议': '#6C757D'        // 灰色 - 一般建议
}

Page({
  data:{
    tips:[]
  },
  onLoad(){    console.log('Analysis data in tips.js:', app.globalData.analysis);
    const analysis = app.globalData.analysis || {}
    const tips = []

    console.log('Reverse dimension map:', reverseDimMap);
    console.log('Tips map keys:', Object.keys(tipsMap));

    // 正向维度高风险
    const tirsHigh = Array.isArray(analysis.tirsHigh) ? analysis.tirsHigh : [];
    console.log('TIRS High dimensions:', tirsHigh);
    
    tirsHigh.forEach(dim=>{
      console.log('Processing TIRS dimension:', dim);
      // Get the technical name from the user-friendly name
      const techDim = reverseDimMap[dim] || dim
      console.log('Technical dimension:', techDim);
      // Get the suggestions using the technical name
      const suggestions = tipsMap[techDim] || []
      console.log('Suggestions found:', suggestions);
      
      if (suggestions.length > 0) {
        console.log('Adding tips for:', dim);
        // Get color for this dimension
        const color = dimColors[techDim] || dimColors['一般建议'];
        tips.push({ 
          dimName: dim, // Keep the user-friendly name for display
          suggestions: suggestions,
          color: color
        })
      } else {
        console.log('No suggestions found for:', techDim);
      }
    })
    
    // 反向维度最高
    const rDim = analysis.rtdrsTop
    console.log('RTDRS Top dimension:', rDim);
    if(rDim){
      console.log('Processing RTDRS dimension:', rDim);
      // Get the technical name from the user-friendly name
      const techDim = reverseDimMap[rDim] || rDim
      console.log('Technical dimension:', techDim);
      // Get the suggestions using the technical name
      const suggestions = tipsMap[techDim] || []
      console.log('Suggestions found:', suggestions);
      
      if (suggestions.length > 0) {
        console.log('Adding tips for:', rDim);
        // Get color for this dimension
        const color = dimColors[techDim] || dimColors['一般建议'];
        tips.push({ 
          dimName: rDim, // Keep the user-friendly name for display
          suggestions: suggestions,
          color: color
        })
      } else {
        console.log('No suggestions found for:', techDim);
      }
    }

    // If no tips found, provide general tips
    console.log('Tips before fallback:', tips);
    if (tips.length === 0) {
      console.log('Adding fallback tips');
      tips.push({
        dimName: '一般建议',
        suggestions: [
          '保持良好的自我觉察，定期反思关系质量。',
          '建立支持系统，与信任的朋友或家人保持联系。',
          '关注自己的情绪健康，必要时寻求专业帮助。'
        ],
        color: dimColors['一般建议']
      })
    }
    
    // Ensure every tip has at least one suggestion and color
    const safeTips = tips.map(tip => {
      const safeTip = {
        ...tip,
        color: tip.color || dimColors['一般建议']
      };
      
      if (!Array.isArray(tip.suggestions) || tip.suggestions.length === 0) {
        return {
          ...safeTip,
          suggestions: ['保持冷静，理性思考问题，寻求支持。']
        };
      }
      return safeTip;
    });
    
    console.log('Final tips:', safeTips);
    this.setData({ tips: safeTips })
  }
})
