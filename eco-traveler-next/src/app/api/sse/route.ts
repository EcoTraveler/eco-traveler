import { NextResponse } from 'next/server'
import { database } from '@/db/config'
import { ObjectId } from 'mongodb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const planningId = searchParams.get('planningId')

  if (!planningId) {
    return NextResponse.json({ error: 'Planning ID is required' }, { status: 400 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const pipeline = [
        { $match: { 'fullDocument.planningId': new ObjectId(planningId) } }
      ]

      const changeStream = database.collection('discussions').watch(pipeline)

      changeStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
          const discussion = change.fullDocument
          const user = await database.collection('users').findOne({ _id: discussion.userId })
          const message = {
            _id: discussion._id,
            userId: discussion.userId,
            planningId: discussion.planningId,
            message: discussion.message,
            user: {
              _id: user?._id,
              name: user?.name
            }
          }
          controller.enqueue(`data: ${JSON.stringify(message)}\n\n`)
        }
      })

      // Keep the connection alive
      const interval = setInterval(() => {
        controller.enqueue(': keepalive\n\n')
      }, 30000)

      return () => {
        clearInterval(interval)
        changeStream.close()
      }
    }
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}