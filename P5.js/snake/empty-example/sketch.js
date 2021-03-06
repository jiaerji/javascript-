var s;
var scl = 20;
var food;

// 程序开始时，setup() 函数中的语句执行一次。
function setup() {//p5.js的初始方法
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();
  // put setup code here
}

function pickLocation() {
  var cols = floor(width/scl);//按照scl比例缩小,目的是为了让food为整数
  var rows = floor(height/scl);//按照scl比例缩小
  food = createVector(floor(random(cols)), floor(random(rows)));//创建food块，并且让其为整数
  food.mult(scl);//按照scl比例放大
}


// draw() 中的语句一直执行到程序停止为止。每个语句都按顺序执行，并且在读取最后一行之后，将再次执行第一行。
function draw() {//p5.js图形绘制
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }

  s.update();
  s.show();
  s.death();

  fill(255, 0, 100);
  rect(food.x, food.y, scl , scl);
  // put drawing code here
}

function keyPressed() {//键盘事件
  if(keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if(keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if(keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if(keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}

function mousePressed() {//鼠标事件
  s.total++;
}
