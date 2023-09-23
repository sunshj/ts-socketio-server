import io from './index'

/**
 * 通知后台管理面板
 */
export function notifyAdminPanel<T extends keyof ServerToClientEvents>(
  evt: T,
  ...args: Parameters<ServerToClientEvents[T]>
) {
  io.sockets.sockets.forEach(socket => {
    if (socket.connected && socket.data.clientSide === false) {
      socket.emit(evt, ...args)
    }
  })
}
/**
 * 获取客户连接数
 */

export const getClientSideConnections = () => {
  let total = 0
  io.sockets.sockets.forEach(socket => {
    if (socket.data.clientSide === true) total += 1
  })
  return total
}
