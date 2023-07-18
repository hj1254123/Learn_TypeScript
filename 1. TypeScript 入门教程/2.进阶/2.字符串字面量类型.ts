type Names = '小红' | '小白' | '小黑';
type Numbers = 1 | 2 | 3; //数字也是可以的

function handle(n: Names, n2?: Numbers) {
  console.log(n, n2)
}

handle('小红') // 会有提示，只能是上面定义的值之一
handle('小白', 3)

