class Draw {
  constructor(selector) {
    this.view = selector
  }

  init() {
    this.domView = this.byId(this.view)
    this.context = this.domView.getContext('2d')
    this.isClear = false
    this.autoResizeCanvas()
    this.userAction(this.domView)
    this.changeSize()
  }

  byId(tag) {
    return document.getElementById(tag);
  }

  changeSize() {
    let sizeBtn = this.byId('size')
    let sizeRanks = sizeBtn.children
    let num = 1
    sizeBtn.addEventListener('click', () => {
      for (let i = 0; i < sizeRanks.length; i++) {
        sizeRanks[i].classList.remove('active')
      }
      sizeRanks[num].classList.add('active')
      this.context.lineWidth = (num + 1) * 2;
      num += 1
      if (num >= sizeRanks.length) {
        num = 0
      }
    })
  }

  canvasInit(tag) {
    tag.width = document.documentElement.clientWidth;
    tag.height = document.documentElement.clientHeight;
  }

  autoResizeCanvas() {
    this.canvasInit(canvas);

    window.onresize = function () {
      this.canvasInit(canvas);
    }

  }

  drawLine(x1, y1, x2, y2) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    this.context.closePath();
  }

  drawCircle(x, y) {
    this.context.beginPath();
    this.context.arc(x, y, 2, 0, Math.PI * 2);
    this.context.fill();
  }

  //绘制矩形
  drawRect(x1, y1, x2, y2, color) {
    color = color || '#000';
    this.context.fillStyle = color;
    this.context.fillRect(x1, y1, x2, y2);
  }
  userAction(tag) {
    var isUsing = false,
      lastPoint = {
        x: undefined,
        y: undefined
      };
    this.context.lineWidth = 2;
    // 用户选择笔刷or橡皮擦
    this.userSelect();
    // 笔刷重置（笔刷大小颜色）
    this.brushReset();
    // 图像下载
    this.downloadPic();
    // 特性检测
    if (document.body.ontouchstart !== undefined) {
      // 支持触摸事件
      tag.addEventListener( 'touchstart' ,  point => {
        var pointX = point.touches[0].clientX,
          pointY = point.touches[0].clientY;
        isUsing = true;
        if (this.isClear) {
          this.eraserFn(pointX, pointY);
        } else {
          lastPoint.x = pointX;
          lastPoint.y = pointY;
          this.drawCircle(pointX, pointY);
        }
      })
      tag.addEventListener('touchmove', point => {
        var pointX = point.touches[0].clientX,
          pointY = point.touches[0].clientY,
          newPoint = {
            x: pointX,
            y: pointY
          };

        if (!isUsing) {
          return
        }
        if (isUsing) {
          if (this.isClear) {
            this.eraserFn(pointX, pointY);
          } else {
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          }
        }
        lastPoint.x = pointX;
        lastPoint.y = pointY;
      })
      tag.addEventListener('touchend', point => {
        isUsing = false;
      })

    } else {
      //不支持触摸事件
      tag.addEventListener('mousedown', point => {
        var pointX = point.clientX,
          pointY = point.clientY;
        isUsing = true;
        if (this.isClear) {
          this.eraserFn(pointX, pointY);
        } else {
          lastPoint.x = pointX;
          lastPoint.y = pointY;
          this.drawCircle(pointX, pointY);
        }
      })

      tag.addEventListener('mousemove', point => {
        var pointX = point.clientX,
          pointY = point.clientY,
          newPoint = {
            x: pointX,
            y: pointY
          };

        if (!isUsing) { return }
        if (isUsing) {
          if (this.isClear) {
            this.eraserFn(pointX, pointY);
          } else {
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
          }
        }
        lastPoint.x = pointX;
        lastPoint.y = pointY;
      })
      tag.addEventListener('mouseup', point => {
        isUsing = false;
      })
    }
  }

  userSelect() {
    var brushBtn = this.byId('brush'),
      eraserBtn = this.byId('eraser');
    brushBtn.addEventListener('click', () => {
      this.isClear = false;
      eraserBtn.classList.remove('svgActive');
      brushBtn.classList.add('svgActive');
    })
    eraserBtn.addEventListener('click', () => {
      this.isClear = true;
      eraserBtn.classList.add('svgActive');
      brushBtn.classList.remove('svgActive');
    })
  }

  // 橡皮擦函数
  eraserFn(x, y) {
    this.context.clearRect(x - 5, y - 5, 10, 10);
  }

  colorListener(element, eventType, selector, callback) {
    element.addEventListener(eventType, event => {
      let currentColor = event.target
      if (currentColor.matches(selector)) {
        let color = currentColor.dataset.color
        let siblings = element.children
        callback.call(currentColor, event, currentColor, color, siblings, element)
      }
    })
  }

  //按钮功能函数
  brushReset() {
    var clearBtn = this.byId('delete'),
      brushColors = this.byId('brushColor');
    clearBtn.addEventListener('click', () => {
      this.drawRect(0, 0, canvas.width, canvas.height, '#fff');
    }) 

    //颜色更改
    this.colorListener(brushColors, 'click', 'li', (event, current, color, siblings, parent) => {
      this.context.fillStyle = color
      this.context.strokeStyle = color
      for(let i = 0; i < siblings.length; i++){
        siblings[i].classList.remove('btnActive')
      }
      current.classList.add('btnActive');
    })
  }

    // 下载图像函数
    downloadPic() {
      var downloadBtn = this.byId('download'),
        body = this.byId('body');
      downloadBtn.onclick = function () {
        var url = canvas.toDataURL('img/png');
        var aTag = document.createElement('a');
        body.appendChild(aTag);
        aTag.href = url;
        aTag.download = 'mypic';
        aTag.target = '_blank';
        aTag.click();
      }
    }
  }

let draw = new Draw('canvas')
draw.init.call(draw)
