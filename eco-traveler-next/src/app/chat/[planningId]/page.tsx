// app/chat/[planningId]/page.tsx
import { notFound } from 'next/navigation'
import { database } from '@/db/config'
import { ObjectId } from 'mongodb'
import { verifyToken } from '@/db/utils/jwt'
import { cookies } from 'next/headers'
// import ChatRoom from '@/components/ChatRoom'

export default async function ChatRoomPage({ params }: { params: { planningId: string } }) {
  const plan = await database.collection('Plan').findOne({ _id: new ObjectId(params.planningId) })

  if (!plan) {
    notFound()
  }

  const token = cookies().get('token')?.value
  let currentUserId = ''
  let currentUserName = ''

  if (token) {
    try {
      const payload = await verifyToken<{ id: string; name: string }>(token)
      currentUserId = payload.id
      currentUserName = payload.name
    } catch (error) {
      console.error('Token verification failed:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room for {plan.name}</h1>
      {/* <ChatRoom planId={params.planningId} currentUserId={currentUserId} currentUserName={currentUserName} /> */}
    </div>
  )
}