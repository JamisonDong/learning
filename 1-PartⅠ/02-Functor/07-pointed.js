// Pointed 函子是实现了 of 静态方法的函子
// of 方法是为了避免使用 new 来创建对象，更深层的含义是 of 方法用来把值放到上下文
// Context（把值放到容器中，使用 map 来处理值）

class Container{

  static of(value){
    return new Container(value)
  }

  // ...
}