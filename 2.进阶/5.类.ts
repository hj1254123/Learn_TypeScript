// typescript中类的用法

// ## public private 和 protected
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
// 例子:
class Animal {
  public name;
  private age;
  protected hobby;
  public constructor(name, age, hobby) {
    this.name = name;
    this.age = age;
    this.hobby = hobby;
  }
}

let a = new Animal('Jack', 18, '篮球');
console.log(a.name); // Jack 
a.name = 'Tom';
console.log(a.name); // Tom

console.log(a.age); // 报错。属性“age”为私有属性，只能在类“Animal”中访问。
console.log(a.hobby)// 报错。属性“hobby”受保护，只能在类“Animal”及其子类中访问

// **注意:private、protected 只在 typescript 中限制访问性，
// 编译后的代码依旧能够访问，只是会报错。**】

// - private、protected 在子类中的可访问性
class Cat extends Animal {
  constructor(name, age, hobby) {
    super(name, age, hobby);
    console.log(this.age); //属性“age”为私有属性，只能在类“Animal”中访问。
    console.log(this.hobby); //'篮球'。 protected属性，能够在子类中访问。
  }
}

// - 当构造函数修饰为 private 时，该类不允许被继承或者实例化：
class Animal2 {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Cat2 extends Animal2 { //报错，不允许被继承。
  constructor(name) {
    super(name);
  }
}
let a2 = new Animal2('Jack'); //报错，不允许实例化。

// - 当构造函数修饰为 protected 时，该类只允许被继承：
class Animal3 {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
class Cat3 extends Animal3 {//可以继承
  constructor(name) {
    super(name);
  }
}

let a3 = new Animal3('Jack');//不允许实例化

// ## 参数属性
// 修饰符和readonly还可以使用在构造函数参数中，
// 等同于类中定义该属性同时给该属性赋值，使代码更简洁。
class Animal4 {
  // 省了两行代码
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}

let dog = new Animal4('wangwang');
console.log(dog.name);//wangwang

// ## readonly
// 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
class Animal5 {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let b = new Animal5('Jack');
console.log(b.name); // Jack
b.name = 'Tom'; //报错，只读。

// 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
// public constructor(public readonly name) {

// ## 抽象类
// abstract 用于定义抽象类和其中的抽象方法。
// 抽象类是一种不能被实例化的类，其目的是供其他类继承并实现其抽象方法。抽象类的使用场景包括：
// 1. 定义一些通用的属性和方法，让子类继承并实现具体的功能。
// 2. 强制子类实现某些方法，以确保在使用子类时这些方法一定存在，从而避免出现运行时错误。
// 3. 在多态性的应用中，抽象类可以作为父类，让不同的子类继承并实现同样的抽象方法，从而实现不同子类的多态性。
// 4. 抽象类可以作为一个模板类，提供一些基本的实现，让子类只需要实现具体的细节即可。
// 总之，抽象类的主要作用是为其他类提供一个通用的模板，让子类可以继承并实现其抽象方法，从而实现代码的重用和扩展性的提高。

// 这个例子演示抽象类的使用场景，以及给类加上类型。
abstract class Animal6 {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract makeSound(): void;
}

class Dog6 extends Animal6 {
  constructor(name: string) {
    super(name);
  }
  // makeSound 被定义为了抽象方法，必须实现，否则报错
  makeSound(): void {
    console.log(`${this.name} barks`);
  }
}

class Cat6 extends Animal6 {
  constructor(name: string) {
    super(name);
  }

  makeSound(): void {
    console.log(`${this.name} meows`);
  }
}

let myDog6: Animal6 = new Dog6("Buddy");
let myCat6: Animal6 = new Cat6("Smokey");

myDog6.makeSound(); // "Buddy barks"
myCat6.makeSound(); // "Smokey meows"
