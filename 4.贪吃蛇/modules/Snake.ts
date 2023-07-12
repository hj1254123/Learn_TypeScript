class Snake {
  element: HTMLElement; //蛇容器
  head: HTMLElement; //蛇头
  bodies: HTMLCollection; //蛇身
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
}

export default Snake;

