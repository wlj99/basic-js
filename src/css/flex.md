# flex

## 容器的属性

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
