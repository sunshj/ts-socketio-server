import { Server, Socket } from 'socket.io'

declare global {
  type RoomSide = 'client' | 'admin'
  interface ServerToClientEvents {
    Message: (msg: string) => void
    NewOrderReceived: (data: { msg: string; orderId: number }) => void
  }

  interface ClientToServerEvents {
    NewOrder: (orderId: number) => void
  }

  interface SocketData {
    side: RoomSide
  }

  type ServerType = Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>
  type SocketType = Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>
}

export {}
