// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，
// 而在使用的时候再指定类型的一种特性。

// ## 简单例子
// T 只是一个符号，可以是其他
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}

createArray<string>(3, 'y') // ['y', 'y', 'y']
createArray(3, 'x') // 也可以不指定类型，让ts类型推断

// ## 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}

swap([8, 'eight']) //['eight', 8]

// ## 泛型约束
// 先看一个错误例子：
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); //报错。不知道会传入什么类型的变量，不一定有这个属性。
  return arg;
}
// 对泛型进行约束：
interface Lengthwise {
  length: number;
}
// extends 这个接口
function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentity2('123')
loggingIdentity2(123) //报错

// 多个类型参数之间也可以互相约束：
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
    target[id] = (<T>source)[id];
  }
  return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });

// 上例中，我们使用了两个类型参数，其中要求 T 继承 U，
// 这样就保证了 U 上不会出现 T 中不存在的字段。

// ## 泛型接口
// 之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：
// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//     return source.search(subString) !== -1;
// }

// 当然也可以使用含有泛型的接口来定义函数的形状：
interface CreateArrayFunc3 {
  <T>(length: number, value: T): Array<T>;
}

let createArray3: CreateArrayFunc3;
createArray3 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray3(3, 'x'); // ['x', 'x', 'x']

// 进一步，我们可以把泛型参数提前到接口名上：
interface CreateArrayFunc4<T> {
  (length: number, value: T): Array<T>;
}
// 注意，此时在使用泛型接口的时候，需要定义泛型的类型。
let createArray4: CreateArrayFunc4<any>;
createArray4 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray4(3, 'x'); // ['x', 'x', 'x']

// ## 泛型类
// 与泛型接口类似，泛型也可以用于类的类型定义中：
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

// ## 泛型参数的默认类型
// 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。
// 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
function createArray5<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}