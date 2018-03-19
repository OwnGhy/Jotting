## React原生API笔记

### React创建组件的三种方式
- 函数式定义无状态组件
- React.createClass方式定义（es5）
- React.Component方式定义（es6）

这里主要记录一下无状态组件。

##### 无状态组件
无状态组件作为用于展示的组件，这类组件只根据传入的props进行展示，与状态state无关。无状态组件是只带一个render方法的组件类，通过函数形式或者尖头函数形式创建。

```
function HelloComponent(props, /* context */) {
  return <div>Hello {props.name}</div>
}
ReactDOM.render(<HelloComponent name="Sebastian" />, mountNode) 
```
无状态组件的特点：

1. 组件不会被实例化，整体渲染性能得到提升
2. 不能访问this对象
3. 无法访问生命周期勾子函数
4. 只能访问输入的props
5. 无副作用

### 对比props和state
参考：[React中state与props介绍与比较](https://www.cnblogs.com/ZSG-DoBestMe/p/5293457.html)

### Fragment（片段）

参考：[片段(fragments)](http://www.css88.com/react/docs/fragments.html)

在写React组件的时候，render最外层只能有一个元素，常使用div来包含所有子元素；但div常常是多余的，会导致一层多余的div元素嵌套，带来不必要的元素渲染。

Fragment元素就是用来替代多余的div，使用Fragment作为render的最外层元素，不会在DOM中增加额外的节点。

### Context（上下文）

参考：[上下文(Context)](http://www.css88.com/react/docs/context.html)

React组件之间的通信，通常使用props；但是使用props需要在组件间逐级传递，如果存在多级组件属性的传递的话，将会变得十分的繁琐，并且为了查询到组件属性的来源需要逐级向上查找，十分不便。

直到今天在ant design pro框架中看到context的用法，才知道使用context可以让自组件获取更外层的组件属性。

##### 如何使用context
- 在父组件中通过添加childContextTypes和getChildContext传递context信息
- 子组件中定义contextTypes
- 子组件中使用this.context.xxx进行访问

```
class Child extends React.Component {
	render () {
		return (
			<div style={{ background: this.context.color }}></div>
		)
	}
}

Child.contextTypes = {
	color: PropTypes.string
}

class Parent extends React.components {
	getChildContext () {
		return {color: "red"}
	}
	render () {
		return (
			<div>
				<Child />
			</div>
		)
	}
}

Parent.childContextTypes = {
	color: PropTypes.string
}
```
##### context注意事项
- 不使用context，这只是一个实验性的 API ，并且可能在未来的 React 版本中移除。
- 不熟悉React、Redux尽量不要使用context。
- 尽量不要修改context

### ref
参考：[React之ref详细用法](https://segmentfault.com/a/1190000008665915)

ref属性表示为对组件真正实例的引用，即ReactDOM.render()返回的组件实例。

> 需要注意的是：
> 
> ref挂载到组件上表示怼组件实例的引用；挂载到dom元素上时表示对具体的dom元素节点的引用

##### ref设置回调函数
ref设置回调函数的执行时间为：

- 组件被挂载后，回调函数被立即执行，回调函数的参数为该组件的具体实例。
- 组件被卸载或者原有的ref属性本身发生变化时，回调也会被立即执行，此时回调函数参数为null，以确保内存泄露。

```
class Test extends Component {
	refcallback(instance) {
		console.log(instance)//打印对应的实例
	}
	render () {
		return (
			<div>
				<TestComponent ref={this.refcallback} ／>
			</div>
		)
	}
}
```

##### ref设置字符串
> 注意：这种方式不被推荐

如下所示：最后通过this.refs.input访问到dom元素节点。

```
<input ref="input" />
```

##### ref运用在父子组件通信中
参考：[React 父组件如何获取子组件的ref值？](https://segmentfault.com/q/1010000006253845)

ref在有状态组件中使用时引用的是组件的实例，所以在父组件中可以通过访问子组件的ref访问到子组件的props、state、refs以及实例方法等而实现父子组件之间的通信。

- 父组件访问子组件的dom节点：

```
this.refs.childComponentRefName.refs.someDomRefName
```

- 父组件访问子组件实例方法：

```
this.refs.childComponentRefName.func()
```