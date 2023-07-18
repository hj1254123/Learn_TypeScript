class Snake {
  element: HTMLElement; //蛇容器
  head: HTMLElement; //蛇头
  bodies: HTMLCollectionOf<HTMLElement>; //蛇身
  constructor() {
    this.element = document.getElementById('snake')!;
    this.head = document.querySelector('#snake > div')!;
    this.bodies = this.element.getElementsByTagName('div')!;
  }

  // 蛇头坐标
  get x() {
    return this.head.offsetLeft;
  }

  get y() {
    return this.head.offsetTop;
  }

  // 设置蛇头坐标
  set x(value: number) {
    this.movebody()
    this.head.style.left = value + 'px';
  }

  set y(value: number) {
    this.head.style.top = value + 'px';
  }

  // 增加蛇身体
  addBody() {
    const div = document.createElement('div');
    this.element.appendChild(div);
  }

  movebody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一个身体的x、y
      let x = this.bodies[i - 1].offsetLeft;
      let y = this.bodies[i - 1].offsetTop;
      this.bodies[i].style.top = y + 'px';
      this.bodies[i].style.left = x + 'px';
    }
  }

  // 检查蛇头碰撞墙壁
  CheckSnakeheadHittingWall(x: number, y: number): boolean {
    return x < 0 || x > 290 || y < 0 || y > 290;
  }
  // 检查蛇头碰撞身体
  CheckSnakeheadHittingBody(x: number, y: number): boolean {
    if(this.bodies.length < 5) return false
    for (const body of this.bodies) {
      if(x === body.offsetLeft && y === body.offsetTop) {
        return true
      }
    }
    return false
  }
}

export default Snake;

