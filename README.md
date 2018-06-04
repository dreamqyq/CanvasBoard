# CanvasBoard

#### 本项目的目的是用canvas做出一个画板

## V1.0

- 本版本仅完成画板的最基本功能
- 在项目完成过程中，尝试了使用onmousemove函数中，鼠标每移动一次就绘制一个圆，但会出现断点
- 后续通过绘制路径来划线，有断点的bug被解决

## V1.5

- 功能函数进行了整理与封装
- 解决了canvas全屏出现滚动条的bug（因为canvas本身是内联元素，需要设置`display:block`）
- 增加了鼠标点击一下画一个点的功能
- 增加了橡皮擦的功能按钮，点击按钮可切换成橡皮擦模式，再点击按钮为绘画模式
