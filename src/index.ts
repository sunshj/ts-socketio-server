import 'dotenv/config'
import { Server } from 'socket.io'
import { orderEventHandler, verifyEventHandler } from './events'
import { getConnectSideAlias, getRoomConnections } from './utils'

const PORT = Number(process.env.PORT) || 8899

const io: ServerType = new Server(PORT, {
  cors: {
    origin: [process.env.CORS_ORIGIN_FIRST as string, process.env.CORS_ORIGIN_SECOND as string],
  },
})

io.on('connection', socket => {
  /**
   * 连接认证事件处理
   */
  verifyEventHandler(io, socket)

  /**
   * 订单模块事件处理
   */
  orderEventHandler(io, socket)

  socket.on('disconnect', async () => {
    socket.to('admin').emit('Message', `有${getConnectSideAlias(socket.data.side)}关闭了连接`)
    socket.to('admin').emit('Message', `当前客户连接数 ${(await getRoomConnections('client')).length}`)
    socket.to('admin').emit('Message', `当前后台连接数 ${(await getRoomConnections('admin')).length}`)
  })
})

io.once('connect', () => {
  console.log(`🚀 WebSocketServer is listening on ${PORT}`)
})

export default io
