## React组件封装笔记

### 父组件通过props传数据给子组件，子组件在componentWillMount中setState取不到props值？

今天在封装组件的时候遇到这样一个问题，由于需要封装的子组件内部会根据操作而渲染不同的数据，所以我在componentWillMount生命周期中将从父组件得到的props赋值给state进行操作。如下:

```
componentWillMount() {
	this.setState({
		data: this.props.data
	});
}
```
最后会发现在第一次渲染的时候，this.state.data为空。

原因：在componentWillMount的时候props数据还未拿到，这时候使得赋值为空。且componentWillMount组件挂载之前调用一次，无论之后有何种数据改变，都不会再次调用，这与render不同，render会因为state数据的改变而进行重新渲染。

解决办法：在componentWillReceiveProps中进行state赋值。
> componentWillReceiveProps当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用。