"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpDown, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/firebase/auth-context"
import { addConfession, getConfessions, likeConfession } from "@/lib/firebase/confessions"
import ConfessionCard from "@/components/services/confessions/confession-card"
import { Skeleton } from "@/components/ui/skeleton"

type Confession = {
  id: string
  content: string
  timestamp: number
  likes: number
  likedBy?: string[]
}

export default function ConfessionsPage() {
  const [confession, setConfession] = useState("")
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "mostLiked">("newest")
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchConfessions()
  }, [])

  const fetchConfessions = async () => {
    setIsLoading(true)
    try {
      const fetchedConfessions = await getConfessions()
      // Ensure each confession has a likedBy array
      const normalizedConfessions = fetchedConfessions.map((confession) => ({
        ...confession,
        likedBy: confession.likedBy || [],
      }))
      setConfessions(normalizedConfessions)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load confessions.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitConfession = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!confession.trim()) return

    setIsSubmitting(true)
    try {
      await addConfession(confession)
      setConfession("")
      toast({
        title: "Success",
        description: "Your confession has been submitted anonymously.",
      })
      fetchConfessions()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit confession.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeConfession = async (confessionId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like confessions.",
        variant: "destructive",
      })
      return
    }

    try {
      await likeConfession(confessionId, user.uid)

      // Update local state
      setConfessions((prev) =>
        prev.map((confession) => {
          if (confession.id === confessionId) {
            // Ensure likedBy exists before checking includes
            const likedBy = confession.likedBy || []
            const alreadyLiked = likedBy.includes(user.uid)

            return {
              ...confession,
              likes: alreadyLiked ? confession.likes - 1 : confession.likes + 1,
              likedBy: alreadyLiked ? likedBy.filter((id) => id !== user.uid) : [...likedBy, user.uid],
            }
          }
          return confession
        }),
      )
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like confession.",
        variant: "destructive",
      })
    }
  }

  const toggleSortOrder = () => {
    if (sortOrder === "newest") {
      setSortOrder("oldest")
    } else if (sortOrder === "oldest") {
      setSortOrder("mostLiked")
    } else {
      setSortOrder("newest")
    }
  }

  const getSortedConfessions = () => {
    if (sortOrder === "newest") {
      return [...confessions].sort((a, b) => b.timestamp - a.timestamp)
    } else if (sortOrder === "oldest") {
      return [...confessions].sort((a, b) => a.timestamp - b.timestamp)
    } else {
      return [...confessions].sort((a, b) => b.likes - a.likes)
    }
  }

  const sortedConfessions = getSortedConfessions()

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Anonymous Confessions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Share your thoughts, feelings, and experiences anonymously. This is a safe space without judgment.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Share Your Confession</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmitConfession}>
          <CardContent>
            <Textarea
              placeholder="What would you like to share anonymously?"
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || !confession.trim()}>
              {isSubmitting ? "Submitting..." : "Submit Anonymously"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Confessions</h2>
        <Button variant="outline" size="sm" onClick={toggleSortOrder}>
          {sortOrder === "newest" ? "Newest First" : sortOrder === "oldest" ? "Oldest First" : "Most Liked"}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {sortedConfessions.length > 0 ? (
              sortedConfessions.map((confession) => (
                <motion.div
                  key={confession.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ConfessionCard
                    confession={confession}
                    onLike={() => handleLikeConfession(confession.id)}
                    isLiked={user && confession.likedBy ? confession.likedBy.includes(user.uid) : false}
                  />
                </motion.div>
              ))
            ) : (
              <div className="text-center p-8 bg-muted rounded-lg">
                <p className="text-muted-foreground">No confessions yet. Be the first to share!</p>
              </div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

