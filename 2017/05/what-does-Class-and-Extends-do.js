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

// 使自身的prototype指向父类的一个实例。（这里会导致constructor属性丢失）
Triangle.prototype = Object.create(Shape.prototype);
// 修正上面说的错误指向
Triangle.prototype.constructor = Triangle;

// 重写了area方法
Triangle.prototype.area = function () {
    return this.length * this.width * 0.5;
}

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


let shape = new Shape(2, 3);
let triangle = new Triangle(2, 3);

console.log(shape);// -> Shape {length: 2, width: 3, name: "Shape"}
console.log(triangle);// -> Triangle {length: 2, width: 3, name: "Triangle"}
console.log(shape.getName());// -> Shape
console.log(triangle.getName());// -> Triangle
console.log(shape.area());// -> 6
console.log(triangle.area());// -> 3