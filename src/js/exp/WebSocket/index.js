/*! *****************************************************************************
Copyright (c) 2020-present, meeek

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use,copy,modify, merge, publish, distribute,sublicense, and/or sell copies
of theSoftware, and to permit persons to whom the Software is furnished
to do so,subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHTHOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTIONOF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THESOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
***************************************************************************** */

/**
 * @see https://github.com/joewalnes/reconnecting-websocket
 */
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory)
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory()
    } else {
        global.ReSocket = factory()
    }
})(this, function () {
    if (!('WebSocket' in window)) return
    function ReSocket (url, protocols, options) {
        // 默认设置 settings
        const settings = {
            /** 是否应该记录调试消息. */
            debug: false,
            /** 是否在实例化后立即尝试连接. */
            automaticOpen: true,
            /** 尝试重新连接之前要延迟的毫秒数. */
            reconnectInterval: 1000,
            /** 尝试重新连接的最大延迟毫秒数 */
            maxReconnectInterval: 30000,
            /** 重新连接延迟的增加速率。【本次10s没有连接上，下次连接时间为15秒】 */
            reconnectDecay: 1.5,
            /** 连接超时时间 */
            timeoutInterval: 2000,
            /** 最大重新连接次数。如果为null将一直重新连接. */
            maxReconnectAttempts: null,
            /** 二进制传输类型 'blob' or 'arraybuffer' */
            binaryType: 'blob'
        }
        if (!options) { options = {} }

        // 自定义设置覆盖默认选项
        for (var key in settings) {
            if (typeof options[key] !== 'undefined') {
                this[key] = options[key]
            } else {
                this[key] = settings[key]
            }
        }

        // These should be treated as read-only properties
        /** 连接地址. */
        this.url = url
        /** 当前重连次数. */
        this.reconnectAttempts = 0
        /** 当前连接状态【CONNECTING、OPEN、CLOSING、CLOSED】 */
        this.readyState = WebSocket.CONNECTING
        /** 一个字符串，指示服务器选择的子协议的名称；这是创建websocket对象时在protocols参数中指定的字符串之一。 */
        this.protocol = null

        // Private state variables
        var self = this
        var ws
        var forcedClose = false
        var timedOut = false
        var eventTarget = document.createElement('div')

        // Wire up "on*" properties as event handlers
        eventTarget.addEventListener('open', function (event) { self.onopen(event) })
        eventTarget.addEventListener('close', function (event) { self.onclose(event) })
        eventTarget.addEventListener('connecting', function (event) { self.onconnecting(event) })
        eventTarget.addEventListener('message', function (event) { self.onmessage(event) })
        eventTarget.addEventListener('error', function (event) { self.onerror(event) })

        // Expose the API required by EventTarget
        this.addEventListener = eventTarget.addEventListener.bind(eventTarget)
        this.removeEventListener = eventTarget.removeEventListener.bind(eventTarget)
        this.dispatchEvent = eventTarget.dispatchEvent.bind(eventTarget)

        /**
         * This function generates an event that is compatible with standard compliant browsers and IE9 - IE11
         *
         * This will prevent the error:
         * Object doesn't support this action
         *
         * http://stackoverflow.com/questions/19345392/why-arent-my-parameters-getting-passed-through-to-a-dispatched-event/19345563#19345563
         * @param s String The name that the event should use
         * @param args Object an optional object that the event will use
         */
        function generateEvent (s, args) {
            var evt = document.createEvent('CustomEvent')
            evt.initCustomEvent(s, false, false, args)
            return evt
        };

        this.open = function (reconnectAttempt) {
            ws = new WebSocket(self.url, protocols || [])
            ws.binaryType = this.binaryType

            if (reconnectAttempt) {
                if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) {
                    return
                }
            } else {
                eventTarget.dispatchEvent(generateEvent('connecting'))
                this.reconnectAttempts = 0
            }

            if (self.debug || ReSocket.debugAll) {
                console.debug('ReSocket', 'attempt-connect', self.url)
            }

            var localWs = ws
            var timeout = setTimeout(function () {
                if (self.debug || ReSocket.debugAll) {
                    console.debug('ReSocket', 'connection-timeout', self.url)
                }
                timedOut = true
                localWs.close()
                timedOut = false
            }, self.timeoutInterval)

            ws.onopen = function (event) {
                clearTimeout(timeout)
                if (self.debug || ReSocket.debugAll) {
                    console.debug('ReSocket', 'onopen', self.url)
                }
                self.protocol = ws.protocol
                self.readyState = WebSocket.OPEN
                self.reconnectAttempts = 0
                var e = generateEvent('open')
                e.isReconnect = reconnectAttempt
                reconnectAttempt = false
                eventTarget.dispatchEvent(e)
            }

            ws.onclose = function (event) {
                clearTimeout(timeout)
                ws = null
                if (forcedClose) {
                    self.readyState = WebSocket.CLOSED
                    eventTarget.dispatchEvent(generateEvent('close'))
                } else {
                    self.readyState = WebSocket.CONNECTING
                    var e = generateEvent('connecting')
                    e.code = event.code
                    e.reason = event.reason
                    e.wasClean = event.wasClean
                    eventTarget.dispatchEvent(e)
                    if (!reconnectAttempt && !timedOut) {
                        if (self.debug || ReSocket.debugAll) {
                            console.debug('ReSocket', 'onclose', self.url)
                        }
                        eventTarget.dispatchEvent(generateEvent('close'))
                    }

                    var timeout = self.reconnectInterval * Math.pow(self.reconnectDecay, self.reconnectAttempts)
                    setTimeout(function () {
                        self.reconnectAttempts++
                        self.open(true)
                    }, timeout > self.maxReconnectInterval ? self.maxReconnectInterval : timeout)
                }
            }
            ws.onmessage = function (event) {
                if (self.debug || ReSocket.debugAll) {
                    console.debug('ReSocket', 'onmessage', self.url, event.data)
                }
                var e = generateEvent('message')
                e.data = event.data
                eventTarget.dispatchEvent(e)
            }
            ws.onerror = function (event) {
                if (self.debug || ReSocket.debugAll) {
                    console.debug('ReSocket', 'onerror', self.url, event)
                }
                eventTarget.dispatchEvent(generateEvent('error'))
            }
        }

        // Whether or not to create a websocket upon instantiation
        if (this.automaticOpen == true) {
            this.open(false)
        }

        /**
         * Transmits data to the server over the WebSocket connection.
         *
         * @param data a text string, ArrayBuffer or Blob to send to the server.
         */
        this.send = function (data) {
            if (ws) {
                if (self.debug || ReSocket.debugAll) {
                    console.debug('ReSocket', 'send', self.url, data)
                }
                return ws.send(data)
            } else {
                throw 'INVALID_STATE_ERR : Pausing to reconnect websocket'
            }
        }

        /**
         * Closes the WebSocket connection or connection attempt, if any.
         * If the connection is already CLOSED, this method does nothing.
         */
        this.close = function (code, reason) {
            // Default CLOSE_NORMAL code
            if (typeof code === 'undefined') {
                code = 1000
            }
            forcedClose = true
            if (ws) {
                ws.close(code, reason)
            }
        }

        /**
         * Additional public API method to refresh the connection if still open (close, re-open).
         * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
         */
        this.refresh = function () {
            if (ws) {
                ws.close()
            }
        }
    }

    /**
     * An event listener to be called when the WebSocket connection's readyState changes to OPEN;
     * this indicates that the connection is ready to send and receive data.
     */
    ReSocket.prototype.onopen = function (event) {}
    /** An event listener to be called when the WebSocket connection's readyState changes to CLOSED. */
    ReSocket.prototype.onclose = function (event) {}
    /** An event listener to be called when a connection begins being attempted. */
    ReSocket.prototype.onconnecting = function (event) {}
    /** An event listener to be called when a message is received from the server. */
    ReSocket.prototype.onmessage = function (event) {}
    /** An event listener to be called when an error occurs. */
    ReSocket.prototype.onerror = function (event) {}

    /**
     * Whether all instances of ReSocket should log debug messages.
     * Setting this to true is the equivalent of setting all instances of ReSocket.debug to true.
     */
    ReSocket.debugAll = false
    ReSocket.CONNECTING = WebSocket.CONNECTING
    ReSocket.OPEN = WebSocket.OPEN
    ReSocket.CLOSING = WebSocket.CLOSING
    ReSocket.CLOSED = WebSocket.CLOSED

    return ReSocket
})
