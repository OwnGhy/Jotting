# 从零搭建一个vue-cli脚手架

## 初始化项目&安装初始依赖
首先☝️，在命令行中创建文件夹并进入，使用npm命令初始化项目：

```bash
mkdir vue-starter && cd vue-starter
npm init
```
然后，创建index.html：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Vue Starter</title>
</head>
<body>
    <h1>First Step!</h1>
</body>
</html>
```

创建src文件夹，并在src文件中创建main.js文件：

```bash
mkdir src && cd src
touch main.js
```
src/main.js中写入：

```js
window.onload = () => {
	console.log('load');
};
```

这个时候如果在index.html中引入./src/main.js，并在浏览器中运行index.html会发现控制台中打印了‘load’。代码少看起来并不复杂，但是当我们业务变复杂，之后代码量过大，就需要我们进行打包构建了😊。

所以下面进行webpack配置。

## webpack第一步
首先☝️，安装webpack 和webpack-cli：

```bash
npm i -D webpack webpack-cli
```

然后，在package.json中配置运行webpack的脚本命令：

```json
"scripts": {
    "build": "cross-env NODE_ENV=development webpack --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
这里用了新依赖，cross-env，进行安装：

```bash
npm i -D cross-env
```

关于build脚本命令解释：

1. cross-env依赖用于跨平台设置环境变量。在多数情况下，在windows平台下使用类似于: NODE_ENV=production的命令行指令会卡住；windows平台与POSIX在使用命令行时有许多区别（POSIX，使用$ENV_VAR；windows使用%ENV_VAR%）。cross-env就是解决这类跨平台问题的，统一每个平台的命令。
2. NODE_ENV=development 设置 NODE 的环境变量为开发环境
3. --config webpack.config.js 指明配置文件位置（相对路径）

创建webpack.config.js，webpack配置如下：

```js
const path = require('path');

const config = {
    entry: './src/main.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist/')
    }
};

module.exports = config;
```
上面是最基本的webpack配置，大概意思就是根据entry的./src/main.js内容进行打包构建输出到build.js.

然后运行npm run build命令会，会得到dist文件夹以及dist/build.js文件，但是执行npm run build的时候出现了一个warning❗️：

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```
提示我们在webpack配置中加上mode属性，加上之后就解决了这个warning。

dist/build.js就是src/main.js打包构建之后的内容。

现在将index.html中的src/main.js改成dist/build.js。

```
<script src="./dist/build.js"></script>
```
可以看到也得到了相同的效果。

## 引入vue
首先，安装vue与vue-loader：

```bash
npm i -D vue vue-loader
```
安装成功之后会看到控制台有一个warning❗️：

```bash
npm WARN vue-loader@15.6.2 requires a peer of css-loader@* but none is installed. You must install peer dependencies yourself.
```
意思是安装的包还需要依赖css-loader，所以继续安装css-loader：

```bash
npm i -D css-loader
```

然后在webpack.config.js中添加vue相关的loader：

```js
const path = require('path');

const config = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist/')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader:'vue-loader'
            }
        ]
    }
};

module.exports = config;
```
src下创建App.vue：

```vue
<template>
    <div id="app">
        Second Step!
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>
```

src下创建main.js：

```js
import Vue from 'vue';
import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});
```

这时候我们运行npm run build命令会得到以下报错❗️：

```bash
Module Error (from ./node_modules/vue-loader/lib/index.js):
[vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.
```
提示vue-loader需要依赖vue-template-compiler包，那么安装该包：

```bash
npm i -D vue-template-compiler
```

然后再运行npm run build，可以看到生成了dist文件夹与dist文件夹下的build.js。

修改index.html，引入打包后的文件dist/build.js，并添加id为app的元素，用于vue进行元素挂载：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Vue Starter</title>
</head>
<body>
    <div id="app"></div>
    <script src="./dist/build.js"></script>
</body>
</html>
```

然后在浏览器中运行index.html可以看到，页面中内容为“Second Step！”，表示我们的npm run build成功构建了我们的vue代码啦✌️。

## webpack开发环境（npm run dev）配置

但是，这样的开发方式还不是很方便，每次写完代码之后，需要手动npm run build构建打包，再手动刷新页面。所以我们需要配置开发环境的运行脚本。

首先，在package.json中添加dev命令脚本：

```json
"scripts": {
    "build": "cross-env NODE_ENV=development webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```
与build不同的是，dev脚本使用了webpack-dev-server，webpack-dev-server是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包，用于开发者在开发中配置使用。

关于webpack-dev-server的理解与使用，可以参考这篇文章👉[详解webpack-dev-server的使用](https://segmentfault.com/a/1190000006964335)。

webpack-dev-server是独立的包，所以进行安装：

```bash
npm i -D webpack-dev-server
```
对App.vue进行修改，将Second Step！修改为Third Step！

然后命令行中运行npm run dev，服务器启动成功，命令行中出现：Project is running at http://localhost:8080/，从浏览器中进入http://localhost:8080/访问页面，但是页面中的内容依旧是Second Step！。

服务器运行成功，但是页面内容未更新，这是射门原因呢？

检查index.html看到我们引入js的路径为./dist/build.js，但是进行npm run dev命令并没有更新dist的build.js。

这是因为webpack-dev-server打包的内容是放在内存中的，并不会在真实的目录中生成。

要想访问这个内存中的打包内容，需要借助webpack的publicPath这一API，publicPath路径下的打包文件可以在浏览器中访问。

关于publicPath的理解可以参考这里👉[Webpack中publicPath详解](https://juejin.im/post/5ae9ae5e518825672f19b094#heading-3)

在webpack.config.js中添加publicPath：

```js
output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
}
```
然后重新运行npm run dev可以发现页面内容更新为Third Step！啦✌️！

引入webpack-dev-server的目的就是为了在开发阶段根据修改快速更新页面，先试一下效果。修改App.vue内容为Third Step Updated!，然后Ctrl + s保存看看页面是否更新，在控制台中可以看到这样的提示：

```
[WDS] App updated. Recompiling...
build.js:7 [WDS] App hot update...
```
可以看到进行了重新编译和更新，不需要重新运行npm run dev，手动刷新页面可以看到页面内容更新了。

##进阶配置
### 自动生成html文件
在npm run build之后，dist文件夹中并没有index.html文件，要想引用打包的文件，需要手动引用。

使用HtmlWebpackPlugin可以自动生成html文件并注入打包的文件。

安装包：

```bash
npm i -D html-webpack-plugin
```

在webpack.config.js中引入并在plugins中添加配置：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    title: 'Vue Starter',
    filename: 'index.html',
    template: 'index.html',
    inject: 'body',
    hash: true,
});

const config = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader:'vue-loader'
            }
        ]
    },
    plugins: [
        htmlPlugin
    ]
};

module.exports = config;
```

现在运行npm run build可以看到生成了index.html并且自动引用了build.js。

### 热更新-自动刷新
虽然使用webpack-dev-server的--hot可以实现更新自动编译，但是还是需要手动刷新，这里使用热更新做进一步的优化。





