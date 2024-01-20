export const orderEventHandler = (io: ServerType, socket: SocketType) => {
  socket.on('NewOrder', orderId => {
    socket.emit('NewOrderReceived', {
      msg: '提交訂單成功',
      orderId,
    })

    socket.data.side === 'client' &&
      socket.to('admin').emit('NewOrderReceived', {
        msg: '有一条新订单(仅后台可见)',
        orderId,
      })
  })
}
