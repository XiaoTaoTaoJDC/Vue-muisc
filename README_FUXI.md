#  本文只针对面试，GO  Day Day Up


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