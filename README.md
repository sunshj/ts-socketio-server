# TypeScript + Socket.IO(Server)

## 运行项目

- 安装依赖

  ```bash
  npm install
  ```

- 设置环境变量 `.env`

  ```dotenv
  PORT=8088 
  # 设置跨域
  CORS_ORIGIN_FIRST='http://localhost:5173'
  CORS_ORIGIN_SECOND='http://localhost:8080'
  ```

- 开发环境运行

  ```bash
  npm run dev
  ```

- 编译

  ```bash
  npm run build
  ```

- 生产环境运行

  ```bash
  npm run start
  ```

  

## 使用 [JSDoc](https://jsdoc.app) 为 Vue2 项目标记类型 

```vue
<template>
  <div>HomePage</div>
</template>

<script>
/**
 * @typedef {{
    Verify: (msg: string) => void
    VerifyPassed: (msg: string) => void
    VerifyFailed: (msg: string) => void
    Message: (msg: string) => void
    NewOrderReceived: ({ msg, orderId }: { msg: string; orderId: number }) => void
  }} ServerToClientEvents

  @typedef {{
    Verify: ({ clientSide }: { clientSide: boolean }) => void
    VerifyPassed: (msg: string) => void
    VerifyFailed: (msg: string) => void
    NewOrder: (orderId: number) => void
  }} ClientToServerEvents

 * @typedef {import("socket.io-client").Socket<ServerToClientEvents,ClientToServerEvents} SocketType
 */
import { io } from 'socket.io-client'
export default {
  data() {
    return {
      /** @type {SocketType} */
      socket: null,
    }
  },
  created() {
    this.socket = io('ws://localhost:8088')
    this.socket.on('connect', () => {
      this.socket.emit('Verify', { clientSide: false })
    })
  },
}
</script>
```



