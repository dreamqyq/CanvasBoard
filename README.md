# CanvasBoard

#### 本项目的目的是用canvas做出一个画板，并支持PC端和移动端的使用

## V1.8

- 实现了清屏的效果
- 实现了可以手动更改画笔颜色的功能（默认为黑色）
- 实现了可以手动更改画笔粗细的功能（默认为normal档，即宽度为4）

## V1.7

- 解决了移动端画板的滚动条bug
- 改变了笔刷和橡皮擦的样式（使用icon）
- 增加了下载图像和清屏的按钮图标（逻辑暂未实现）

## V1.6

- 增加了特性检测，即 `if (document.body.ontouchstart !== undefined)`，即设备是否支持触摸事件
- 通过上述特性检测，添加了画板的移动端触摸事件逻辑

## V1.5

- 功能函数进行了整理与封装
- 解决了canvas全屏出现滚动条的bug（因为canvas本身是内联元素，需要设置`display:block`）
- 增加了鼠标点击一下画一个点的功能
- 增加了橡皮擦的功能按钮，点击按钮可切换成橡皮擦模式，再点击按钮为绘画模式


## V1.0

- 本版本仅完成画板的最基本功能
- 在项目完成过程中，尝试了使用onmousemove函数中，鼠标每移动一次就绘制一个圆，但会出现断点
- 后续通过绘制路径来划线，有断点的bug被解决