class Draw {
  constructor(selector) {
    this.view = selector
  }

  init() {
    this.domView = this.byId(this.view)
    this.context = this.domView.getContext('2d')
    this.isClear = false
    this.isUsing = false
    this.drawWidth = 1
    this.color = '#000'
    this.autoResizeCanvas()
    this.userAction(this.domView)
    this.changeSize()
  }

  byId(tag) {
    return document.getElementById(tag)
  }

  autoResizeCanvas() {
    this._canvasInit()
    window.onresize = () => {
      this._canvasInit()
    }
  }

  userAction(tag) {
    this.context.lineWidth = 2
    // 用户选择笔刷or橡皮擦
    this._userSelect()
    this._brushReset()
    this.downloadPic()
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
      // 支持触摸事件
      this._useMouthOrTouch(tag,['touchstart','touchmove','touchend',true])
    } else {
      //不支持触摸事件
      this._useMouthOrTouch(tag,['mousedown','mousemove','mouseup',false])
    }
  }

  changeSize() {
    let sizeBtn = this.byId('size')
    let sizeRanks = sizeBtn.children
    sizeBtn.addEventListener('click', () => {
      for (let i = 0; i < sizeRanks.length; i++) {
        sizeRanks[i].classList.remove('active')
      }
      sizeRanks[this.drawWidth].classList.add('active')
      this.context.lineWidth = (this.drawWidth + 1) * 2
      this.drawWidth += 1
      if (this.drawWidth >= sizeRanks.length) {
       this.drawWidth = 0
      }
    })
  }

  _canvasInit() {
    this.domView.width = document.documentElement.clientWidth
    this.domView.height = document.documentElement.clientHeight
    this.context.lineWidth = this.drawWidth
  }


  drawLine(x1, y1, x2, y2) {
    this.context.beginPath()
    this.context.lineCap = "round"
    this.context.moveTo(x1, y1)
    this.context.lineTo(x2, y2)
    this.context.stroke()
    this.context.closePath()
  }

  drawCircle(x, y) {
    this.context.beginPath()
    this.context.arc(x, y, 2, 0, Math.PI * 2)
    this.context.fill()
  }

  //绘制矩形
  drawRect(x1, y1, x2, y2, color) {
    color = color || '#000'
    this.context.fillStyle = color
    this.context.fillRect(x1, y1, x2, y2)
  }

  _returnPoint(boolean,point) {
    if(boolean){
      // touch
      return{
        pointX: point.touches[0].clientX,
        pointY: point.touches[0].clientY
      } 
    }else{
      // mouse
      return{
        pointX: point.clientX,
        pointY: point.clientY
      }
    }
  }
  // 绘图逻辑主函数
  _useMouthOrTouch(tag,methods) {
    let lastPoint = {
      x: undefined,
      y: undefined
    }
    tag.addEventListener(methods[0], point => {
      let pointX = this._returnPoint(methods[3],point).pointX
      let pointY = this._returnPoint(methods[3],point).pointY
      this.isUsing = true
      if (this.isClear) {
        this.eraserFn(pointX, pointY)
      } else {
        lastPoint.x = pointX
        lastPoint.y = pointY
        this.drawCircle(pointX, pointY)
      }
    })
    tag.addEventListener(methods[1], point => {
      let pointX = this._returnPoint(methods[3],point).pointX
      let pointY = this._returnPoint(methods[3],point).pointY
      let newPoint = {
        x: pointX,
        y: pointY
      }

      if (this.isUsing) {
        if (this.isClear) {
          this.eraserFn(pointX, pointY)
        } else {
          this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        }
      } else {
        return
      }
      lastPoint.x = pointX
      lastPoint.y = pointY
    })
    tag.addEventListener(methods[2], point => {
      this.isUsing = false
    })
  }

  _userSelect() {
    let brushBtn = this.byId('brush')
    let eraserBtn = this.byId('eraser')
    brushBtn.addEventListener('click', () => {
      this.isClear = false
      eraserBtn.classList.remove('svgActive')
      brushBtn.classList.add('svgActive')
    })
    eraserBtn.addEventListener('click', () => {
      this.isClear = true
      eraserBtn.classList.add('svgActive')
      brushBtn.classList.remove('svgActive')
    })
  }

  // 橡皮擦函数
  eraserFn(x, y) {
    this.context.clearRect(x - 5, y - 5, 10, 10)
  }

  // 颜色按钮事件监听
  _colorListener(element, eventType, selector, callback) {
    let colorMore = element.querySelector('#colorMore')
    element.addEventListener(eventType, event => {
      let currentColor = event.target
      if (currentColor.matches(selector)) {
        this.color = currentColor.dataset.color
        colorMore.value = this.color
        let siblings = element.children
        callback.call(currentColor, event, currentColor, siblings, element)
      }
    })
    colorMore.addEventListener('change', event => {
      this.color = event.target.value
      this._brushColor()
    })
  }

  //按钮功能函数
  _brushReset() {
    let clearBtn = this.byId('delete')
    let brushColors = this.byId('brushColor')
    clearBtn.addEventListener('click', () => {
      this.drawRect(0, 0, canvas.width, canvas.height, '#fff')
    })
    //颜色更改
    this._colorListener(brushColors, 'click', 'li', (event, current, siblings, parent) => {
      this._brushColor()
      for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('btnActive')
      }
      current.classList.add('btnActive')
    })
  }

  _brushColor () {
    this.context.fillStyle = this.color
    this.context.strokeStyle = this.color
  }

  // 下载图像函数
  downloadPic() {
    let downloadBtn = this.byId('download')
    let body = this.byId('body')
    downloadBtn.onclick = function () {
      let url = canvas.toDataURL('img/png')
      let aTag = document.createElement('a')
      body.appendChild(aTag)
      aTag.href = url
      aTag.download = 'mypic'
      aTag.target = '_blank'
      aTag.click()
    }
  }
}

let draw = new Draw('canvas')
draw.init.call(draw)
