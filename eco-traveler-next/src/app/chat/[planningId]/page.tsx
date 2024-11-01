import { ChatRoom } from './chat-room'

export default function ChatPage({ params }: { params: { planningId: string } }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Room</h1>
      <ChatRoom planningId={params.planningId} />
    </div>
  )
}