import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface ChatRoomMessageProps {
  message: {
    content: string
    username: string
    timestamp: number
    userId: string
  }
  isCurrentUser: boolean
}

export default function ChatRoomMessage({ message, isCurrentUser }: ChatRoomMessageProps) {
  return (
    <div className={cn("flex w-full mb-4", isCurrentUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isCurrentUser ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none",
        )}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-medium", isCurrentUser ? "text-primary-foreground" : "text-foreground")}>
              {isCurrentUser ? "You" : message.username}
            </span>
          </div>
          <p className="text-sm">{message.content}</p>
          <span className={cn("text-xs mt-1", isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
            {format(message.timestamp, "h:mm a")}
          </span>
        </div>
      </div>
    </div>
  )
}

