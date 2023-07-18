// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
// 元组起源于函数编程语言（如 F#），这些语言中会频繁使用元组。

let person: [string, number] = ['Tom', 25];
// person[0] = 12; //报错,类型不正确
person[0] = 'Johnny';
person[1] = 22;

person[0].slice(1);
person[1].toFixed(2);

let tom: [string, number];
// tom = ['Tom', 25];//通过
// tom = [25, 'Tom2'];//报错，类型正确
// tom = ['Tom', 25, 1];//报错，进允许两个元素
tom = ['Tom'];//报错，需要两个参数


// - 越界的元素
// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
let Anna: [string, number];
Anna = ['Anna', 25];
Anna.push('male');
Anna.push(true); // 报错，不是 string | number

// - 使用场景
// 使用元组类型来限制数组中元素的类型和数量
type Person = [string, number, string];

const persons: Person[] = [
  ['张三', 18, '男'],
  ['李四', 14, '男']
];

persons.push(['王二麻']); //元素少了、多了、类型错了，都会报错

