ReSocket
=====================
一个JS库，装饰提供连接的WebSocket API，当连接掉线，它将自动重新连接

```javascript
var ws = new ReSocket('ws://....');
```

## USE 

#### 1. 实例化时当作构造函数的参数传入
> ```javascript 
> const socket = new ReSocket(url, protocols, options);
> ```
- url [String] [您要连接的URL](https://html.spec.whatwg.org/multipage/comms.html#network)
- protocols [String|Array] [WebSocket的协议](https://tools.ietf.org/html/rfc6455)
- options [Object] [见下文]()

#### 2. 实例化后当作属性设置参数
> ```javascript 
> const socket = new ReSocket(url);
> socket.debug = true;
> socket.timeoutInterval = 5400;
> ```



## Options
#### `debug`
- 是否应该记录调试消息，消息被打印到 `console.debug()`.
- 参数：`true` or `false`
- 默认值：`false`

#### `automaticOpen`
- 是否在实例化后立即尝试连接. 可以随时使用`ws.open()` 和 `ws.close()`打开或关闭连接.
- 参数：`true` or `false`
- 默认值：`true`

#### `reconnectInterval`
- 尝试重新连接之前要延迟的毫秒数。
- 参数：`integer`
- 默认值：`1000`

#### `maxReconnectInterval`
- 尝试重新连接的最大延迟毫秒数
- 参数：`integer`
- 默认值：`30000`

####`reconnectDecay`
- 重新连接延迟的增加速率。【本次10s没有连接上，下次连接时间为15秒】
- 参数：`integer` or `float`
- 默认值：`1.5`

#### `timeoutInterval`
- 连接超时时间（以毫秒为单位）。
- 参数：`integer`
- 默认值：`2000`

#### `maxReconnectAttempts`
- 最大重新连接次数。如果为null将一直重新连接。
- 参数：`integer` or `null`.
- 默认值：`null`

#### `binaryType`
- 二进制传输类型
- 参数：`'blob'` or `'arraybuffer'`.
- 默认值：`'blob'`

---
## Methods

#### `ws.open()`
- 打开连接

#### `ws.close(code, reason)`
- 关闭连接或者连接尝试(如果有)，如果连接已经关闭，则此方法不执行任何操作。
- `code` 可选的结束代码（默认值1000）. [https://tools.ietf.org/html/rfc6455#section-7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1)
- `reason` Socket被关闭的可选原因. [https://tools.ietf.org/html/rfc6455#section-7.1.6](https://tools.ietf.org/html/rfc6455#section-7.1.6)

#### `ws.refresh()`
- 如果仍然打开，请刷新连接（先关闭然后重新打开），For example, if the app suspects bad data / missed heart beats, it can try to refresh.

#### `ws.send(data)`
- 通过WebSocket连接将数据传输到服务器。
- 参数：`'String'` or `'arraybuffer'` or `'blob'`
