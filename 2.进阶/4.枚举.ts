// 使用场景，如：一周只能有七天、HTTP状态码等
// - 简单使用：星期
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
console.log(Days.Sun)
// 上面代码会编译成如下：
// var Days;
// (function (Days) {
//     Days[Days["Sun"] = 0] = "Sun";
//     Days[Days["Mon"] = 1] = "Mon";
//     Days[Days["Tue"] = 2] = "Tue";
//     Days[Days["Wed"] = 3] = "Wed";
//     Days[Days["Thu"] = 4] = "Thu";
//     Days[Days["Fri"] = 5] = "Fri";
//     Days[Days["Sat"] = 6] = "Sat";
// })(Days || (Days = {}));
// ;
// console.log(Days.Sun);
// 以 Days[Days["Sun"] = 0] = "Sun"; 为例
// 得到：Days {"0": "Sun", "Sun": 0 }

// 所以：
console.log(Days.Sun) // 0
console.log(Days[0]) // "Sun"

// - 简单使用：HTTP状态码
enum HttpStatusCode {
  Ok = 200,
  NotFound = 404,
  InternalServerError = 500
}
console.log(HttpStatusCode.Ok); // 200

