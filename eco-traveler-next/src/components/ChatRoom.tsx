// components/ChatRoom.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Smile, Send } from 'lucide-react'

type Message = {
  userId: string
  userName: string
  message: string
  type: 'text' | 'image'
  createdAt: Date
}

type ChatRoomProps = {
  planId: string
  currentUserId: string
  currentUserName: string
}

export default function ChatRoom({ planId, currentUserId, currentUserName }: ChatRoomProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:3000', { path: '/api/socket' })
    setSocket(newSocket)

    newSocket.on('connect', () => {
      newSocket.emit('join room', planId)
    })

    newSocket.on('chat message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      newSocket.disconnect()
    }
  }, [planId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (content: string, type: 'text' | 'image' = 'text') => {
    if (socket && content) {
      const messageData = {
        roomId: planId,
        userId: currentUserId,
        userName: currentUserName,
        message: content,
        type,
      }
      socket.emit('chat message', messageData)
      setInputMessage('')
      setShowEmojiPicker(false)
    }
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage((prevInput) => prevInput + emojiData.emoji)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await response.json()
        if (data.url) {
          sendMessage(data.url, 'image')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Chat Room</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.userId === currentUserId ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`max-w-[70%] p-2 rounded-lg ${msg.userId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.userId !== currentUserId && <div className="font-bold">{msg.userName}</div>}
              {msg.type === 'text' ? (
                <p>{msg.message}</p>
              ) : (
                <Image src={msg.message} alt="Uploaded image" width={200} height={200} />
              )}
              <div className="text-xs mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter>
        <div className="flex items-center w-full">
          <Button variant="ghost" size="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
            className="flex-grow mx-2"
          />
          <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
            <h5>file</h5>
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          <Button onClick={() => sendMessage(inputMessage)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-4">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
