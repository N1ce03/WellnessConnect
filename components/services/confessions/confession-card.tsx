"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface ConfessionCardProps {
  confession: {
    id: string
    content: string
    timestamp: number
    likes: number
    likedBy?: string[]
  }
  onLike: () => void
  isLiked: boolean
}

export default function ConfessionCard({ confession, onLike, isLiked }: ConfessionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <p className="whitespace-pre-line">{confession.content}</p>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(confession.timestamp, { addSuffix: true })}
        </span>
        <Button variant="ghost" size="sm" className="gap-1.5" onClick={onLike}>
          <Heart
            className={cn("h-4 w-4 transition-colors", isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground")}
          />
          <span className={cn("text-xs", isLiked ? "text-red-500" : "text-muted-foreground")}>{confession.likes}</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

