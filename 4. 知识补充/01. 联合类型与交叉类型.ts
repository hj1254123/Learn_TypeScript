// typescript 联合类型与交叉类型对于基本类型和对象类型表现有些不同

// ## 先来看对于基本类型的表现
type S0 = number | string;
type S1 = number | boolean;

// 联合类型（并集）
type S2 = S0 | S1; // type S2 = string | number | boolean
const n1: S2 = "123";
const n2: S2 = 123;
const n3: S2 = true;

// 交叉类型（交集）
type S3 = S0 & S1; // type S3 = number
const n4: S3 = 123;
const n5: S3 = "123"; //报错
const n6: S3 = true; //报错

// ## 对于对象表现就有些奇怪了
interface T0 {
  name: string;
  age: number;
}
interface T1 {
  name: string;
  sayHi(): void;
}

// 联合类型
type T2 = T0 | T1;

// 这里看起来有些诡异，不是只能满足T0或T1其一吗？
// 这是因为 TypeScript 的结构类型系统只检查所需的成员是否存在，并不强制要求对象只能符合其中一个接口的确切形状。
const p0: T2 = {
  name: "嘟嘟",
  age: 18,
  sayHi() {
    console.log("Hi");
  },
};
// 见鬼！这里会报错：类型“T2”上不存在属性“age”
console.log(p0.age)
// 这是因为，虽然 p0 有 age，但是 typescript 并不能保证每一个 T2 类型的实例都有 age 属性！
// 解决方法：“类型缩小”
if ('age' in p0) {
  // 这里的 p0 范围缩小成了 T0
  console.log(p0.age);
}

// 实现其一（T0 | T1）不会报错
const p1: T2 = {
  name: "嘟嘟",
  age: 18,
};

// 报错 缺少 name
const p2: T2 = {
  sayHi() {
    console.log("Hi");
  },
};

// 交叉类型
type T3 = T0 & T1;

// 如果按照交集的逻辑，只应该实现 name 属性
// 但这里处理的是对象，T3 要既是 T0 又是 T1，所以需要同时包含所有属性和方法
const p3: T3 = {
  name: "嘟嘟",
  age: 18,
  sayHi() {
    console.log("Hi");
  },
};

// 报错 缺少 sayHi
const p4: T3 = {
  name: "嘟嘟",
  age: 18,
};

