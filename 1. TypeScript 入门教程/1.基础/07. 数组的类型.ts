// 在 TypeScript 中，数组类型有多种定义方式，比较灵活。

// - 「类型 + 方括号」表示法
let arr1: number[] = [1, 23, 34, 5];
let arr2: number[] = [1, 23, 34, 5, '6']; //这里'6'就会报错
arr2.push('8'); // 这里也会报错，只能是 number

// - 数组泛型
let arr3: Array<number> = [12, 333, 555, 11];

// - 用接口表示数组（一般不用）
interface NumberArray {
  [index: number]: number;
}
let arr4: NumberArray = [2331, 21, 12, 31, 51];

// - 类数组
// 类数组（Array-like Object）不是数组类型，比如 arguments：
function sum() {
  let args: number[] = arguments; // 这里报错，arguments 不是数组
}
// 定义接口来解决
function sum2() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
// 其实常用的类数组，如 IArguments, NodeList, HTMLCollection 等，都内置了接口
function sum3() {
  let args: IArguments = arguments;
  // 实际上长这样
  // interface IArguments {
  //   [index: number]: any;
  //   length: number;
  //   callee: Function;
  // }
}

// - any 在数组中的应用，允许任何类型
let list: any[] = ['23123', [1, 2], { name: 'monkey' }];



