import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface ChatMessageProps {
  message: {
    content: string
    sender: "user" | "bot"
    timestamp: Date
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-muted rounded-tl-none",
        )}
      >
        <div className="flex flex-col">
          <p className="text-sm">{message.content}</p>
          <span className={cn("text-xs mt-1", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
            {format(message.timestamp, "h:mm a")}
          </span>
        </div>
      </div>
    </div>
  )
}

