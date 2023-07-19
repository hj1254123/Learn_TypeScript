// 内联类型注解
let username: {
  first: string;
  second: string;
}

username = {
  first: 'John',
  second: 'Doe'
}

// 如果定义接口对比：
// interface Username {
//   first: string;
//   second: string;
// }

// let username2: Username;

// 选择：
// - 当你需要重复定义内联类型注解时，接口会更好。