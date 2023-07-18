// ## 在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
interface Person { // 必须大写
  name: string;
  age: number;
};

let tom: Person = {
  // name: 22 // 报错
  name: 'Tom',
  age: 22
};

// 定义的变量比接口少了一些属性是不允许的：
let tina: Person = { // 报错，提示少了 age
  name: 'Tina'
};

// 多一些属性也是不允许的：
let john: Person = {
  name: 'John',
  age: 25,
  gender: 'male' // 报错。对象字面量只能指定已知属性，并且“gender”不在类型“Person”中
};

// ## 可选属性
interface Animal {
  name: string;
  age?: number;
}

let dog: Animal = { //不会报错，age是可选的
  name: '小黑',
  gender: 'male' //报错。未定义的属性，依旧是不允许的。
}

// ## 任意属性
interface A {
  [prop: string]: number;
  // 上面代码指定：key 必须是 String，value 必须是 number
  // prop 类似于函数的“形参”，可以自己取名。
}

let obj: A = {
  a: 1,
  b: 2,
  c: 111
}
// 同时定义两种任意属性
interface B {
  [prop: string]: number;
  [index: number]: string;// 报错。
  // index 指定的值类型是 string，
  // 而 prop 指定的值类型是 number，
  // string 并不是 number 的子集。
}
// 下面这样就是成立的
interface C {
  [prop: string]: object;
  [index: number]: Function; // Function 是 object 的子集
}

// 一旦定义了任意属性，那么其他属性(确定属性、可选属性、只读属性等)
// 的类型，都必须是它的类型的子集。
interface D {
  name: string;
  age?: number; // 报错。因为 `[prop: string]: string` 的存在，这里也必须是 string
  [prop: string]: string;
}
// 解决方法，使用联合类型
interface E {
  name: string;
  age?: number;
  // 注意：typescript 大于 3.9.3 如果同时存在任意属性、可选属性，要带 undefined。
  // [prop: string]: string | number | undefined;
  // 或者直接用 any
  [prop: string]: any;
}

// ## 只读属性 readonly
interface F {
  readonly id: number;
}

let f: F = {
  id: 999 // 只能在创建对象时赋值
}

f.id = 1; //报错，属性只读。
