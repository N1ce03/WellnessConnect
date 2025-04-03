"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Users } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/firebase/auth-context"
import { sendMessage, getMessages, subscribeToMessages } from "@/lib/firebase/chat"
import ChatRoomMessage from "@/components/services/chat/chat-room-message"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  content: string
  username: string
  userId: string
  timestamp: number
  roomId: string
}

const chatRooms = [
  { id: "general", name: "General Support" },
  { id: "anxiety", name: "Anxiety" },
  { id: "depression", name: "Depression" },
  { id: "stress", name: "Stress Management" },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeUsers, setActiveUsers] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { user, username } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!user) return

    setIsLoading(true)

    // Initial load of messages
    getMessages(selectedRoom)
      .then((fetchedMessages) => {
        setMessages(fetchedMessages)
        setIsLoading(false)
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to load messages.",
          variant: "destructive",
        })
        setIsLoading(false)
      })

    // Subscribe to new messages
    const unsubscribe = subscribeToMessages(selectedRoom, (newMessages) => {
      setMessages(newMessages)
      // Update active users count (this would be more sophisticated in a real app)
      const uniqueUsers = new Set(newMessages.map((msg) => msg.userId)).size
      setActiveUsers(uniqueUsers)
    })

    return () => {
      unsubscribe()
    }
  }, [user, selectedRoom, toast])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!input.trim() || !user) return

    setIsLoading(true)

    try {
      await sendMessage({
        content: input,
        username: username || "Anonymous",
        userId: user.uid,
        roomId: selectedRoom,
      })

      setInput("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleRoomChange = (roomId: string) => {
    setSelectedRoom(roomId)
  }

  if (!user) {
    return (
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to access the anonymous chat feature.</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button>Sign In</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">Anonymous Chat</CardTitle>
              <CardDescription>Connect with others anonymously in a supportive environment</CardDescription>
            </div>
            <div className="flex flex-col gap-2">
              <Select value={selectedRoom} onValueChange={handleRoomChange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent>
                  {chatRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center justify-end text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>
                  {activeUsers} active {activeUsers === 1 ? "user" : "users"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              Your username: {username || "Anonymous"}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {chatRooms.find((room) => room.id === selectedRoom)?.name}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] overflow-y-auto p-4 rounded-md bg-muted/50">
            {messages.length === 0 && !isLoading ? (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChatRoomMessage message={message} isCurrentUser={message.userId === user?.uid} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

