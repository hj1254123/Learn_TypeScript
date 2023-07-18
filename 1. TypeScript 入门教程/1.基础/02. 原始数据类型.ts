// - 布尔值
let isDone: boolean = false;
// let createdByNewBoolean: boolean = new Boolean(1)
// 上面代码会报错，new Boolean() 返回的是一个 Boolean 包装器对象
// 正确写法：
let createdByNewBoolean: Boolean = new Boolean(1)
let createdByBoolean: boolean = Boolean(1) // Boolean(1) 返回的是布尔值

// isDone = '123'//这里就会报错，只能是 boolean 类型

// - 数值
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

// - 字符串
let myName: string = 'monkey';
let myName2: string = `monkey2`;

// - 空值
// 没有返回值的函数
function alertName(): void {
  console.log('first');
}

// - Null 和 Undefined
let u: undefined = undefined;
let n: null = null;







