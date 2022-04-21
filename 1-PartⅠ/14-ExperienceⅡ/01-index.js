// 1.请说出下列最终的执行结果，并解释为什么。

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}
a[6]() //10
// 因为for循环里的i是全局变量，for循环执行完之后，i已经变成了10，所以之后无论调用a几，输出的都是10。

// 2、请说出下列最终的执行结果，并解释为什么。
var tmp = 123;
if (true) {
  console.log(tmp)
  let tmp
}
// 结果报错，cannot access 'tmp' before initialization
// 原因：let 会形成块级作用域和封闭作用域，所以 tmp 无法拿到外层 var 声明的值，
//   只能在块级作用域中查找。let 不会导致变量提升，
//   因此`console.log(tmp)`无法找到声明，出现暂时性死区。

// 3.使用ES6最新语法用最简单的方式找到最小值
var arr = [12, 34, 32, 89, 4]
arr.sort((a, b) => a-b)[0]
arr.reduce((min,num)=>min<num?min:num)
Math.min(...arr)

// 4
var a = 10;
var obj = {
    a: 20,
    fn () {
        setTimeout(() => {
            console.log(this.a)
        })
    }
}
obj.fn()//20