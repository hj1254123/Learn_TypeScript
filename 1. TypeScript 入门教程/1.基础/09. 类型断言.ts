// - 类型断言（Type Assertion）可以用来手动指定一个值的类型。

// 语法：`值 as 类型` 或 `<类型>值`
// 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。
// 形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode，
// 在 ts 中除了表示类型断言之外，也可能是表示一个泛型。
// **故建议大家在使用类型断言时，统一使用 `值 as 类型` 这样的语法**

// - 类型断言的用途
// 1. 将一个联合类型断言为其中一个类型
// 看下面例子：
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  // return animal.run() //报错，只能访问共有的属性或方法
  return animal.name;
}
// 上面代码，typescript不确定 animal 这个联合类型的变量到底是谁，
// 所以，只能访问它们共有的属性或方法。
// 而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法，比如：
function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') { // 报错
    return true;
  }
  return false;
}
// 此时可以使用类型断言，将 animal 断言成 Fish：
function isFish2(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
// 上面代码，在编译到 js 不会出错，因为有 if 判断。
// 但是下面的情况就不行了：
function swim(animal: Cat | Fish) {
  (animal as Fish).swim(); // typescript 没有报错
}

const tom: Cat = {
  name: 'Tom',
  run() { console.log('run') }
};
swim(tom);
// 我们运行 `tsc '.\09. 类型断言.ts'` 编译
// 报错：属性` swim `在类型` Cat `上不存在。
// 所以使用断言，要小心。

// 2. 将一个父类断言为更加具体的子类
interface ApiError extends Error {
  code: number;
}
interface HttpError extends Error {
  statusCode: number;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
// 上面代码 error 没有 code 属性，if 判断不会通过，自然返回 false
// 所以用断言编译后不会有问题。

// 3. 将任何一个类型断言为 any
window.foo = 1; 
// 上面会报错，window 上没有 foo 这个属性。
// 这种提示很有用，但是我就有往 window 上加属性的需求呢？
(window as any).foo = 1; // 这样就不会报错了，编译后往 window 上加 foo 属性是允许的。
// 注意：它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。
// 断言在这种情况下很方便，但也要小心使用。

// 4. 将 any 断言为一个具体的类型
// 在遇到 any 类型的变量时，为了增加我们代码的可维护性，
// 我们可以通过断言为一个精确的类型，来解决。

// 下面就是个返回 any 类型的函数（本例最优解是用泛型，见最后，这里只是为了演示）
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
// 我们将它的返回值，断言为一个精确的类型，便于后续使用：
interface Cat {
  name: string;
  run(): void;
}

const mimi = getCacheData('mimi') as Cat;
mimi.run() //这样就有代码提示了

// TODO: 这节需要前置知识看不懂，直接复制下来了，可以先记住结论。
// - 类型断言的限制
// 从上面的例子中，我们可以总结出：

// 联合类型可以被断言为其中一个类型
// 父类可以被断言为子类
// 任何类型都可以被断言为 any
// any 可以被断言为任何类型
// 那么类型断言有没有什么限制呢？是不是任何一个类型都可以被断言为任何另一个类型呢？

// 答案是否定的——并不是任何一个类型都可以被断言为任何另一个类型。

// 具体来说，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。

// 下面我们通过一个简化的例子，来理解类型断言的限制：
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}

let tom2: Cat = {
  name: 'Tom2',
  run: () => { console.log('run') }
};
let animal: Animal = tom2;
// 我们知道，TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，
// 而会忽略它们定义时的关系。

// 在上面的例子中，Cat 包含了 Animal 中的所有属性，除此之外，
// 它还有一个额外的方法 run。TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，
// 而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的：
interface Animal {
  name: string;
}
interface Cat extends Animal {
  run(): void;
}
// 那么也不难理解为什么 Cat 类型的 tom 可以赋值给 Animal 类型的 animal 了
// 就像面向对象编程中我们可以将子类的实例赋值给类型为父类的变量。

// 我们把它换成 TypeScript 中更专业的说法，即：Animal 兼容 Cat。

// 当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了：
function testAnimal(animal: Animal) {
  return (animal as Cat);
}
function testCat(cat: Cat) {
  return (cat as Animal);
}
// 这样的设计其实也很容易就能理解：

// 允许 animal as Cat 是因为「父类可以被断言为子类」，这个前面已经学习过了
// 允许 cat as Animal 是因为既然子类拥有父类的属性和方法，
// 那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」

// 需要注意的是，这里我们使用了简化的父类子类的关系来表达类型的兼容性，
// 而实际上 TypeScript 在判断类型的兼容性时，比这种情况复杂很多，
// 详细自行学习：类型的兼容性。

// 总之，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。
// 同理，若 B 兼容 A，那么 A 能够被断言为 B，B 也能被断言为 A。

// 所以这也可以换一种说法：
// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可，
// 这也是为了在类型断言时的安全考虑，毕竟毫无根据的断言是非常危险的。

// 综上所述：

// 联合类型可以被断言为其中一个类型
// 父类可以被断言为子类
// 任何类型都可以被断言为 any
// any 可以被断言为任何类型
// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可
// 其实前四种情况都是最后一个的特例。

// - 双重断言
// 既然：

// 任何类型都可以被断言为 any
// any 可以被断言为任何类型
// 那么我们是不是可以使用双重断言 as any as Foo 
// 来将任何一个类型断言为任何另一个类型呢？
interface Cat {
  run(): void;
}
interface Fish {
  swim(): void;
}

function testCat2(cat: Cat) {
  return (cat as any as Fish);
}
// 上面这样做，虽然不会报错。但是除非万不得已，千万别这样做。
// 因为这很可能导致运行时出错。

// - 类型断言 vs 类型转换
function toBoolean(something: any): boolean {
  return something as boolean;
}

toBoolean(1); // 返回 1。
// 所以类型断言不会转换类型，如果要转换还是调用 Boolean(something)。

// - 类型断言 vs 类型声明
// 在这个例子中：
function getCacheData2(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom3 = getCacheData('tom') as Cat;
tom.run();
// 我们使用 as Cat 将 any 类型断言为了 Cat 类型。
// 但实际上还有其他方式可以解决这个问题：
function getCacheData3(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom4: Cat = getCacheData('tom');
tom.run();
// 上面的例子中，我们通过类型声明的方式，将 tom 声明为 Cat，
// 然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。

// 这和类型断言是非常相似的，而且产生的结果也几乎是一样的,
// tom 在接下来的代码中都变成了 Cat 类型。

// 它们的区别，可以通过这个例子来理解：

interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}
const animal2: Animal = {
    name: 'tom'
};
let tom5 = animal2 as Cat;
tom5.run() //虽然会有提示，也没有报错。但是没有这个方法，运行时会报错。
// 在上面的例子中，由于 Animal 兼容 Cat，故可以将 animal 断言为 Cat 赋值给 tom。

// 但是若直接声明 tom 为 Cat 类型：
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal3: Animal = {
    name: 'tom'
};
let tom6: Cat = animal3;

// 则会报错，不允许将 animal 赋值为 Cat 类型的 tom。
// 这很容易理解，Animal 可以看作是 Cat 的父类，
// 当然不能将父类的实例赋值给类型为子类的变量。

// 深入的讲，它们的核心区别就在于：
// animal 断言为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
// animal 赋值给 tom，需要满足 Cat 兼容 Animal 才行
// 但是 Cat 并不兼容 Animal。

// 而在前一个例子中，由于 getCacheData('tom') 是 any 类型，
// any 兼容 Cat，Cat 也兼容 any，故
const tom7 = getCacheData('tom') as Cat;
// 等价于
const tom8: Cat = getCacheData('tom');
// 知道了它们的核心区别，就知道了类型声明是比类型断言更加严格的。

// 所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。

// - 类型断言 vs 泛型
// 上面一节的例子，用泛型解决才是最优解：
function getCacheData4<T>(key: string): T {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

const tom9 = getCacheData4<Cat>('tom');
tom9.run();
