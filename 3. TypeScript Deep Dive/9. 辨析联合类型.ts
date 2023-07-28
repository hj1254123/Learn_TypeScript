// ## 先看一个例子
// interface Square {
//   kind: 'square';
//   size: number;
// }

// interface Rectangle {
//   kind: 'rectangle';
//   width: number;
//   height: number;
// }

// type Shape = Square | Rectangle;

// function area(s: Shape) {
//   // typescript 通过这类判断会自动缩小类型范围
//   if (s.kind === 'square') {
//     // 现在 TypeScript 知道 s 的类型是 Square
//     // 所以你现在能安全使用它
//     return s.size * s.size;
//   } else {
//     // 不是一个 square ？因此 TypeScript 将会推算出 s 一定是 Rectangle
//     return s.width * s.height;
//   }
// }

// ## 详细的检查
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else if (s.kind === 'rectangle') {
    return s.width * s.height;
  }
  // 这里的 s 是 Circle 但没有使用，怎么让typescript报错，提示你呢？
}
// 利用 never 只能复制给 never 实现
function area2(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else if (s.kind === 'rectangle') {
    return s.width * s.height;
  } else {
    // Error: 'Circle' 不能被赋值给 'never'，这样你就知道少处理了 Circle
    const _exhaustiveCheck: never = s;
  }
}
// 修改后
function area3(s: Shape) {
  if (s.kind === 'square') {
    return s.size * s.size;
  } else if (s.kind === 'rectangle') {
    return s.width * s.height;
  } else if (s.kind === 'circle') {
    return Math.PI * s.radius ** 2;
  } else {
    // ok
    const _exhaustiveCheck: never = s;
  }
}

// ## Switch
// 你可以通过 switch 来实现以上例子。
function area4(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
  }
}

// ## strictNullChecks
// 如果你使用 strictNullChecks 选项来做详细的检查，你应该返回 _exhaustiveCheck 变量（类型是 never），
// 否则 TypeScript 可能会推断返回值为 undefined：
function area5(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size;
    case 'rectangle':
      return s.width * s.height;
    case 'circle':
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
      return _exhaustiveCheck;
  }
}


