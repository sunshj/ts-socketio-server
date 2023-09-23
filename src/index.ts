import 'dotenv/config'
import { Server } from 'socket.io'
import verifyEventListener from './events/verify'
import orderEventListener from './events/order'
import { notifyAdminPanel } from './util'

const PORT = Number(process.env.PORT) || 8899

const io: ServerType = new Server(PORT, {
  cors: {
    origin: [process.env.CORS_ORIGIN_FIRST as string, process.env.CORS_ORIGIN_SECOND as string],
  },
})

io.on('connection', socket => {
  /**
   * 参数验证事件处理
   */
  verifyEventListener(io, socket)

  /**
   * 订单模块事件处理
   */
  orderEventListener(io, socket)

  socket.on('disconnect', () => {
    const user = socket.data.clientSide === true ? '客户' : socket.data.clientSide === false ? '后台用户' : '不明用户'
    notifyAdminPanel('Message', `有${user}关闭了连接`)
  })
})

io.once('connect', () => {
  console.log(`🚀 WebSocketServer is listening on ${PORT}`)
})

export default io
