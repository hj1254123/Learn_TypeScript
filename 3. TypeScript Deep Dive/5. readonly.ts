// 在接口中标记属性只读
function foo(config: { readonly bar: number, readonly bas: number }) {
  config.bar = 1; //报错
}

const config = { bar: 123, bas: 123 };
foo(config);

// - 当然，你也可以在 interface 和 type 里使用 readonly：
type Foo2 = {
  readonly bar: number;
  readonly bas: number;
};

// 初始化
const foo2: Foo2 = { bar: 123, bas: 456 };

// 不能被改变
foo2.bar = 456;

// - 标记类的属性只读
class Foo {
  readonly bar = 1; // OK
  readonly baz: string;
  constructor() {
    this.baz = 'hello'; // OK
  }
  u() {
    this.bar = 2; //报错，只读
    this.baz = 'hi'; // 报错，只读
  }
}

// - Readonly 
// 配合泛型，把所有属性标记为只读类型：
type Foo3 = {
  bar: number;
  bas: number;
};

type FooReadonly3 = Readonly<Foo3>;

const foo3: Foo3 = { bar: 123, bas: 456 };
const fooReadonly3: FooReadonly3 = { bar: 123, bas: 456 };

foo3.bar = 456; // ok
fooReadonly3.bar = 456; // Error: bar 属性只读

// - 绝对的不可变
// 你甚至可以把索引签名标记为只读：
interface Foo4 {
  readonly [x: number]: number;
}

// 使用
const foo4: Foo4 = { 0: 123, 2: 345 };
console.log(foo4[0]); // ok（读取）
foo4[0] = 456; // Error: 属性只读

// - 如果你想以不变的方式使用原生 JavaScript 数组，
//   可以使用 TypeScript 提供的 ReadonlyArray<T> 接口：
let foo5: ReadonlyArray<number> = [1, 2, 3];
console.log(foo5[0]); // ok
foo5.push(4); // Error: ReadonlyArray 上不存在 `push`，因为他会改变数组
foo5 = foo5.concat(4); // ok, 创建了一个复制

// - 自动推断
// 在一些情况下，编译器能把一些特定的属性推断为 readonly，
// 例如在一个 class 中，如果你有一个只含有 getter 但是没有 setter 的属性，他能被推断为只读：
class Person6 {
  firstName: string = 'John';
  lastName: string = 'Doe';

  get fullName() {
    return this.firstName + this.lastName;
  }
}

const person6 = new Person6();

console.log(person6.fullName); // John Doe
person6.fullName = 'Dear Reader'; // Error, fullName 只读

// - 与 const 的不同
// const
// 用于变量；
// 变量不能重新赋值给其他任何事物。

// readonly
// 用于属性；
// 用于别名，可以修改属性；

// 简单的例子 1：
// const foo = 123; // 变量
// let bar: {
//   readonly bar: number; // 属性
// };

// // 简单的例子 2：
const foo7: {
  readonly bar: number;
} = {
  bar: 123
};

function iMutateFoo(foo: { bar: number }) {
  foo.bar = 456;
}

iMutateFoo(foo7);
console.log(foo7.bar); // 456
// 上面的例子 foo7.bar 还是被修改了！
// 原因是 readonly 只能确保“我”不能改，这里的 iMutateFoo 没有确保，所以能改
// 通过一下修改解决：
// interface Foo {
//   readonly bar: number;
// }

// let foo: Foo = {
//   bar: 123
// };

// function iTakeFoo(foo: Foo) {
//   foo.bar = 456; // Error: bar 属性只读
// }

// iTakeFoo(foo);