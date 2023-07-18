// 对于内置对象，typescript 以及定义好了，直接用就行
// - ECMAScript 的内置对象
// Boolean、Error、Date、RegExp 等
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

// - DOM 和 BOM 的内置对象
// Document、HTMLElement、Event、NodeList 等。
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
// 由于类型推论，以上这些赋值操作，实际开发中不需要指定类型。

// - TypeScript 核心库的定义文件
// TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，
// 并且是预置在 TypeScript 中的。
// 当你在使用一些常用的方法的时候，
// TypeScript 实际上已经帮你做了很多类型判断的工作了，比如：

Math.pow(10, '2'); //报错。类型“string”的参数不能赋给类型“number”的参数。
// 上面方法的类型定义如下:
// interface Math {
//   /**
//    * Returns the value of a base expression taken to a specified power.
//    * @param x The base value of the expression.
//    * @param y The exponent value of the expression.
//    */
//   pow(x: number, y: number): number;
// }

// 用 TypeScript 写 Node.js
// Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：
// npm install @types/node --save-dev


