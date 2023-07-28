// 索引签名

// ## TypeScript 索引签名

// 以下代码在 JavaScript 中运行正常
// let obj = {
//   toString() {
//     console.log('toString called');
//     return 'Hello';
//   }
// };

// let foo = {};
// foo[obj] = 'World'; // toString called
// console.log(foo[obj]); // toString called, World
// console.log(foo['Hello']); // World

// 但对于初学者，这种隐式的 toString，会很困惑，其存在安全风险，
// 所以 typescript 中是禁止的
const obj = {
  toString() {
    return 'Hello';
  }
};

const foo: any = {};

// ERROR: 索引签名必须为 string, number....
foo[obj] = 'World';

// FIX: TypeScript 强制你必须明确这么做：
foo[obj.toString()] = 'World';

// ## 声明一个索引签名

// 在上文中，我们通过使用 any 来让 TypeScript 允许我们可以做任意我们想做的事情。
// 实际上，我们可以明确的指定索引签名。

const foo2: {
  [index: string]: { message: string };
} = {};

// 储存的东西必须符合结构
// ok
foo2['a'] = { message: 'some message' };

// Error, 必须包含 `message`
foo2['a'] = { messages: 'some message' };

// 读取时，也会有类型检查
// ok
foo2['a'].message;

// Error: messages 不存在
foo2['a'].messages;

// ## 上一节声明了索引签名，那么所有的对象成员都必须符合它
interface Bar {
  [key: string]: number; // 索引签名
  x: number;
  y: string; // 报错，必须为 number，必须符合索引签名
}

// ## 使用一组有限的字符串字面量
// 一个索引签名可以通过映射类型来使索引字符串为联合类型中的一员，如下所示：
type Index = 'a' | 'b' | 'c';
type FromIndex = { [k in Index]?: number };

const good: FromIndex = { b: 1, c: 2 };

// Error: 'd' 不存在 'FromIndex' 类型上
const bad: FromIndex = { b: 1, c: 2, d: 3 };

// ## 同时拥有 string 和 number 类型的索引签名
// 这并不是一个常见的用例，但是 TypeScript 支持它。
// string 类型的索引签名比 number 类型的索引签名更严格。这是故意设计，它允许你有如下类型：

interface ArrStr {
  [key: string]: string | number; // 必须包括所用成员类型
  [index: number]: string; // 字符串索引类型的子级

  // example
  length: number;
}

const a: ArrStr = {
  length: 8,
  'str': '1',
  'str2': 1,
  0: '123',
  1: 11, //报错（如果上面不定义"索引类型的子级"是不会报错的）
}

// ## 设计模式：索引签名的嵌套
interface NestedCSS {
  color?: string;
  nest?: {
    [selector: string]: NestedCSS;
  };
}

const example: NestedCSS = {
  color: 'red',
  nest: {
    '.subclass': {
      color: 'blue'
    }
  }
}

const failsSliently: NestedCSS = {
  colour: 'red'  // TS Error: 未知属性 'colour'
}