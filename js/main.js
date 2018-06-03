var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    isPainting = false,
    point1 = {},
    point2 = {};

canvasInit();

function canvasInit(){
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight; 
}

window.onresize = function(){
  canvasInit();

}



function drawLine (x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineTo(x2,y2);
  context.lineWidth = 5;
  context.stroke();
  context.closePath();
}



canvas.onmousedown = function(point){
  var pointX = point.clientX,
      pointY = point.clientY;
  isPainting = true;
  
  point1 = {x:pointX,y:pointY};
  
}

canvas.onmousemove = function(point){
  var pointX = point.clientX,
      pointY = point.clientY;
  point2 = {x:pointX,y:pointY}
  if(isPainting){
    
    drawLine(point1.x,point1.y,point2.x,point2.y)
  }
  point1.x = pointX;
  point1.y = pointY;
 
}
canvas.onmouseup = function(point){
  isPainting = false;
}