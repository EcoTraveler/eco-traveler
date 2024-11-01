'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface Message {
  _id: string;
  userId: string;
  planningId: string;
  message: string;
  user: {
    _id: string;
    name: string;
  };
}

export function ChatRoom({ planningId }: { planningId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  useEffect(() => {
    // Fetch initial messages
    fetch(`/api/discussions?planningId=${planningId}`)
      .then(res => res.json())
      .then(data => setMessages(data))

    // Set up SSE for real-time updates
    eventSourceRef.current = new EventSource(`/api/sse?planningId=${planningId}`)
    eventSourceRef.current.onmessage = (event) => {
      if (event.data !== 'keepalive') {
        const newMessage = JSON.parse(event.data)
        setMessages(prevMessages => [...prevMessages, newMessage])
      }
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
      }
    }
  }, [planningId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage && !file) return

    const formData = new FormData()
    formData.append('userId', 'user123') // In a real app, get this from authentication
    formData.append('planningId', planningId)
    formData.append('message', newMessage)
    if (file) {
      formData.append('file', file)
    }

    await fetch('/api/discussions', {
      method: 'POST',
      body: formData,
    })
    setNewMessage('')
    setFile(null)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="mb-4">
        <Link href="/plannings" className="text-blue-500 hover:underline">
          &larr; Back to Plannings
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 rounded">
        {messages.map(message => (
          <div key={message._id} className="bg-white p-2 rounded shadow">
            <p className="font-bold">{message.user.name}</p>
            <p>{message.message}</p>
            {message.message.startsWith('http') && (
              <img src={message.message} alt="Uploaded" className="mt-2 max-w-xs" />
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex space-x-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  )
}