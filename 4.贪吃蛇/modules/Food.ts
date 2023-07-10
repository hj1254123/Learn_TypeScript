class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById('food')!;
  }

  get x() {
    return this.element.offsetLeft;
  }

  get y() {
    return this.element.offsetTop;
  }

  change() {
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;

    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }
}

export default Food