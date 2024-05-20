type Obj = {
  name: string;
  age: number;
};

// 返回 Obj 所有 key 组成的联合类型
type K1 = keyof Obj; // "name" | "age"

type K2 = keyof any; // string | number | symbol（因为对象的 key 只能是这三者之一）
type K3 = keyof object; //never（因为object类型没有自身的属性，也就没有键名）
type K4 = keyof string; //number | typeof Symbol.iterator | "toString" | "charAt" ...
type K5 = keyof number; //"toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"

// 应用场景
function getObjectValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const cat = {
  name: "Tom",
  age: 3,
};

// 这里第二个参数就被限制为："name" | "age"
const v = getObjectValue(cat, "name");
