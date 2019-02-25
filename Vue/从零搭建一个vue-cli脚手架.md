# 从零搭建一个vue-cli脚手架

## 初始化项目
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
    "build": "cross-env NODE_ENV= production webpack --moe=production --config webpack.config.js",
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
3. --mode=procution配置为生产环境模式
4. --config webpack.config.js 指明配置文件位置（相对路径）

创建webpack.config.js，webpack配置如下：

```js
const path = require('path');

const config = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist/')
    }
};

module.exports = config;
```
上面是最基本的webpack配置，大概意思就是根据entry的./src/main.js内容进行打包构建输出到bundle.js.

然后运行npm run build命令会，会得到dist文件夹以及dist/bundle.js文件，dist/bundle.js就是src/main.js打包构建之后的内容。

现在将index.html中的src/main.js改成dist/bundle.js。

```
<script src="./dist/bundle.js"></script>
```
再在浏览器中打开index.html，可以看到也得到了相同的效果。

### 生成的bundle文件添加hash
为什么添加hash？

是为了防止浏览器缓存机制阻止文件的更新，为打包文件添加hash后缀之后，每次构建打包生成的文件名的hash都会发生改变，强制浏览器进行刷新，获取当前最新的文件就可以防止使用缓存文件。

如何添加？
在output中设置：

```
output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, './dist/'),
}
```

设置好hash之后，运行npm run build命令会发现dist下生成的bundle带上了hash。

### 自动生成html文件
在npm run build之后，dist文件夹中并没有index.html文件，要想引用打包的文件，需要手动引用，并且由于上一步为bundle添加了hash，所以每次构建都需要手动修改script标签的src路径。

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
    // 生成的html的title
    title: 'Vue Starter',
    // 生成的html的文件名
    filename: 'index.html',
    // 注入bundle到body中
    inject: 'body'
});

const config = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, './dist/')
    },
    plugins: [
        htmlPlugin
    ]
};

module.exports = config;
```

现在运行npm run build可以看到生成了index.html并且自动引用了带hash后缀的bundle.[hash].js。

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
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
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
    <div>
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

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App)
}).$mount(root)
```

这时候我们运行npm run build命令会得到以下报错❗️：

```bash
Module Error (from ./node_modules/vue-loader/lib/index.js):
[vue-loader] vue-template-compiler must be installed as a peer dependency, or a compatible compiler implementation must be passed via options.
```
提示vue-loader需要依赖vue-template-compiler包，安装该包即可：

```bash
npm i -D vue-template-compiler
```
然后运行npm run build又报错❗️啦：

```
ERROR in ./src/App.vue
Module Error (from ./node_modules/vue-loader/lib/index.js):
vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in your webpack config.
 @ ./src/main.js 2:0-28 8:21-24

ERROR in ./src/App.vue?vue&type=template&id=4fa9bc52& 2:0
Module parse failed: Unexpected token (2:0)
You may need an appropriate loader to handle this file type.
```
这个bug是因为vue-loader版本问题引起的，v15版本需要依赖VueloaderPlugin包，解决这个问题的办法是使用v14版本的vue-loader，在package.json中修改vue-loader的版本为14.2.2，然后npm install一下就可以了。具体的解决办法参考👉[enableVueLoader does not include VueLoaderPlugin?](https://github.com/symfony/webpack-encore/issues/311)

然后再运行npm run build，可以看到生成了dist文件夹与dist文件夹下的bundle.js。

然后在浏览器中运行index.html可以看到，页面中内容为“Second Step！”，表示我们的npm run build成功构建了我们的vue代码啦✌️。

## webpack开发环境（npm run dev）配置

但是，这样的开发方式还不是很方便，每次写完代码之后，需要手动npm run build构建打包，再手动刷新页面。所以我们需要配置开发环境的运行脚本。

首先，在package.json中添加dev命令脚本：

```json
"scripts": {
    "build": "cross-env NODE_ENV=production --mode=production webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --mode=development --config webpack.config.js --open",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```
关于dev脚本命令解释：

1. 与build不同的是，dev脚本使用了webpack-dev-server，webpack-dev-server是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包，用于开发者在开发中配置使用。
2. --mode=development设置模式为开发环境
3. --open设置后，会在服务器启动之后立即打开页面

关于webpack-dev-server的理解与使用，可以参考这篇文章👉[详解webpack-dev-server的使用](https://segmentfault.com/a/1190000006964335)。

webpack-dev-server是独立的包，所以进行安装：

```bash
npm i -D webpack-dev-server
```
对App.vue进行修改，将Second Step！修改为Third Step！

然后命令行中运行npm run dev，服务器启动成功，命令行中出现：Project is running at http://localhost:8080/，从浏览器中进入http://localhost:8080/访问页面，但是页面中的内容依旧是Second Step！。

服务器运行成功，但是页面内容未更新，这是什么原因呢？

检查根目录下的index.html看到我们引入js的路径为/dist/bundle.js，但是进行npm run dev命令并没有更新dist的bundle.js。

这是因为webpack-dev-server打包的内容是放在内存中的，并不会在真实的目录中生成。

这里只需要把index.html中的引入bundle.js的script标签删除即可。因为在前面加了html-webpack-plugin包，在运行过程中会自动对内存中的index.html插入js。所以不需要再手动插入。

> 注意：
> 
> 如果还未使用html-webpack-plugin，则需要用publicPath来解决。设置devServer的publicPath为/dist/即可。
> 
> 关于publicPath的理解可以参考这里👉[Webpack中publicPath详解](https://juejin.im/post/5ae9ae5e518825672f19b094#heading-3)

引入webpack-dev-server的目的就是为了在开发阶段根据修改快速更新页面，先试一下效果。修改App.vue内容为Third Step Updated!，然后Ctrl + s保存看看页面是否更新，在控制台中可以看到这样的提示：

```
[WDS] App updated. Recompiling...
bundle.js:7 [WDS] App hot update...
```
可以看到进行了重新编译和更新，页面内容也进行了刷新，不需要重新运行npm run dev。

##进阶配置

### 自动清理dist文件夹
前面添加了hash的设置，每次npm run build的时候都会生成新的hash后缀的文件，不会覆盖之前的bundle.[hash].js，导致dist文件夹的内容越来越多。

这里就可以使用clean-webpack-plugin包实现每次构建的时候自动清理dist文件夹，首先安装clean-webpack-plugin包：

```bash
npm i -D clean-webpack-plugin
```

webpack.config.js中引入clean-webpack-plugin包并在plugins中配置：

```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new CleanWebpackPlugin(['dist']));
}
```
配置之后，每次运行npm run build就可以清理dist文件夹之前的内容了。

### 添加css-loader
一开始就安装了css-loader没使用，就算在App.vue中添加了样式也不会出错，那么css-loader到底是干什么的呢？

webpack的官方解释：
> css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。

在某些情况下，可能需要在js中引用css文件，例如添加一些全局的样式配置或者是通过引入css文件达到css修改热更新的目的等。这时候需要在js中通过require('xxx.css')引入，但是运行项目会出现以下错误。

```bash
ERROR in ./src/text.css 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
```
这时候在 webpack.config.js 中添加 css-loader 就能解决这个问题：

```bash
{
    test: /\.css$/,
    loader:'css-loader'
}
```

所以 css-loader 是处理 css 文件，将 css 装载到 javascript。

> 注意
> 
> 安装最新版本的css-loader（2.1.0）在构建（npm run build）的时候会出现如下错误：
> 
> ValidationError: CSS Loader Invalid Options
>
> options should NOT have additional properties
> 
> 由于目前暂未找到解决方法，所以暂时安装指定的旧版本（1.0.1），等找到解决方法之后会更新。


关于css-loader理解参考这里👉[你真的知道 css-loader 怎么用吗？](https://juejin.im/entry/5826e755c4c9710054313d6e)

关于style-loader理解参考这里👉[style-loader详细使用说明](https://juejin.im/post/5a2668996fb9a0450b663f20)

关于样式相关的loader对比可以参考这里👉[style-loader、css-loader、mini-css-extract-plugin 区别](https://www.cnblogs.com/cag2050/p/10021306.html)

### 添加图片处理loader
```vue
<template>
    <div>
        Third Step!
    </div>
</template>

<script>
    export default {
       name: 'App',
    }
</script>
<style>
    div {
    	width: 200px;
		height: 200px;
		background: url("./logo.png");
    }
</style>
```
其中的关键是background的url设置，运行npm run dev会发现报错❗️：

```bash
ERROR in ./src/logo.png 1:0
Module parse failed: Unexpected character '�' (1:0)
You may need an appropriate loader to handle this file type.
```
这个问题是项目不能识别图片后缀的原因，所以添加引用资源的loader：

```bash
npm i -D url-loader
```
webpack.config.js配置图片相关的loader：

```js
{
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader'
}
```
然后项目就可以成功运行且引入图片了✅。

### 引入less
安装less和less-loader：

```bash
npm i -D less less-loader
```
webpack.config.js中添加less的loader配置：

```js
{
    test: /\.less$/,
    loader: 'style!css!less'
}
```
然后既可以使用less了✌️！

### 提取css
extract-text-webpack-plugin只支持 webpack 4 以下提取 CSS 文件，webpack 4使用extract-text-webpack-plugin包的alpha版本，安装：

```bash
npm i -D extract-text-webpack-plugin@next
```

在webpack.config.js中首先对vue文件中的样式做etract处理， 添加extractCSS的配置：

```
{
    test: /\.vue$/,
    loader:'vue-loader',
    options: {
        extractCSS: true
    }
}
```
然后在plugins中使用extract-text-webpack-plugin：

```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

plugins: [
    htmlPlugin,
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('style.css')
]
```

运行npm run build就可以成功单独提取css了。

关于npm安装@next的解释参考这里👉[npm使用小技巧](https://www.jianshu.com/p/aee822f0ee7a)