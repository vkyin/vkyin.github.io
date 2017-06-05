# 撕开Class的糖衣包装

> 自从ES6从草案变成标准后，引入的class的用法让FE们写起面向对象时更加得心应手。管他什么原不原型，管他静态不静态，操起class就是干。然而如此粗鲁蛮横的做法，当然是我最喜欢的，因为node6、node7都完美支持这个特性。但是当年只有ES5的时候，javascript是怎么实现面向对象的呢？

> 今天就来撕开Class的糖衣包装，看看这些个关键字实际上是做了什么。

在es6没有出来之前，在javascript中实现面向对象是有很多种方式的，而目前跟class方法表现最接近的就是**构造函数+原型**的方法了。所以这里只讨论这一种方法。

## 简单回顾一下class、extends、super、static用法
```
// class 关键字用于定义一个类，这里定义了一个Shape类
class Shape {
    // 构造方法，每次new的时候都会调用这个方法
    constructor(length, width) {
        this.length = length;
        this.width = width;
        this.name = this.constructor.name;
    }

    getName() {
        return this.name;
    }
    // 定义了这个类的成员方法
    area() {
        return this.width * this.length;
    }
    // 定义一个静态方法（类方法）
    static Shapize(length, width) {
        return new Shape(length, width);
    }
}

// 定义一个三角形
class Triangle extends Shape {
    constructor(length, width) {
        super(length, width);
    }
    // 重写求面积的方法
    area() {
        return this.length * this.width * 0.5;
    }
}
```
没什么好解释的，都在注释里。

## 翻译成ES5
```
// 这里定义构造函数，对应class用法中的constructor
function Shape(length, width) {
    this.length = length;
    this.width = width;
    this.name = this.constructor.name;
}

// 这里对应了area的成员方法
Shape.prototype.getName = function () {
    return this.name;
}

// 这里对应了area的成员方法
Shape.prototype.area = function () {
    return this.width * this.length;
}

// 这里对应了静态方法。可以看到，静态方法是直接声明为构造函数的一个属性的。
Shape.Shapize = function (length, width) {
    return new Shape(length, width);
}

// 这里对应了Triangle类的contructor
function Triangle(length, width) {
    // 对应了Triangle类contructor中super()一行。调用父类的构造函数。
    Shape.call(this, length, width);
}

// 使自身的prototype指向父类的prototype。（这里会导致constructor属性丢失）
Triangle.prototype = Object.create(Shape.prototype);
// 修正上面说的错误指向
Triangle.prototype.constructor = Triangle;

// 重写了area方法
Triangle.prototype.area = function () {
    return this.length * this.width * 0.5;
}
```

## 执行代码
```
let shape = new Shape(2, 3);
let triangle = new Triangle(2, 3);

console.log(shape);// -> Shape {length: 2, width: 3, name: "Shape"}
console.log(triangle);// -> Triangle {length: 2, width: 3, name: "Triangle"}
console.log(shape.getName());// -> Shape
console.log(triangle.getName());// -> Triangle
console.log(shape.area());// -> 6
console.log(triangle.area());// -> 3
```

## 说说new的时候做了什么

## 总结