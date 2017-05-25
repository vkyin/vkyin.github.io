# 撕开Class的糖衣包装

自从ES6从草案变成标准后，引入的class的用法让FE们写起面向对象时更加得心应手。管他什么原不原型，管他静态不静态，操起class就是干。然而如此粗鲁蛮横的做法，当然是我最喜欢的，因为node6、node7都完美支持这个特性。但是当年只有ES5的时候，javascript是怎么实现面向对象的呢？

今天就来撕开Class的糖衣包装，看看这些个关键字实际上是做了什么。

## 简单回顾一下class、extends、super、static用法
```
class Shape {                       // class 关键字用于定义一个类，这里定义了一个Shape类
    constructor(length, width){     // 构造方法，每次new的时候都会调用这个方法
        this.length = length;
        this.width = width;
    }

    area (){                        // 定义了这个类的成员方法
        return this.width * this.length;
    }

    static Shapize(length, width){  // 定义一个静态方法（类方法）
        return new Shape(length, width);
    }
}

class Square extends Shape {        // 定义一个
    constructor(length, width){
        super(length, width);
    }

    area(){
        return this.length * this.width;
    }
}

class Triangle extends Shape{
    constructor(length, width){
        super(length, width);
    }

    area(){
        return this.length * this.width * 0.5;
    }
}
```


## 翻译成ES5

## 说说new的时候做了什么

## 总结