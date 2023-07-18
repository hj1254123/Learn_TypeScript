function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));

// tsc '.\01. hello.ts' 即可编译为 js 代码
