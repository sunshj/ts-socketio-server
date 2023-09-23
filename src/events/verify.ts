import { getClientSideConnections, notifyAdminPanel } from '../util'

const IDENTIFY_TIMEOUT = 5000
let identifyTimeout: NodeJS.Timeout

export default function (io: ServerType, socket: SocketType) {
  socket.emit('Verify', '开始校验连接...')

  const identify = (clientSide: boolean) => {
    if (typeof clientSide !== 'boolean') {
      clearTimeout(identifyTimeout)
      socket.emit('VerifyFailed', 'clientSide参数不存在或错误，连接已关闭')
      socket.disconnect()
      return
    }
  }

  identifyTimeout = setTimeout(() => {
    identify(socket.data.clientSide)
  }, IDENTIFY_TIMEOUT)

  socket.on('Verify', ({ clientSide }) => {
    identify(clientSide)
    clearTimeout(identifyTimeout)
    socket.emit('VerifyPassed', '訂單監聽已開啟')
    socket.data.clientSide = clientSide
    socket.data.receiveIdentify = true
    notifyAdminPanel('Message', `当前客户连接数：${getClientSideConnections()}`)
  })

  socket.on('disconnect', () => {
    clearTimeout(identifyTimeout)
  })
}
