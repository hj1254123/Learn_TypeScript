// 之前学习过，接口（Interfaces）可以用于对「对象的形状（Shape）」进行描述。
// 这一章主要介绍接口的另一个用途，对类的一部分行为进行抽象。

// ## 类实现接口,通过 implements 关键字
interface Alarm {
  alert(): void;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Door {
}
// 可以实现单个或多个接口
class SecurityDoor extends Door implements Alarm, Light {
  alert() {
    console.log('SecurityDoor alert');
  }
  lightOn() {
    console.log('Car light on');
  }
  lightOff() {
    console.log('Car light off');
  }
}

class Car implements Alarm {
  alert() {
    console.log('Car alert');
  }
}


// ## 接口继承接口
interface Alarm2 {
  alert(): void;
}

interface LightableAlarm2 extends Alarm2 {
  lightOn(): void;
  lightOff(): void;
}

// ## 接口继承类
// 实际上还是继承的接口
// 常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };

// ## 类可以当做类型来使用
// 实际上，当我们在声明 class Point 时，除了会创建一个名为 Point 的类之外，
// 同时也创建了一个名为 Point 的类型（实例的类型）。

// 所以我们既可以将 Point 当做一个类来用：
const p = new Point(1, 2);
// 也可以将 Point 当做一个类型来用（使用 : Point 表示参数的类型）：
function printPoint(p: Point) {
  console.log(p.x, p.y);
}

printPoint(new Point(1, 2));

// 实际上等价于如下接口：
interface PointInstanceType {
  x: number;
  y: number;
}
// function printPoint(p: PointInstanceType) {

// 注意：声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法：
// 如下，作为类型是等价的
class Point2 {
  /** 静态属性，坐标系原点 */
  static origin = new Point(0, 0);
  /** 静态方法，计算与原点距离 */
  static distanceToOrigin(p: Point) {
    return Math.sqrt(p.x * p.x + p.y * p.y);
  }
  /** 实例属性，x 轴的值 */
  x: number;
  /** 实例属性，y 轴的值 */
  y: number;
  /** 构造函数 */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  /** 实例方法，打印此点 */
  printPoint() {
    console.log(this.x, this.y);
  }
}

interface PointInstanceType2 {
  x: number;
  y: number;
  printPoint(): void;
}

let p1: Point2 = {
  x: 1,
  y: 2,
  printPoint: () => { console.log(this.x, this.y) }
};
let p2: PointInstanceType2 = {
  x: 2,
  y: 2,
  printPoint: () => { console.log(this.x, this.y) }
};