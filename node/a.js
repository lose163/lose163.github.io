var bytes = new Buffer(256)
for (var i = 0; i < bytes.length; i++) {
    bytes[i] = i
}
var end = bytes.slice(240, 256)
end[0] = 0
var more = new Buffer(4)
    //copiedObject.copy(copyObject,layout-start,copyStart,copyEnd)
bytes.copy(more, 0, 4, 8)
    //Buffer对象和字符串相互转换需要指定编码格式。目前支持以下格式：
    // ascii
    // utf8
    // utf16le：UTF-16的小端编码，支持大于U+10000的四字节字符。
    // ucs2：utf16le的别名。
    // base64
    // hex：将每个字节转为两个十六进制字符。

// 与二进制数组的关系
// TypedArray构造函数可以接受Buffer实例作为参数，生成一个二进制数组。
// 比如，new Uint32Array(new Buffer([1, 2, 3, 4]))，生成一个4个成员
// 的二进制数组。注意，新数组的成员有四个，而不是只有单个成员（[0x1020304]
// 或者[0x4030201]）。另外，这时二进制数组所对应的内存是从Buffer对象拷贝的，
// 而不是共享的。二进制数组的buffer属性，保留指向原Buffer对象的指针。 二进制
// 数组的操作，与Buffer对象的操作基本上是兼容的，只有轻微的差异。比如，二进制
// 数组的slice方法返回原内存的拷贝，而Buffer对象的slice方法创造原内存的一个视图（view）。


//Buffer作为构造函数，可以用new命令生成一个实例，它可以接受多种形式的参数。

// 参数是整数，指定分配多少个字节内存
// var hello = new Buffer(5); <Buffer 00 00 00 00 00>
// 参数是数组，数组成员必须是整数值
// var hello1 = new Buffer([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
// hello1.toString() // 'Hello'

// 参数是字符串（默认为utf8编码）
var hello = new Buffer('Hello')
hello.length // 5
hello.toString() // "Hello"

// 参数是字符串（不省略编码）
// var hello3 = new Buffer('Hello', 'utf8');

// 参数是另一个Buffer实例，等同于拷贝后者
// var hello = new Buffer('Hello','ascii');
// var hello2 = new Buffer(hello);

// Buffer.isEncoding方法返回一个布尔值，表示Buffer实例是否为指定编码。    //得到的是默认编码格式
//console.log(Buffer.isEncoding('utf8'))
//  true

// Buffer.isBuffer()
// Buffer.isBuffer方法接受一个对象作为参数，返回一个布尔值，表示该对象是否为Buffer实例。
// Buffer.isBuffer(Date) // false

// Buffer.byteLength()
// Buffer.byteLength方法返回字符串实际占据的字节长度，默认编码方式为utf8。
// Buffer.byteLength('Hello', 'utf8') // 5

// Buffer.concat()
// Buffer.concat方法将一组Buffer对象合并为一个Buffer对象。
// var i1 = new Buffer('Hello');
// var i2 = new Buffer(' ');
// var i3 = new Buffer('World');
// Buffer.concat([i1, i2, i3]).toString()
//  'Hello World'

// 需要注意的是，如果Buffer.concat的参数数组只有一个成员，就直接返回该成员。
// 如果有多个成员，就返回一个多个成员合并的新Buffer对象。   //这即是说，有多个成员才会新建Buffer对象，否则返回的是原成员本身，不会新建一个对象。
// Buffer.concat方法还可以接受第二个参数，指定合并后Buffer对象的总长度。
// var i1 = new Buffer('Hello');
// var i2 = new Buffer(' ');
// var i3 = new Buffer('World');
// Buffer.concat([i1, i2, i3], 10).toString()
// // 'Hello Worl'
// 省略第二个参数时，Node内部会计算出这个值，然后再据此进行合并运算。因此，显式提供这个参数，能提供运行速度。

// length
// 此属性返回Buffer对象所占据的内存长度。
// 注意， 这个值与Buffer对象的内容无关。
// buf = new Buffer(1234);
// buf.length // 1234
// buf.write("some string", 0, "ascii");
// buf.length // 1234
// 上面代码中， 不管写入什么内容， length属性总是返回Buffer对象的空间长度。
// 如果想知道一个字符串所占据的字节长度， 可以将其传入Buffer.byteLength方法。
// length属性是可写的， 但是这会导致未定义的行为， 不建议使用。 如果想修改
// Buffer对象的长度， 建议使用slice方法返回一个新的Buffer对象。

// write()
// write方法可以向指定的Buffer对象写入数据。
//它的第一个参数是所写入的内容，
//第二个参数（可省略）是所写入的起始位置（默认从0开始），
//第三个参数（可省略）是编码方式，默认为utf8。
var buf = new Buffer(5)
buf.write('He')
buf.write('l', 2)
buf.write('lo', 3)
console.log(buf.toString())
// "Hello"

// slice()
// slice方法返回一个按照指定位置、从原对象切割出来的Buffer实例。它的两个参数分别为切割的起始位置和终止位置。
var buff = new Buffer('just some data')
var chunk = buff.slice(5, 9)
chunk.toString()
// "some"

// toString()
// toString方法将Buffer实例，按照指定编码（默认为utf8）转为字符串。
var he = new Buffer('Hello')
he // <Buffer 48 65 6c 6c 6f>
he.toString() // "Hello"
// toString方法可以只返回指定位置内存的内容，它的第二个参数表示起始位置，第三个参数表示终止位置，两者都是从0开始计算。
var buffer = new Buffer('just some data')
console.log(buffer.toString('ascii', 5, 9))
// "some"

// toJSON()
// toJSON方法将Buffer实例转为JSON对象。如果JSON.stringify方法调用Buffer实例，默认会先调用toJSON方法。
var buffer1 = new Buffer('test')
var jsonbuffer1=buffer1.toJSON()
console.log(jsonbuffer1) // { type: 'Buffer', data: [ 116, 101, 115, 116 ] }
var json = JSON.stringify(buffer1)
console.log(json)// {"type":"Buffer","data":[116,101,115,116]}
var json1=JSON.parse(json)
console.log(json1) //{ type: 'Buffer', data: [ 116, 101, 115, 116 ] }
var copy = new Buffer(JSON.parse(json))
console.log(copy)// <Buffer 74 65 73 74>
