import { notifyBackendManagement } from '../util'

export default function (io: ServerType, socket: SocketType) {
  socket.on('NewOrder', orderId => {
    if (!socket.data.receiveIdentify) return
    socket.emit('NewOrderReceived', {
      msg: '提交訂單成功',
      orderId,
    })

    socket.data.clientSide &&
      notifyBackendManagement(sk => {
        sk.emit('NewOrderReceived', {
          msg: '有一条新订单(仅后台可见)',
          orderId,
        })
      })
  })
}
