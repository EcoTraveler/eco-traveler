// pages/api/socket.ts
import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@/types/next'
import { initSocket } from '@/lib/socket'

export const config = {
  api: {
    bodyParser: false,
  },
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any
    res.socket.server.io = initSocket(httpServer)
  }
  res.end()
}

export default SocketHandler