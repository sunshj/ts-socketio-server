import io from './index'

/**
 * 获取房间连接
 */
export const getRoomConnections = async (room: RoomSide) => {
  return (await io.sockets.in(room).fetchSockets()).map(v => v.id)
}

export const getConnectSideAlias = (side: RoomSide) => {
  return side === 'client' ? '客户' : side === 'admin' ? '后台用户' : '不明用户'
}
