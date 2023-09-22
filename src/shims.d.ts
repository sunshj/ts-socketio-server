import { Server, Socket } from 'socket.io'

declare global {
  interface ServerToClientEvents {
    Verify: (msg: string) => void
    VerifyPassed: (msg: string) => void
    VerifyFailed: (msg: string) => void
    Message: (msg: string) => void
    NewOrderReceived: ({ msg, orderId }: { msg: string; orderId: number }) => void
  }

  interface ClientToServerEvents {
    Verify: ({ clientSide }: { clientSide: boolean }) => void
    VerifyPassed: (msg: string) => void
    VerifyFailed: (msg: string) => void
    NewOrder: (orderId: number) => void
  }

  interface SocketData {
    clientSide: boolean
    receiveIdentify: boolean
  }

  type ServerType = Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>
  type SocketType = Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>
}

export {}
