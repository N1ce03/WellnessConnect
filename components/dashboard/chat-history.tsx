"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"

type ChatSession = {
  id: string
  title: string
  preview: string
  date: Date
  messages: number
}

export default function ChatHistory() {
  // In a real app, this would come from a database
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: "1",
      title: "Anxiety Management",
      preview: "I've been feeling anxious lately...",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
      messages: 12,
    },
    {
      id: "2",
      title: "Sleep Issues",
      preview: "I'm having trouble sleeping...",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      messages: 8,
    },
    {
      id: "3",
      title: "Work Stress",
      preview: "My job is causing me a lot of stress...",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      messages: 15,
    },
  ])

  const { toast } = useToast()

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id))
    toast({
      title: "Chat session deleted",
      description: "The chat session has been permanently deleted.",
    })
  }

  return (
    <div>
      {sessions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No chat history</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't had any conversations with our AI assistant yet.
            </p>
            <Button>Start a Conversation</Button>
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{session.title}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteSession(session.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete session</span>
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{session.preview}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{format(session.date, "MMM d, yyyy")}</span>
                        <span>{session.messages} messages</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

