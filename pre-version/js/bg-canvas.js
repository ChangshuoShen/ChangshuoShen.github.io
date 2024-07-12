// 设置画布
const canvas = document.querySelector('canvas');

// ctx: contex环境、上下文
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 随机颜色
function randomCol(){
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

// 为小球建立模型
function Ball(x, y, velx, vely, color, size){
  // 小球在屏幕上最开始时候的坐标
  this.x = x;
  this.y = y;
  // 水平和竖直速度
  this.velx = velx;
  this.vely = vely;
  // 小球颜色
  this.color = color;
  // 小球半径
  this.size = size;
}

// 画小球
Ball.prototype.draw = function(){
  // 声明现在要开始在纸上画一个个图形了
  ctx.beginPath();
  // 使用fillStyle定义这个图形的颜色，也就是小球的color属性
  ctx.fillStyle = this.color;
  // 使用arc方法在纸上画出一段圆弧
  /* 
    x, y：是圆心坐标
    size：半径
    最后表示开始和结束(弧度)
  */ 
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  // 声明结束了以beginPath()开始的绘画
  ctx.fill();
}

// 更新小球的数据
Ball.prototype.update = function(){
  // 检查小球是否碰到画布的边缘
  if(this.x + this.size >= width || this.x - this.size <= 0){
    this.velx = -this.velx;
  }

  if(this.y + this.size >= height || this.y - this.size <= 0){
    this.vely = -this.vely;
  }

  this.x += this.velx;
  this.y += this.vely;
}

// 在此处添加碰撞检测，从而让小球知道他们正在撞击其他的球
Ball.prototype.collisionDetect = function(){
  for(let j = 0; j < balls.length; j++){
    if(this !== balls[j]){
      // 通过距离检测是否有小球与该小球相碰
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 如果相碰，两个小球都改变颜色
      if(distance < (this.size + balls[j].size) / 3){
        balls[j].color = this.color = randomCol();
      }
    }

  }
}

// 让球动起来
// 先创建一个数组存储小球
let balls = [];

while(balls.length < 13){
  // 这里，全使用let在本次循环结束这些声明就被清除了
  let size = random(13, 23);
  // function Ball(x, y, velx, vely, color, size){}
  let ball = new Ball(
    // 为了避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-2, 2),
    random(-2, 2),
    randomCol(),
    size,
  );
  balls.push(ball);
}

// 几乎所有的动画都会用到一个运动循环，也就是每一帧都自动更新视图
function loop(){
  // 将整个画布颜色设置为半透明的黑色
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  // 画出一个填充整个画布的矩形：用来遮住之前的视图，否则会在屏幕上看到一条蛇的形状而不是小球的运动了
  ctx.fillRect(0, 0, width, height);

  for(let i = 0; i < balls.length; i++){
    // 遍历所有小球，并且让每个小球都调用draw()和update()函数将自己画出来
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  // 使用requestAnimationFrame()方法再运行一次函数——当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，从而得到一个平滑的动画效果。主要通过递归完成
  requestAnimationFrame(loop);
}

// 启动！
loop();


console.log("hello");