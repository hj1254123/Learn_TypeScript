// 对 lib.d.ts 中定义到原始类型进行扩展
// 接口建议定义在全局名为 global.d.ts 的文件中
// interface Window {
//   helloWorld(): void;
// }

// 定义函数
window.helloWorld = () => console.log('hello world');
// 调用
window.helloWorld();
// 滥用会报错
window.helloWorld('gracius'); // Error: 提供的参数与目标不匹配

