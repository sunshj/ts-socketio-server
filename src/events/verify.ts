import { getConnectSideAlias, getRoomConnections } from '../utils'

export const verifyEventHandler = async (io: ServerType, socket: SocketType) => {
  const { side } = socket.handshake.auth
  socket.data.side = side
  socket.join(side)

  socket.to('admin').emit('Message', `有${getConnectSideAlias(side)}已连接`)
  socket.to('admin').emit('Message', `当前客户连接数 ${(await getRoomConnections('client')).length}`)
  socket.to('admin').emit('Message', `当前后台连接数 ${(await getRoomConnections('admin')).length}`)
}
