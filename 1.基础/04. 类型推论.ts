// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

// 下面代码会报错
// let myFavoriteNumber = 'seven'; //没有明确指定类型，但有赋值，所以被推断为 string 类型。
// myFavoriteNumber = 7; //报错
// 等价于
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7;
 
// 下面代码 myFavoriteNumber 会被推断为 any 类型
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
