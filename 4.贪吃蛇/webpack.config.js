const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts', //指定入口文件
  output: { //指定打包文件所在目录
    path: path.resolve(__dirname, 'dist'), //指定打包文件的目录
    filename: 'bundle.js', //打包后的文件
  },
  module: { //指定webpage打包时，要使用的模块
    rules: [ //指定要加载的规则
      {
        test: /\.ts$/, //规则生效文件，这里是以ts结尾的文件
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      'chrome': '51',
                    },
                    'corejs': '3', //corejs版本
                    'useBuiltIns': 'usage', //按需加载
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node-modules/, //排除文件
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [ //配置webpack插件
    new HTMLWebpackPlugin({ //自动生成html文件
      // title: '自定义 title'
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: { //配置模块如何解析
    extensions: ['.ts', '.js'], //配置需要解析的扩展名
  }
}