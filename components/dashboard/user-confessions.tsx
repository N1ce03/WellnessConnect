"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"

type UserConfession = {
  id: string
  content: string
  timestamp: number
  likes: number
}

export default function UserConfessions() {
  // In a real app, this would come from a database
  const [confessions, setConfessions] = useState<UserConfession[]>([
    {
      id: "1",
      content: "I've been struggling with anxiety lately, but I'm afraid to tell my friends and family.",
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      likes: 5,
    },
    {
      id: "2",
      content: "Sometimes I feel like I'm not good enough, no matter how hard I try.",
      timestamp: Date.now() - 1000 * 60 * 60 * 24 * 5, // 5 days ago
      likes: 8,
    },
  ])

  const { toast } = useToast()

  const deleteConfession = (id: string) => {
    setConfessions(confessions.filter((confession) => confession.id !== id))
    toast({
      title: "Confession deleted",
      description: "Your confession has been permanently deleted.",
    })
  }

  return (
    <div>
      {confessions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No confessions yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't shared any anonymous confessions yet. Your confessions are completely anonymous.
            </p>
            <Button>Share a Confession</Button>
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {confessions.map((confession) => (
              <motion.div
                key={confession.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(confession.timestamp, { addSuffix: true })}
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => deleteConfession(confession.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete confession</span>
                      </Button>
                    </div>
                    <p className="whitespace-pre-line">{confession.content}</p>
                    <div className="mt-4 text-xs text-muted-foreground">
                      {confession.likes} {confession.likes === 1 ? "like" : "likes"}
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

