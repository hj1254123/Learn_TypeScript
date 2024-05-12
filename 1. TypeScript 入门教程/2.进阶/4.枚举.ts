// 使用场景，如：一周只能有七天、HTTP状态码等
// - 简单使用：星期
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
console.log(Days.Sun);
// 上面代码会编译成如下：
// var Days;
// (function (Days) {
//     Days[Days["Sun"] = 0] = "Sun";
//     Days[Days["Mon"] = 1] = "Mon";
//     Days[Days["Tue"] = 2] = "Tue";
//     Days[Days["Wed"] = 3] = "Wed";
//     Days[Days["Thu"] = 4] = "Thu";
//     Days[Days["Fri"] = 5] = "Fri";
//     Days[Days["Sat"] = 6] = "Sat";
// })(Days || (Days = {}));
// ;
// console.log(Days.Sun);
// 以 Days[Days["Sun"] = 0] = "Sun"; 为例
// 得到：Days {"0": "Sun", "Sun": 0 }

// 所以：
console.log(Days.Sun); // 0
console.log(Days[0]); // "Sun"

// - 手动赋值字符串
// 支付方式
enum PaymentOption {
  WeChatPay,
  AliPal,
}

console.log(PaymentOption.WeChatPay); // wechatpay
function checkout(paymentOption: PaymentOption) {
  switch (paymentOption) {
    case PaymentOption.WeChatPay:
      console.log("wechatpay");
      break;
    case PaymentOption.AliPal:
      console.log("alipay");
      break;
    default:
      throw new Error("Invalid payment option");
  }
}
checkout(PaymentOption.AliPal); // alipay

// 上面例子如果使用上上节的“字符串字面量类型”，修改如下：
type PaymentOption2 = "wechat" | "alipay";

function checkout2(paymentOption: PaymentOption2) {
  switch (paymentOption) {
    case "wechat":
      // 处理微信支付逻辑
      break;
    case "alipay":
      // 处理支付宝支付逻辑
      break;
    default:
      throw new Error("Invalid payment option");
  }
}

checkout2("wechat");
// 在该场景下，枚举的可读性、可维护性更佳。

// 手动复制数字
enum Days2 {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days2["Sun"] === 7); // true
console.log(Days2["Mon"] === 1); // true
console.log(Days2["Tue"] === 2); // true
console.log(Days2["Sat"] === 6); // true
// 如上，会自动递增。
// 但是要小心：
enum Days3 {
  Sun = 3,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days3["Sun"] === 3); // true
console.log(Days3["Wed"] === 3); // true
console.log(Days3[3] === "Sun"); // false
console.log(Days3[3] === "Wed"); // true
// 两个 3，重复了。

// 也可以是小数：
enum Days4 {
  Sun = 7,
  Mon = 1.5,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days4["Sun"] === 7); // true
console.log(Days4["Mon"] === 1.5); // true
console.log(Days4["Tue"] === 2.5); // true
console.log(Days4["Sat"] === 6.5); // true
// 如上，自动递增1

// - 计算所得项
enum Color {
  Red,
  Green,
  Blue = "blue".length,
} //Blue = "blue".length 就是计算所得项
// enum Color2 { Red = "red".length, Green, Blue }; //报错，紧接着计算所得项后面的，必须是手动赋值项
console.log(Color.Blue); // 4("blue"的长度)

// - 外部枚举
// 用于声明文件中 xxx.d.ts
declare enum Directions {
  Up,
  Down,
  Left,
  Right,
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。编译成：
// var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// declare const 配合使用
declare const enum Directions2 {
  Up,
  Down,
  Left,
  Right,
}

let directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];
// 编译成：
// var directions2 = [0 /* Directions2.Up */, 1 /* Directions2.Down */, 2 /* Directions2.Left */, 3 /* Directions2.Right */];
