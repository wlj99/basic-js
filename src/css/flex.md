# flex

## 容器的属性

```css
div {
  display: flex;
}
```

设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效

flex-direction: row | row-reverse | column | column-reverse;
flex-wrap: nowrap | wrap | wrap-reverse;

flex-flow

- 是 flex-direction 属性和 flex-wrap 属性的简写
- 默认值为 row nowrap

justify-content: flex-start | flex-end | center | space-between | space-around;

- space-between：两端对齐，项目之间的间隔都相等，第一个和最后一个紧挨在边界
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

align-items: flex-start | flex-end | center | baseline | stretch;

- baseline: 项目的第一行文字的基线对齐。

align-content: flex-start | flex-end | center | space-between | space-around | stretch;

- 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

## 项目的属性

order

- 定义项目的排列顺序。数值越小，排列越靠前，默认为 0

flex-grow

- flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
- 项目的 flex-grow 属性都为 1，则它们将等分剩余空间

flex-shrink

- flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小
- 所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
- 负值对该属性无效

flex-basis

- flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间

flex

- flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto

align-self: auto | flex-start | flex-end | center | baseline | stretch

- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch

首先明确一点是， flex 是 flex-grow、flex-shrink、flex-basis 的缩写。故其取值可以考虑以下情况：

flex 的默认值是以上三个属性值的组合。假设以上三个属性同样取默认值，则 flex 的默认值是 0 1 auto。同理，如下是等同的：

```css
.item {
  flex: 2333 3222 234px;
}
.item {
  flex-grow: 2333;
  flex-shrink: 3222;
  flex-basis: 234px;
}
```

当 flex 取值为 none，则计算值为 0 0 auto，如下是等同的：

```css
.item {
  flex: none;
}
.item {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
}
```

当 flex 取值为 auto，则计算值为 1 1 auto，如下是等同的：

```css
.item {
  flex: auto;
}
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
```

当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

```css
.item {
  flex: 1;
}
.item {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
```

当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1，有如下等同情况（注意 0% 是一个百分比而不是一个非负数字）：

```css
.item-1 {
  flex: 0%;
}
.item-1 {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
}
.item-2 {
  flex: 24px;
}
.item-1 {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 24px;
}
```

当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%，如下是等同的：

```css
.item {
  flex: 2 3;
}
.item {
  flex-grow: 2;
  flex-shrink: 3;
  flex-basis: 0%;
}
```

当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1，如下是等同的：

```css
.item {
  flex: 2333 3222px;
}
.item {
  flex-grow: 2333;
  flex-shrink: 1;
  flex-basis: 3222px;
}
```

flex-basis 规定的是子元素的基准值。所以是否溢出的计算与此属性息息相关。flex-basis 规定的范围取决于 box-sizing。这里主要讨论以下 flex-basis 的取值情况：

auto：首先检索该子元素的主尺寸，如果主尺寸不为 auto，则使用值采取主尺寸之值；如果也是 auto，则使用值为 content。

content：指根据该子元素的内容自动布局。有的用户代理没有实现取 content 值，等效的替代方案是 flex-basis 和主尺寸都取 auto。

百分比：根据其包含块（即伸缩父容器）的主尺寸计算。如果包含块的主尺寸未定义（即父容器的主尺寸取决于子元素），则计算结果和设为 auto 一样。
