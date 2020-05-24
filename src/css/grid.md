# grid 布局

采用网格布局的区域，称为"容器"（container）。容器内部采用网格定位的子元素，称为"项目"（item）

```html
<div>
  <div>
    <p>1</p>
  </div>
  <div>
    <p>2</p>
  </div>
  <div>
    <p>3</p>
  </div>
</div>
```

上面代码中，最外层的`<div>`元素就是容器，内层的三个`<div`>元素就是项目。

注意：项目只能是容器的顶层子元素，不包含项目的子元素，比如上面代码的`<p>`元素就不是项目。Grid 布局只对项目生效。

Grid 布局的属性分成两类。一类定义在容器上面，称为容器属性；另一类定义在项目上面，称为项目属性。这部分先介绍容器属性。

```css
div {
  display: grid;
}
```

默认情况下，容器元素都是块级元素，但也可以设成行内元素。

注意，设为网格布局以后，容器子元素（项目）的 float、display: inline-block、display: table-cell、vertical-align 和 column-\*等设置都将失效。

grid-template-columns 属性定义每一列的列宽，grid-template-rows 属性定义每一行的行高。

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
}

.container {
  display: grid;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
  /* grid-template-columns: repeat(2, 100px 20px 80px);
  // 定义6列  第一列和第四列的宽度为100px，第二列和第五列为20px，第三列和第六列为80px */
}
/* repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值  */

.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
}
/*
单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充   */

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* 网格布局提供了fr关键字（fraction 的缩写，意为"片段"）。如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。 */

.container {
  display: grid;
  grid-template-columns: 150px 1fr 2fr;
}
```
