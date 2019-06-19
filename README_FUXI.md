# 本文只针对面试，GO  Day Day Up




# JS基础知识部分
--类型：
  基本类型：null, undefined, boolean, number, string, symbol 。

  js中数字类型是浮点数类型，没有整型，并且浮点数类型是基于IEEE754标准实现的，所以在某些情况下会出现BUG，NaN 也是属于number类型，并且NaN 不等于自身（属于无效的数值类型）。

  Typeof 对于基本类型，除了Null, 都可以显示正确的类型。

  Typeof 对于对象，除了函数都会显示Object。

  对于null来说，虽然它是基本数据类型，但是会显示object，这是一个存在了很久的Bug，为什么会出现这种状况呢？ 在js最初的版本中，使用的是32位系统，为了性能考虑使用低位存储了变量的类型信息，000开头的代表是对象，然而null表示全为0，所以就会错误的判断为object。

  深度检测一个类型 Object.prototype.toString.call(),这样就会返回一个[object Type] 的字符串。

--CommonJS和ES6中的模块儿化的区别
  CommonJS是NodeJS的产物，也就是NodeJS的规范，

  import是ES6的规范模块儿化，

  CommonJS支持动态引入，后者不支持，CommonJS是同步引入，以为是用于服务端，文件都在本地，即使同步导入文件主线程卡主也影响不大。ES6的模块儿化是异步引入因为需要浏览器下载，如果也用于同步引入的话会对渲染造成很大的影响。

  CommonJS在导出的值都是拷贝的，即使导出的值变了，但是导入的值也不会变。所以如果你想更新值，那么就要重新导入一次。import导入是采用时时绑定的方式导入和导出的值都是指向的同一个内存地址，所以导入值也会着一起改变。

--JS继承
  ES5中继承是通过原型继承
  例如：
  function Super() {}
  Super.prototype.getName = function () {
    return  ****
  }
  function Sup() {}
  var s = new Sup()
  Sup.prototype = Object.create(Super.prototype, {
    constructor: {}
  })
  以上继承实现的思路就是将子类的原型设置成父类的原型。

  ES6中的继承我们可以用class来实现很简单

  class MyDate extend Date {}

--Call和Apply、Bind
  两个都是解决了改变this的指向，作用是相同的，只是传参的方式不同。除了第一个参数，call可以接收一个参数列表，apply接收一个数组。

  bind 和其他两个方法作用也是一致的，只是该方法会返回一个函数。并且我们可以通过 bind 实现柯里化。




# 执行上下文

JS在执行代码时候，会产生三种执行上下文：
--全局执行上下文
--函数执行上下文
--eval执行上下文




# Promise
--Promise 是ES6新增的语法，解决了回调地狱的问题。可以把Promise看做一个状态机，初始状态是pending状态，可以通过函数resolve和reject，将状态转变为resolved 或者 rejected状态。状态一旦发生变化就不能改变。
--then函数返回的是一个新的Promise实例，并且返回的是一个新的实例不是之前的实例。因为Promis规范除了pending状态，其他状态都不可以改变，如果返回的是一个相同的实例的话，多个then就失去了意义。

# Generator
--函数加上一个*号表示一个 Generator函数，内部可以通过yield暂停代码，通过调用next()恢复执行。
 -- function* test() {
   let a = 1;
   yield 2;
   yield 3;
 }
 let b = test();
 b.next(); //2
 b.next(); //3

# JS EVENT LOOP
--JS在执行过程中会产生执行环境，这些环境会被顺序的加入执行栈中。如果遇到异步代码就会被挂起加入到队列当中也就是（TASK）,一担执行栈为空，那么Event Loop就会冲Task中取出相应的代码放入执行栈中执行。  所以从本质上说js的异步还是同步的行为。


--微任务： process.nextTick, promise, Object.observer, Mutation.Observer,

--宏任务： script, setTimeout, setInterval, setImmediate, I/O, UI rendering,

正确的EVENT LOOP： 
-- 1 执行同步代码这是属于宏任务的。
-- 2 执行栈为空的时候，就去查询是否有微任务需要执行。
-- 3 执行所有的微任务。
-- 4 必要的话去渲染UI。
-- 5 然后在进行新一轮的event Loop， 执行宏任务的一步代码。



#渲染机制
--1 处理HTML并构建DOM树，
--2 处理CSS并构建CSSOM树，
--3 将DOM和CSSOM树合并构建成渲染树，
--4 根据渲染树来布局，并且计算每个节点的位置，
--5 调用GPU绘制，合成图层，并显示屏幕上，


# 重绘和回流

--重绘： 重绘是当节点更改外观而不会影响布局的， 比如改变color
--回流： 回流是布局或者是几何属性改变成为回流

以下几个动作可能会导致性能问题：
  改变Window字体大小
  改变字体
  添加或删除样式
  文字改变
  定位或者浮动
  盒模型

--重绘和回流和Event Loop有关



# React只是总结
  react生命周期分析 react在V16中引入fiber机制，这个机制在一定程度上影响了react的生命周期的调用，一次引入了两个api来解决此问题。


  Fiber机制的引入就是改变了之前同步渲染改为异步渲染 ---- 在不影响体验的情况下去分段计算更新---- 提高用户的体验。


分为两个阶段 reconciliation 和 commit  前者过程中是可以打断的，后者不能暂停，会一直到渲染完成。


Reconciliation阶段： 
  componentWillMount
  componentWillReceiveProps
  shouldComponentUpdate
  componentWillUpdate
commit阶段：
  componentDidMount
  componentDidUpdate
  componentWillUnmount



因为reconciliation可以打断所以，所以这个阶段的生命周期函数就会初选多次调用的现象，所以在这个阶段除了shouldComponentUpdate这个阶段其他生命周期避免使用。

getDerivedStateFromProps用于替换componentWillReceiveProps 该函数会在初始化和update的时候被调用。

V16生命周期函数用法建议

class ExampleComponent extends React.Component {
  // 用于初始化 state
  constructor() {}
  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 因为该函数是静态函数，所以取不到 `this`
  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
  static getDerivedStateFromProps(nextProps, prevState) {}
  // 判断是否需要更新组件，多用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {}
  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  componentDidMount() {}
  // 用于获得最新的 DOM 数据
  getSnapshotBeforeUpdate() {}
  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  componentWillUnmount() {}
  // 组件销毁后调用
  componentDidUnMount() {}
  // 组件更新后调用
  componentDidUpdate() {}
  // 渲染组件函数
  render() {}
  // 以下函数不建议使用
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillUpdate(nextProps, nextState) {}
  UNSAFE_componentWillReceiveProps(nextProps) {}
}



#面试总结

1，移动端解决1px问题 
  缩放-----   :befor---:after  flexible.js淘宝移动端采取的方案  1px变粗的原因就在于一刀切的设置viewport宽度 如果能把viewport宽度设置为实际的设备物理宽度, css里的1px不就等于实际1px长了么. flexible.js就是这样干的.

  <meta name=”viewport”>里面的scale值指的是对ideal viewport的缩放, flexible.js检测到IOS机型, 会算出scale = 1/devicePixelRatio, 然后设置viewport


#移动端点透事件
原因----- click延迟、延迟、还是延迟  （300ms）

解决---  只用touch 但是需要 组织默认行为 preventDefault()
  ----- 只用click 事件

#http---https却别




#GET和POST 的区别

  --GET 发送请求是同构url发送的，POST 发送请求是通过body发送。。。
  --GET 可以被浏览器缓存，POST不设置catch 是不会被缓存的
  --GET 只能被url编码，POST 是支持多种编码格式的
  --GET 在url中请求是又长度限制的，POST么有
  --GET POST比GET请求更安全，因为参数都暴露在url中，所以不能被用来传递敏感信息。

-----这是来自W3cSchools中的标砖答案。。。。。然而这不是面试官想要的结果，那么他们想要的结果是什么呢。。
那么就让我们来趴下GET 和POST 的外衣吧， GET 和 POST 是什么么？http协议中两种发送的请求的方式。
那么http是什么？http 是基于 tcp/ip关于数据在万维网中如何通信的协议。。
http的底层是tcp/ip, 所以GET和POST也是TCP/IP链接 其实GET 和 POST 做的事儿是一样的，要是给GET 加上REQUSET  BODY 其实是和POST 的请求是一样的。反之也是一回事儿。。

那么GET 和 POST 有一个重大的区别
那么是什么呢这也就是面试管想要的结果---

GET产生一个TCP数据包，那么POST是产生两个TCP数据包。

也就是说GET 发送请求的时候会把header data一起发送出去服务器响应200 返回数据
POST呢浏览区会先发送header，服务器响应100continue，然后在发送data 服务器响应200返回数据

并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次。

现在，当面试官再问你“GET与POST的区别”的时候，你的内心是不是这样的？

都给我后退！！！我要开始装逼了~~~~~~~~


######call , apply , bind

//实现call

function.prototype.call = function (context) {
  var context = context || window
  //给context添加一个属性
  context.fu = this
  //将context后面的参数取出来
  var arg = [...arguments].slice(1)
  var re = context.fu(...arg)
  delete context.fu
  return re
}


//实现apply

function.prototype.apply = function (context) {
  var context = context || window
  //给context添加一个属性
  context.fu = this
  var re
  // 需要判断是否存储第二个参数
  // 如果存在，就将第二个参数展开
  if(arguments[1] {
    re = context.fu(...arguments[1])
  }else{
    re = context.fu()
  }
  //删除属性
  delete context.fu
  return re
}

// 实现bind 其实是和上面两个一致的，但是返回的是一个函数，那么首先我们要先判断它返回的是否是一个函数

function.prototype.bind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('this is a not function')
  }
  var _this = this
  var arg = [...arguments].slice(1)
  //返回一个函数
  return function F() {
    // 因为返回的是一个函数，所以我们需要半段，用NEW
    if(this instanceof F) {
      return _this new(...arg, ...arguments)
    }else {
      return _this.apply(context, ...arg.concat(...arguments))
    }
  }
}

#####实现VUE watch属性-----
    ---相信很多人用到vue的人都知道它的双向绑定原理，给属性绑定了getter，setter属性，在属性被改变的时候，视图再次被渲染刷新。
    那么让我们来实现Vue 的watch属性是怎么实现的。。。

getter顾名思义局势获取属性值的方法，setter就是设置属性值的方法，
当属性被 a = 1 赋值的时候，a 的原型内的setter方法就会被触发
当console.log(a)的时候，a的原型内的getter方法就会被触发

实现getter，setter
我们不能直接给setter，getter 绑定事件函数。所以我们要借助object的属相来实现。
那么我们选用了比较好构造的一种。


object.defineProperty() 这个属性来实现
首先我们来认识下 Object.defineProperty()这个方法。

