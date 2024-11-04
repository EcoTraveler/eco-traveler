// lib/socket.ts
import { Server as HttpServer } from 'http'
import { Server } from 'socket.io'
import { database } from '@/db/config'
import { ObjectId } from 'mongodb'

export function initSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('join room', (roomId) => {
      socket.join(roomId)
      console.log(`User joined room ${roomId}`)
    })

    socket.on('chat message', async (data) => {
      const { roomId, userId, message, type } = data

      // Store the message in the database
      await database.collection('Discussions').insertOne({
        userId: new ObjectId(userId),
        planningId: new ObjectId(roomId),
        message,
        type,
        createdAt: new Date(),
      })

      // Broadcast the message to all users in the room
      io.to(roomId).emit('chat message', {
        ...data,
        createdAt: new Date(),
      })
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })

  return io
}
