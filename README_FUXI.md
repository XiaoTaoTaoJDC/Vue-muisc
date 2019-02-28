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