// - 抽象类
abstract class Contact {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract hi(): void;
  run(): void {
    console.log(`${this.name} is running.`)
  }
}

class User extends Contact {
  constructor(name: string) {
    super(name)
  }
  hi() {
    console.log(this.name)
  }
}

const tom = new User('Tom')
tom.hi() // Tom
tom.run() // Tom is running. 
// 差异1：抽象类，子类可以继承其非抽象方法，而接口不能。

// - 接口
interface Contact2 {
  name: string;
  hi(): void;
}

interface Contact3 {
  age: number;
}

// 差异2：可实现多个接口，而抽象类不行
class User2 implements Contact2, Contact3 {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  hi() {
    console.log(this.name)
  }
}

// 他们的区别如下：
// 1. 在抽象类中可以写非抽象的方法，从而避免在子类中重复书写他们，
//    这样可以提高代码的复用性，这是抽象类的优势；接口中只能有抽象的方法。
// 2. 一个类只能继承一个直接父类，这个父类可以是具体的类也可是抽象类；
//    但是一个类可以实现多个接口。