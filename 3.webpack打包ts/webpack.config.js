const path = require('path')

module.exports = {
  entry: './src/index.ts', //指定入口文件
  output: { //指定打包文件所在目录
    path: path.resolve(__dirname, 'dist'), //指定打包文件的目录
    filename: 'bundle.js', //打包后的文件
  },
  module: { //指定webpage打包时，要使用的模块
    rules: [ //指定要加载的规则
      {
        test: /\.ts$/,//规则生效文件，这里是以ts结尾的文件
        use: 'ts-loader',//要使用的loader，用它来处理上面指定的文件
        exclude: /node-modules/,//排除文件
      }
    ]
  }
}