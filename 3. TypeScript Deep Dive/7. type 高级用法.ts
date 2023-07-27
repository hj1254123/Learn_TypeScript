// ## 使用联合类型定义一个类型
type MyUnionType = string | number;
const union1: MyUnionType = 123;
const union2: MyUnionType = '123';
const union3: MyUnionType = null;//报错

// ## 使用交叉类型定义一个类型
type MyIntersectionType = { prop1: string } & { prop2: number };

const intersection1: MyIntersectionType = {
  prop1: '123',
  prop2: 123
}
const intersection2: MyIntersectionType = { //报错，缺少 prop2
  prop1: '123',
}

// ## 使用泛型参数定义一个类型
type MyGenericType<T> = T[];
const generic: MyGenericType<number> = [1, 23, 4, '4']; // '4' 报错，必须是 number

// ## 使用条件类型定义一个类型
type MyConditionalType<T> = T extends string ? number : boolean;
const conditional1: MyConditionalType<string> = 123;
const conditional2: MyConditionalType<string> = '123'; //报错
const conditional3: MyConditionalType<object> = true;

// ## 使用映射类型定义一个类型
type MyMappedType<T> = {
  [K in keyof T]: T[K] | null;
};

type Person = {
  name: string;
  age: number;
};

const person1: MyMappedType<Person> = {
  name: null,//可以为 null 了
  age: 18
}

// 笔记：
// - keyof T 操作符会获取类型 T 的所有属性名，返回一个由属性名组成的联合类型。
// - 然后，in操作符会遍历这个联合类型，K 就代表这些属性。

// ## 使用拆包操作符定义一个类型
type MySpreadType = { prop1: string, prop2: number };
type MySpreadTypeProps = { [K in keyof MySpreadType]?: MySpreadType[K] };
const spread1: MySpreadType = {
  prop1: '123',
  prop2: 123
}
const spread2: MySpreadTypeProps = {
  prop1: '123',
  // 缺少 prop2 不报错，已经修改为可选了
}

// ## 使用索引类型查询操作符定义一个类型
type MyKeyType = keyof MySpreadType; // 这里拿到的是联合类型 'prop1' | 'prop2'
const keyType1: MyKeyType = 'prop1';
const keyType2: MyKeyType = 'prop2';
const keyType3: MyKeyType = 'prop3'; //报错，不能是其它


// ## 使用typeof操作符获取一个值的类型
const myValue = 42;
type MyValueType = typeof myValue; // 拿到的就是 42
const valueType1: MyValueType = 42;
const valueType2: MyValueType = 41; //报错只能是42