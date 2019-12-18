// 指定一个编译的模板件,后续编译都会基于此模板文件来进行编译
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清理指定的文件夹或文件
module.exports = {
  entry: './src/index.ts', // 指定项目入口文件(项目本地开发和打包的时候都会从该文件开始读取)
  output: {
    // 指定项目编译完之后的输出文件
    filename: 'main.js'
  },
  resolve: {
    // extensions为一个数组，能够自动解析文件的扩展（比如index.js，在import引入的时候只需引入index即可，
    // 无需写.js后缀)
    extensions: ['.ts', 'tsx', '.js']
  },
  module: {
    // module中定义相应的loader解析
    rules: [
      {
        test: /\.tsx?$/, // 表示匹配到ts或tsx文件用ts-loader解析
        use: 'ts-loader', // 此处需要安装ts-loader插件
        exclude: /node_modules/ // 排除掉node_modules，编译的时候不去处理node_modules下的文件
      }
    ]
  },
  // 在调试的时候能够定位到代码
  // 开发时需要，生产打包之后时不需要的，可以增加编译打包速度，减小资源的浪费
  // 在这里要判断一下，这里的NODE_ENV是通过package.json中的cross-env插件配置的参数传来的
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    contentBase: './dist', // 指定本地开发环境运行时是基于哪个文件夹作为根目录来执行的
    // 指定项目启动后在控制台打印出哪些信息,'errors-only' 为只有错误的时候会在控制台打印
    stats: 'errors-only',
    compress: false, // 开发环境下不启用压缩,
    host: 'localhost',
    port: 5008
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist'] // build之前先清理掉指定文件夹中的文件
    }),
    new HtmlWebpackPlugin({
      template: './src/public/index.html' // 指定编译的模板文件
    })
  ]
};
