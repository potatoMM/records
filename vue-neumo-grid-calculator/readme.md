### Grid布局拟态Vue计算器 总结
##### Grid布局 
Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。
使用display: grid即可指定一个容器采用网格布局。
设为网格布局以后，容器子元素（项目）的float、display: inline-block、display: table-cell、vertical-align和column-*等设置都将失效。
grid-template-columns（定义列宽）、grid-template-rows（定义行高）两者可以使用百分比、绝对单位、repeat()函数、fr 关键字
```
.container {
  display: grid;
  /**绝对单位**/
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 50px 50px 50px 50px;
  /**百分比**/
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
  /**repeat(重复的次数,重复的值)**/
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%);
  /**比例关系**/
  grid-template-columns: 1fr 1fr;
}
```
个人觉得Gird布局优于Flex布局，优势在移动端更明显，但是兼容性还是需要多多注意。以下为Gird的几个学习网站有兴趣可以了解一下
[GirdMDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)
[Gird阮一峰教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
[Grid网页布局完全解构](https://www.bilibili.com/video/BV1XE41177oN)

### CSS变量
声明变量的时候，变量名前面要加两根连词线（--）
```
/**全局变量**/
:root{
  --main-color: #4d4e53;
  --margin-top: calc(2vh + 20px);
}
/**使用变量**/
.bar {
  /**var()函数用于读取变量**/
  color: var(--main-color);
  /**var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值**/
  background-color:var(--foo, #7F583F);
}
在计算器这个案例中，按钮的宽高就使用了定义变量的方法，方便了后续对于按钮圆角，结果显示处行高，布局处的计算。
更多css变量的应用场景知识大家可以参考[CSS 变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)
```

### 新拟态
新拟态主要是通过阴影来实现的，通过阴影实现凸凹两种质感。
新拟态风格有一些基本特点：
- 元素并不浮动
- 元素色彩相对单一，与背景高度统一
- 左上角亮色投影，右下角深色投影
- 多以卡片样式出现
- 更加适合大圆角图形
- ...
个人感觉有点 冷淡北欧风的那种赶脚哈哈哈～
我们再也不用麻烦UI设计师了，推荐大家用[Neumorphism在线工具](https://neumorphism.io/#55b9f3)来快速实现新拟态UI效果，你可以变调整边预览所见即所得，还有对应的代码段可以参考呢。

### VSCode
[VSCode快捷键文档](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
Mac下 多行选中操作（Alt+左键，按ESC退出）

### 现存bug问题
1. 可以输入11×011
2. 1+2±。本意为1+2后取反既-3，实际计算结果为1+2*-1得-1

### 待完善
1. 输入小数点的时候，发现前面是运算符号，则自动补一个0；
2. 输入运算符号的时候，发现前面是小数点，则自动删掉小数点；
3. 如果计算结束，并且下一次输入不是运算符，就触发AC；
4. 修复现有bug