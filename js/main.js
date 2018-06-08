var canvas = byId('canvas'),
  context = canvas.getContext('2d');

var isClear = false;

autoResizeCanvas()

userAction(canvas);


/*****功能函数*****/

// 封装一个getElementById函数
function byId (tag){
  return document.getElementById(tag);
}


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
  // context.lineWidth = 4;
  context.stroke();
  context.closePath();
}

//绘制圆形
function drawCircle(x, y) {
  context.beginPath();
  context.arc(x, y, 2, 0, Math.PI * 2);
  context.fill();
}

//绘制矩形
function drawRect(x1,y1,x2,y2,color){
  color = color || '#000';
  context.fillStyle = color;
  context.fillRect(x1,y1,x2,y2);
}


//用户动作
function userAction(tag) {
  var isUsing = false,
    lastPoint = {
      x: undefined,
      y: undefined
    };
  context.lineWidth = 4;
  userSelect();
  btnFn();
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
  var brushBtn = byId('brush'),
    eraserBtn = byId('eraser');
  brushBtn.onclick = function() {
    // btnBox.className = 'btnBox active';
    isClear = false;
    eraserBtn.classList.remove('svgActive');
    brushBtn.classList.add('svgActive');
  }
  eraserBtn.onclick = function() {
    // btnBox.className = 'btnBox';
    isClear = true;
    eraserBtn.classList.add('svgActive');
    brushBtn.classList.remove('svgActive');
  }
}

// 橡皮擦函数
function eraserFn(x, y) {
  context.clearRect(x - 5, y - 5, 10, 10);
}


//按钮功能函数
function btnFn (){
  var clearBtn = byId('delete'),
      blackBtn = byId('blackBtn'),
      redBtn = byId('redBtn'),
      greenBtn = byId('greenBtn'),
      blueBtn = byId('blueBtn'),
      thinBtn = byId('thinBtn'),
      normalBtn = byId('normalBtn'),
      wideBtn = byId('wideBtn');
  clearBtn.onclick = function(){
    drawRect(0,0,canvas.width,canvas.height,'#fff');
    // context.clearRect(0,0,canvas.width,canvas.height)：
  }
  //颜色更改
  blackBtn.onclick = function(){
    context.fillStyle = '#000';
    context.strokeStyle = '#000';
    blackBtn.classList.add('btnActive');
    redBtn.classList.remove('btnActive');
    greenBtn.classList.remove('btnActive');
    blueBtn.classList.remove('btnActive');
  }
  redBtn.onclick = function(){
    context.fillStyle = '#ff0000';
    context.strokeStyle = '#ff0000';
    blackBtn.classList.remove('btnActive');
    redBtn.classList.add('btnActive');
    greenBtn.classList.remove('btnActive');
    blueBtn.classList.remove('btnActive');

  }
  greenBtn.onclick = function(){
    context.fillStyle = '#00ff00';
    context.strokeStyle = '#00ff00';
    blackBtn.classList.remove('btnActive');
    redBtn.classList.remove('btnActive');
    greenBtn.classList.add('btnActive');
    blueBtn.classList.remove('btnActive');
  }
  blueBtn.onclick = function(){
    context.fillStyle = '#0000ff';
    context.strokeStyle = '#0000ff'; 
    blackBtn.classList.remove('btnActive');
    redBtn.classList.remove('btnActive');
    greenBtn.classList.remove('btnActive');
    blueBtn.classList.add('btnActive');
  }
  // 路径宽度更改
  thinBtn.onclick = function(){
    context.lineWidth = 2;
    thinBtn.classList.add('btnActive');
    normalBtn.classList.remove('btnActive');
    wideBtn.classList.remove('btnActive');
  }
  normalBtn.onclick = function(){
    context.lineWidth = 4;
    thinBtn.classList.remove('btnActive');
    normalBtn.classList.add('btnActive');
    wideBtn.classList.remove('btnActive');

  }
  wideBtn.onclick = function(){
    context.lineWidth = 8;
    thinBtn.classList.remove('btnActive');
    normalBtn.classList.remove('btnActive');
    wideBtn.classList.add('btnActive');

  }
}

