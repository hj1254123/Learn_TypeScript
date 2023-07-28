// never 类型
// - 一个从来不会有返回值的函数（如：如果函数内含有 while(true) {}）；
// - 一个总是会抛出错误的函数（如：function foo() { throw new Error('Not Implemented') }，
//   foo 的返回类型是 never）；

let foo1: never; // ok
// never 类型仅能被赋值给另外一个 never
let foo2: never = 123; // Error: number 类型不能赋值给 never 类型

// ## 用例
function foo(x: string | number): boolean {
  if (typeof x === 'string') {
    return true;
  } else if (typeof x === 'number') {
    return false;
  }

  return fail('Unexhaustive');
}

function fail(message: string): never {
  throw new Error(message);
}

// ## 与 void 的差异
// 当一个函数返回空值时，它的返回值为 void 类型，
// 但是，当一个函数永不返回时（或者总是抛出错误），
// 它的返回值为 never 类型。
// void 类型可以被赋值（在 strictNullChecking 为 false 时），
// 但是除了 never 本身以外，其他任何类型不能赋值给 never。