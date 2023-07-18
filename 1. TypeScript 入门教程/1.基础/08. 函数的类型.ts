// - 函数声明
function sum1(x: number, y: number): number {//传入参数，返回参数都必须是 number
  return x + y;
}
// 参数多或少都不被允许
sum1(1)
sum1(1, 2, 3)

// - 函数表达式
let sum2 = function (x: number, y: number): number {
  return x + y;
}
// 上面代码只对匿名函数做了类型定义，左边的 sum2 是通过赋值操作推断出来的，
// 它实际上是这样的：
let sum3: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
}
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

// - 用接口定义函数的形状
// 我们也可以使用接口的方式来定义一个函数需要符合的形状：
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
}

// - 可选参数
// 可选参数必须写在最后
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName('Tom', 'Cat');
let tina = buildName('Tina');

// - 参数默认值
// 参数默认值会被识别为可选参数，但它后面可以接必选参数
function buildName2(firstName: string, lastName: string = 'Cat', hi: string) {
  return firstName + ' ' + lastName + ' ' + hi;
}
let tomcat2 = buildName2('Tom', 'Cat', 'Hi');
let tom2 = buildName2('Tom', undefined, 'Hi');

// - 剩余参数
// ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：
// function push(array, ...items) {
//   items.forEach(function (item) {
//     array.push(item);
//   });
// }

// let a: any[] = [];
// push(a, 1, 2, 3);
// 事实上，items 是一个数组。所以我们可以用数组的类型来定义它：
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);

// - 重载
// 概念：重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
// 比如：我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，
//      输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。

// 联合类型实现：
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
// reverse(123) 
//提示：reverse(x: string | number): string | number | void

// 上面代码虽然能够实现，但是不够精确，
// 我们的需求是输入 number 返回 number，输入 string 返回 string
// 这时时候就要用到重载了：
function reverse2(x: number): number;
function reverse2(x: string): string;
function reverse2(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
// reverse2()
// 分别两种提示：
// reverse2(x: number): number
// reverse2(x: string): string

// 上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，
// 最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
// 注意，TypeScript 会优先从最前面的函数定义开始匹配，
// 所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
