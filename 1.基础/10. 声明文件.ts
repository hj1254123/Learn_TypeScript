// 声明文件内容很多，见： https://ts.xcatliu.com/basics/declaration-files.html
// 当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

// - 什么是声明语句
// 以 jQuery 为例，通常使用方式：
// $('#foo');
// jQuery('#foo');
// 但是 typescript 可不认识 $ 和 jQuery
// 这个时候就要使用 declare var 来定义它的类型
declare var jQuery: (selector: string) => any; //这里仅用于编译时的检查，编译后会删除
jQuery('#foo');

// - 什么是声明文件
// .d.ts 文件就是声明文件，如：jQuery.d.ts

// src/jQuery.d.ts
declare var jQuery: (selector: string) => any;

// src/index.ts
jQuery('#foo');

// - 第三方声明文件
// 常用的第三方库的声明文件，社区已经帮我们定义好了
// npm install @types/jquery --save-dev

// - 书写声明文件
// 在不同的场景下，声明文件的内容和使用方式会有所区别。
// 库的使用场景主要有以下几种：
// 全局变量：通过 <script> 标签引入第三方库，注入全局变量
// npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
// UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
// 直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
// 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
// 模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构

// - 声明文件中的依赖
// - 自动生成声明文件
// 如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，
// 添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了。
// - 发布声明文件

// 以上见：https://ts.xcatliu.com/basics/declaration-files.html#书写声明文件

