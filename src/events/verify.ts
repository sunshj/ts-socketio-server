import { getClientSideConnections, notifyBackendManagement } from '../util'

export default function (io: ServerType, socket: SocketType) {
  socket.emit('Verify', '开始校验连接...')

  const identifyTimeout = setTimeout(() => {
    if (typeof socket.data.clientSide !== 'boolean') {
      socket.emit('VerifyFailed', '未传递clientSide参数,连接已关闭')
      socket.disconnect()
    }
  }, 5000)

  socket.on('Verify', ({ clientSide }) => {
    socket.emit('VerifyPassed', '訂單監聽已開啟')
    socket.data.clientSide = clientSide
    socket.data.receiveIdentify = true
    clearTimeout(identifyTimeout)
    notifyBackendManagement(sk => {
      sk.emit('Message', `当前客户连接数：${getClientSideConnections()}`)
    })
  })
}
