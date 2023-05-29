let myName: any = 'monkey';
myName = 2; //不会报错

// 以下不会报错：
console.log(myName.age)
console.log(myName.sayHi())
// 可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

// 未声明类型的变量，会被推断为 any 类型
let something;
something = 'seven';
something = 7;

something.setName('Tom');