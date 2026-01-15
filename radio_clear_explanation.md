# 如何清除选中的 Radio 按钮

## 实现原理

在微信小程序中，`radio-group` 组件通过 `value` 属性与数据绑定，实现单选按钮的选中状态管理。要清除选中状态，只需将绑定的数据属性重置为空字符串即可。

## 当前实现分析

在 `forward.js` 文件中，当用户点击"下一题"按钮时，代码已经实现了清除选中状态的逻辑：

```javascript
this.setData({
  index: nextIndex,
  current: questions[nextIndex],
  selectedValue: ''  // 这里清除了选中状态
})
```

## 手动清除选中状态

如果需要在其他场景下清除选中状态（例如添加一个"清除选择"按钮），可以按照以下方式实现：

### 1. 添加清除按钮（可选）

在 `forward.wxml` 中添加一个清除按钮：

```html
<button class="clear-btn" bindtap="clearSelection">清除选择</button>
```

### 2. 实现清除函数

在 `forward.js` 中添加清除选择的函数：

```javascript
clearSelection() {
  this.setData({
    selectedValue: ''  // 将绑定的值重置为空字符串
  })
}
```

## 核心逻辑说明

- `radio-group` 的 `value` 属性绑定到 `selectedValue` 数据
- 当 `selectedValue` 为空字符串时，没有任何 `radio` 按钮会被选中
- 当用户选择一个 `radio` 时，`bindchange` 事件会更新 `selectedValue`
- 通过 `setData` 将 `selectedValue` 设为空字符串，即可清除所有选中状态

## 完整示例

### WXML 文件

```html
<radio-group bindchange="onChange" value="{{selectedValue}}">
  <view wx:for="{{options}}" wx:key="value" wx:for-item="option" class="option">
    <label class="radio-label">
      <radio value="{{option.value}}" />
      <text>{{option.label}}</text>
    </label>
  </view>
</radio-group>

<button class="next-btn" bindtap="next">下一题</button>
<button class="clear-btn" bindtap="clearSelection">清除选择</button>
```

### JS 文件

```javascript
Page({
  data: {
    // ... 其他数据
    selectedValue: ''
  },
  
  // ... 其他函数
  
  clearSelection() {
    this.setData({
      selectedValue: ''
    })
  }
})
```

这样就可以实现手动清除选中的 Radio 按钮的功能。