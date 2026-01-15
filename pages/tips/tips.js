const app = getApp()

const tipsMap = {
  control:[
    '明确表达自己的决策边界，告知他人你的选择空间。',
    '在重要决定前，独立列出你的优先事项，再与对方讨论。',
    '记录每次被干预的场景，识别模式并适时沟通。'
  ],
  devalue:[
    '承认自己的感受，避免轻易否定自己的情绪。',
    '将自己的感受写下来，与信任的人分享以获得支持。',
    '在沟通中使用“I感受...”句式，减少被弱化的可能。'
  ],
  selfish:[
    '评估关系中的付出与回报是否平衡，明确界限。',
    '学会说“不”，拒绝过度牺牲自己满足他人需求。',
    '在合作或互动中设定小目标，保护自身利益。'
  ],
  emotional:[
    '留意自己情绪被影响的时刻，做情绪记录。',
    '设定个人情绪恢复时间，如短暂休息、冥想或散步。',
    '练习深呼吸或正念，让情绪不被外界牵动过度。'
  ],
  manipulation:[
    '识别对方言语或行为中的暗示性压力。',
    '在决策前先停顿，问自己是否真正想做。',
    '与信任的人讨论情况，获得第三方视角。'
  ],
  distrust:[
    '注意对方质疑自己的频率与情境，记录事实。',
    '在必要时要求明确沟通，避免模糊指责。',
    '维护自己的边界，确保信息和行为透明可控。'
  ],
  emotional_drain:[
    '安排每日情绪修复时间，如运动、读书或听音乐。',
    '定期做心理减压练习，保持心理能量。',
    '避免长时间沉浸于消耗性关系，必要时短暂断开。'
  ],
  self_doubt:[
    '记录关键事实和证据，帮助确认自己的判断。',
    '对出现的不安感进行反思，而非盲目自责。',
    '向信任的人或专业人士寻求反馈和建议。'
  ],
  boundary_erosion:[
    '明确列出自己的底线和界限，并在互动中坚持。',
    '在被挑战时及时提醒自己：“这是我的界限。”',
    '学会礼貌而坚定地拒绝侵犯界限的请求。'
  ],
  guilt_pressure:[
    '分辨责任和过度内疚，避免被操控。',
    '在承受压力时先自问：“我是否真正愿意承担？”',
    '建立自我确认机制，肯定自己的合理选择。'
  ],
  avoidance:[
    '逐步练习安全表达自己的真实感受。',
    '用书面形式或信任的朋友作为练习场景。',
    '小步尝试在低风险环境中表达不满或不同意见。'
  ],
  imbalance:[
    '审视付出与回报结构，确认关系是否公平。',
    '为自己制定合理的时间和精力分配计划。',
    '学会在不公平付出时表达感受并设定界限。'
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
        tips.push({ 
          dimName: dim, // Keep the user-friendly name for display
          suggestions: suggestions 
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
        tips.push({ 
          dimName: rDim, // Keep the user-friendly name for display
          suggestions: suggestions 
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
        ]
      })
    }
    
    // Ensure every tip has at least one suggestion
    const safeTips = tips.map(tip => {
      if (!Array.isArray(tip.suggestions) || tip.suggestions.length === 0) {
        return {
          ...tip,
          suggestions: ['保持冷静，理性思考问题，寻求支持。']
        };
      }
      return tip;
    });
    
    console.log('Final tips:', safeTips);
    this.setData({ tips: safeTips })
  }
})
