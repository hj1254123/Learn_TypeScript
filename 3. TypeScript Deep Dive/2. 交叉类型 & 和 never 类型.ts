// 交叉类型就是求并集
interface A {
  name: string
  age: number
}

interface B {
  name: number
  id: string
}

// 约束变量c
let c: A & B = {
  age: 1,
  id: '1',
  name: 'John' // 报错: 不能将类型“string”分配给类型“never”。
}

// 约束值 {}
let c2 = <A & B>{};
c2.age = 8;
c2.id = '88';
c2.name = '123'; //报错：不能将类型“string”分配给类型“never”。


// Never 类型
// - 上面例子的 name 就是 never 类型的，
//   因为不可能有一个变量既是 number 又是 string 类型，
//   那么只能分配 never 类型了。

