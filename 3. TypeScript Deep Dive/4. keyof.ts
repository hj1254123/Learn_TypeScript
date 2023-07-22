// keyof操作符可以用于获取某种类型的所有键，其返回类型是联合类型。
type Person = {
  name: string;
  age: number;
};

type PersonKeys = keyof Person; // 相当于 'name' | 'age'

const key1: PersonKeys = "name";
const key2: PersonKeys = "age";
const key3: PersonKeys = "gender"; // 报错，因为 "gender" 并不是 Person 的属性
