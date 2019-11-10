
function transformMouse(mouseX, mouseY) {
  return { x: mouseX / window.zoom, y: mouseY / window.zoom };
}

function drawArrow(fromX, fromY, toX, toY, theta, headlen) {
  theta = typeof theta != "undefined" ? theta : 30;
  headlen = typeof theta != "undefined" ? headlen : 10;
  // 计算各角度和对应的P2,P3坐标
  var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
    angle1 = (angle + theta) * Math.PI / 180,
    angle2 = (angle - theta) * Math.PI / 180,
    topX = headlen * Math.cos(angle1),
    topY = headlen * Math.sin(angle1),
    botX = headlen * Math.cos(angle2),
    botY = headlen * Math.sin(angle2);
  var arrowX = fromX - topX,
    arrowY = fromY - topY;
  var path = " M " + fromX + " " + fromY;
  path += " L " + toX + " " + toY;
  arrowX = toX + topX;
  arrowY = toY + topY;
  path += " M " + arrowX + " " + arrowY;
  path += " L " + toX + " " + toY;
  arrowX = toX + botX;
  arrowY = toY + botY;
  path += " L " + arrowX + " " + arrowY;
  return path;
}

$('#downloadImage').click(()=> {
  canvasToImage('c', {
    name: `experiment-design-${Date.now()}`,
    type: 'png',
    quality: 1
  });
});

function toggleUniform() {
  var aObject = canvas.getActiveObject();
  if (aObject.type === 'activeSelection') {
    aObject.getObjects().forEach(function (obj) {
      obj.set('strokeUniform', !obj.strokeUniform);
    });
  } else {
    aObject.set('strokeUniform', !aObject.strokeUniform);
  }
  canvas.requestRenderAll();
}


(function () {

  var mouseFrom = {},
    mouseTo = {},
    drawType = null,
    canvasObjectIndex = 0,
    textbox = null;

  var drawWidth = 2; //笔触宽度
  var color = "#E34F51"; //画笔颜色
  var drawingObject = null; //当前绘制对象
  var moveCount = 1; //绘制移动计数器
  var doDrawing = false; // 绘制状态
  var canvasObject = null;

  var canvas = window.canvas = new fabric.Canvas('c');

  //绑定画板事件
  canvas.on("mouse:down", function (options) {
    var xy = transformMouse(options.e.offsetX, options.e.offsetY);

    mouseFrom.x = xy.x;
    mouseFrom.y = xy.y;

    doDrawing = true;
  });

  canvas.on("mouse:up", function (options) {
    var xy = transformMouse(options.e.offsetX, options.e.offsetY);
    mouseTo.x = xy.x;
    mouseTo.y = xy.y;
    // drawing();
    drawingObject = null;
    moveCount = 1;
    doDrawing = false;
  });

  canvas.on("mouse:move", function (options) {
    if (moveCount % 2 && !doDrawing) {
      //减少绘制频率
      return;
    }
    moveCount++;
    var xy = transformMouse(options.e.offsetX, options.e.offsetY);
    mouseTo.x = xy.x;
    mouseTo.y = xy.y;
    drawing();
  });

  if (canvasObject) {
    canvas.add(canvasObject);
  }

  let imageIndex = 1;

  jQuery("#toolsul").find("li").on("click", function (e) {

    // 设置样式
    jQuery("#toolsul").find("li>i").each(function () {
      jQuery(this).attr("class", jQuery(this).attr("data-default"));
    });

    jQuery(this).addClass("active").siblings().removeClass("active");

    drawType = jQuery(this).attr("data-type");


    if (jQuery(this).find('img') && $(this).find('img').data('index')) {
      drawType = 'image';
      imageIndex = $(this).find('img').data('index');

      drawing();
    }

    if (drawType === 'line' || drawType === 'arrow') {
      canvas.isDrawingMode = true;
      canvas.selection = false;
      canvas.skipTargetFind = true;
      canvas.selectable = false;
    } else {
      canvas.isDrawingMode = false;
      canvas.selection = true;
      canvas.skipTargetFind = false;
      canvas.selectable = true;
    }
  });

  function drawing() {
    if (drawingObject) {
      canvas.remove(drawingObject);
    }

    canvasObject = null;

    switch (drawType) {
      case "arrow": //箭头
        canvasObject = new fabric.Path(drawArrow(mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y, 30, 30), {
          stroke: color,
          fill: "rgba(255,255,22,0)",
          strokeWidth: drawWidth
        });
        break;
      case "line": //直线
        canvasObject = new fabric.Line([mouseFrom.x, mouseFrom.y, mouseTo.x, mouseTo.y], {
          stroke: color,
          strokeWidth: drawWidth
        });
        break;
      case "text":
        textbox = new fabric.Textbox("", {
          left: mouseFrom.x - 60,
          top: mouseFrom.y - 20,
          width: 150,
          fontSize: 18,
          borderColor: "#2c2c2c",
          fill: color,
          hasControls: false
        });
        canvas.add(textbox);
        textbox.enterEditing();
        textbox.hiddenTextarea.focus();
        break;
      case "remove":
        break;
      case "image":
        new fabric.Image.fromURL(`../public/experiment/image/qc/${imageIndex}.png`, function (imgInstance) {
          imgInstance.scaleToHeight(400, false);  //缩放图片的高度到400
          imgInstance.scaleToWidth(400, false);   //缩放图片的宽度到400

          canvas.add(imgInstance);

          imgInstance.on('selected', function () {
            console.log('selected a rectangle');
          });

          imgInstance.hasControls = imgInstance.hasBorders = true;

          drawType = null;
        });
        break;
      default:
        break;
    }

    console.log(canvasObject);

  };

  // create a rectangle object
  var rect = new fabric.Rect({
    left: 100,
    top: 50,
    fill: '#D81B60',
    width: 50,
    height: 50,
    strokeWidth: 2,
    stroke: "#880E4F",
    rx: 10,
    ry: 10,
    angle: 45,
    scaleX: 3,
    scaleY: 3,
    hasControls: true
  });

  // canvas.add(rect);

  // var circle1 = new fabric.Circle({
  //   radius: 65,
  //   fill: '#039BE5',
  //   left: 0,
  //   stroke: 'red',
  //   strokeWidth: 3
  // });

  // var circle2 = new fabric.Circle({
  //   radius: 65,
  //   fill: '#4FC3F7',
  //   left: 110,
  //   opacity: 0.7,
  //   stroke: 'blue',
  //   strokeWidth: 3,
  //   strokeUniform: true
  // });

  // canvas.add(circle1);
  // canvas.add(circle2);

})();