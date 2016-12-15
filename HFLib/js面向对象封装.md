
#JS 对象封装的常用方式

JS是一门面向对象语言,其对象是用prototype属性来模拟的,下面,来看看如何封装JS对象.

## 常规封装

```
function Person (name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
}

Pserson.prototype = {
    constructor:Person,
    sayHello:function(){
        console.log('hello');
    }
}
```

这种方式是比较常见的方式,比较直观,但是Person() 的职责是构造对象,如果把初始化的事情也放在里面完成,代码就会显得繁琐,如果放在一个方法里初始化会不会好点呢?
##升级版封装
```
function Person (info){
    this._init_(info);
}

Pserson.prototype = {
    constructor : Person,
    _init_ : function(info) {
        this.name = info.name;
        this.age = info.age;
        this.sex = info.sex;
    }
    sayHello:function(){
        console.log('hello');
    }
}
```

可是,说到这里就发现,name,age,sex 并没有在Person里面申明,哪来的呢???

##  new  的执行原理

new 的执行过程可以用下面一个函数来代替
```
    var myNew = function(constructor, args) {
        var o = {};
        o.__proto__ = constructor.prototype;
        var res = constructor.apply(o, args);
        var type = typeof res;
        if (['string', 'number', 'boolean', 'null', 'undefined'].indexOf(type) !== -1) {
            return o;
        }
        return res;
    }
```

解释:
首先通过 var o = {} 构造一个空对象.
然后将 构造函数的原型属性prototype赋值给o 的原型对象__proto__ 。这样，在执行  this._init_(info); 这句话的时候，对象 o 就可以在其原型对象中查找_init_ 方法。（原型链）。
之后这句话 就是精髓了。
```
var res = constructor.apply(o,args);
```

以o为上下文调用函数，同时将参数作为数组传递。那么，
```
 this._init_(info);
```
这句话就会被 o 执行，
函数
```
    _init_ : function(info) {
        this.name = info.name;
        this.age = info.age;
        this.sex = info.sex;
    }
```
以 o 为上下文调用，o也将拥有自己的 name,age,sex 属性。

如果在构造函数中，return 复合类型，包括对象，函数，和正则表达式，那么就会直接返回这个对象，否则，返回 o 。
```
 var type = typeof res;
    if(['string','number','boolean','null','undefined'].indexOf(type) !== -1){
        return o;
    }
    return res;
```

测试一下
```

    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function() {
        console.log(this.name);
    }
    var o1 = myNew(Person, ['pawn']);
    console.log(o1);
    o1.sayHello();
```
![](test/object/01.png)

OK 吧


## 类jQuery 封装
这种方式是我从 jQuery 那里学来的。

jQuery 对象具有很强的集成性，可以作为函数调用，也可以做为对象调用，当作为函数调用的时候，她可以无需 new 而返回它的一个实例，很方便。

先看代码

```
var Person = function(info){
    return new Person.prototype.init(info);
}

Person.prototype = {
    constructor: Person,
    init:function(){
        this.name = info.name.
    }
}
Person.prototype.init.prototype = Person.prototype;

```

这种封装方式非常巧妙。
将对象的构造操作放在函数的里面，而自己充当一个工厂。
不断调用 prototype 并不是一个直观的做法，于是
```
var Person = function(info){
    return new Person.fn.init(info);
}

Person.fn = Person.prototype = {
    constructor: Person,
    init:function(){
        this.name = info.name;
        this.sayHello = function(){
            this.makeArray();
        }
    }
    makeArray:function(){
        console.log(this.name);
    }
}
// 这句话的作用 
// 虽然把makeArray 等常用方法挂载到 Person.prorotype 下面,但还是会被 init 这个实例使用.
Person.fn.init.prototype = Person.fn;

```

最后用 闭包 封装起来
```
    var Person = (function(window) {
        var Person = function(name) {
            return new Person.fn.init(name);
        }

        Person.fn = Person.prototype = {
            constructor: Person,
            init: function(name) {
                this.name = name;
                this.sayHello = function() {
                    this.makeArray();
                }
            },
            makeArray: function() {
                console.log(this.name);
            }
        }

        Person.fn.init.prototype = Person.fn;

        return Person;
    })();


```

测试一下
```
    var p = Person('pawn');
    console.log(p);
    p.sayHello();

```

![](test/object/02.png)
##object.create();

最后js也提供了一种构造对象的方式,object.create(); 可以传递一个对象Person,构造一个p,并且使p 继承Person.

```
    var Person = {
        name: 'pawn',
        sayHello: function() {
            console.log(this.name);
        }
    }
    var p = Object.create(Person);
    console.log(p);
    p.sayHello();
```

结果
![](test/object/03.png)

可以看到,对象Person的属性成为了p的原型属性,也就是说 p 原型继承自 Person !

我们可以实现一个 Object.create()

```

Object.create = function(prototype){
   function Func(){};
   Func.prototype = prototype;
   var o = new Func();
   return o;
}
```
> 在这里,我们将 Person 作为 构造函数的 原型属性,就可以构造出 以Person 为原型对象的对象.

测试一下


![](test/object/04.png)

OK

关于 JS对象封装的方式就介绍到这里,如有错误,望不吝赐教.