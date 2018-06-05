var canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');

var isClear = false;

autoResizeCanvas()

userAction(canvas);



/*****功能函数*****/

//初始化画布
function canvasInit(tag) {
  tag.width = document.documentElement.clientWidth;
  tag.height = document.documentElement.clientHeight;
}

// 画布大小自动调整
function autoResizeCanvas() {
  canvasInit(canvas);

  window.onresize = function() {
    canvasInit(canvas);
  }

}

//绘制路径
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineWidth = 4;
  context.stroke();
  context.closePath();
}

//绘制圆形
function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, 2, 0, Math.PI * 2);
  context.fill();
}


//用户动作
function userAction(tag) {
  var isUsing = false,
    lastPoint = {
      x: undefined,
      y: undefined
    };

  userSelect();

  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 支持触摸事件
    tag.ontouchstart = function(point) {
      var pointX = point.touches[0].clientX,
          pointY = point.touches[0].clientY;
      isUsing = true;
      if (isClear) {
        eraserFn(pointX, pointY);
      } else {
        lastPoint.x = pointX;
        lastPoint.y = pointY;
        drawCircle(pointX, pointY);
      }
    }
    tag.ontouchmove = function(point) {
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
        if (isClear) {
          eraserFn(pointX, pointY);
        } else {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        }
      }

      lastPoint.x = pointX;
      lastPoint.y = pointY;
    }
    tag.ontouchend = function(point) {
      isUsing = false;
    }

  } else {
    //不支持触摸事件
    tag.onmousedown = function(point) {
      var pointX = point.clientX,
        pointY = point.clientY;
      isUsing = true;
      if (isClear) {
        eraserFn(pointX, pointY);
      } else {
        lastPoint.x = pointX;
        lastPoint.y = pointY;
        drawCircle(pointX, pointY);
      }
    }

    tag.onmousemove = function(point) {
      var pointX = point.clientX,
        pointY = point.clientY,
        newPoint = {
          x: pointX,
          y: pointY
        };

      if (!isUsing) {
        return
      }
      if (isUsing) {
        if (isClear) {
          eraserFn(pointX, pointY);
        } else {
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        }
      }

      lastPoint.x = pointX;
      lastPoint.y = pointY;

    }

    tag.onmouseup = function(point) {
      isUsing = false;
    }
  }


}

// 用户动作类型
function userSelect() {
  var brushBtn = document.getElementById('brush'),
    eraserBtn = document.getElementById('eraser');
  brushBtn.onclick = function() {
    // btnBox.className = 'btnBox active';
    isClear = false;
    console.log(1)
  }
  eraserBtn.onclick = function() {
    // btnBox.className = 'btnBox';
    isClear = true;
    console.log(2)
  }
}

// 橡皮擦函数
function eraserFn(x, y) {
  context.clearRect(x - 5, y - 5, 10, 10)
}