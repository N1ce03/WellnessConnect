"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Settings, AlertCircle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import ChatbotSettings from "@/components/services/chatbot/chatbot-settings"
import ChatMessage from "@/components/services/chatbot/chat-message"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your mental health assistant. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useLocalStorage<string>("chatbot-api-key", "")
  const [apiError, setApiError] = useState<string | null>(null)
  const [mode, setMode] = useLocalStorage<"api" | "simulation">("chatbot-mode", "simulation")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check if API key exists and show settings if not
  useEffect(() => {
    if (!apiKey && mode === "api") {
      setShowSettings(true)
    }
  }, [apiKey, mode])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!input.trim()) return

    // Reset any previous API errors
    setApiError(null)

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Determine whether to use the API or fallback
      const endpoint = mode === "simulation" || !apiKey ? "/api/chatbot/fallback" : "/api/chatbot"

      // Make API call
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          apiKey: apiKey,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        // If we get an error with the API and weren't already using fallback,
        // switch to fallback mode and retry
        if (mode === "api" && apiKey) {
          setMode("simulation")
          setApiError(`API Error: ${errorData.error}. Switched to simulation mode.`)

          // Retry with fallback
          const fallbackResponse = await fetch("/api/chatbot/fallback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: input,
            }),
          })

          if (!fallbackResponse.ok) {
            throw new Error("Failed to get response from fallback system")
          }

          const fallbackData = await fallbackResponse.json()

          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: fallbackData.response,
            sender: "bot",
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, botMessage])
          return
        }

        throw new Error(errorData.error || "Failed to get response from the chatbot")
      }

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chatbot error:", error)

      // Display error message
      const errorMessage = error instanceof Error ? error.message : "Failed to get response from the chatbot"
      setApiError(errorMessage)

      toast({
        title: "Error",
        description: errorMessage,
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

  const toggleMode = () => {
    const newMode = mode === "simulation" ? "api" : "simulation"
    setMode(newMode)
    setApiError(null)

    if (newMode === "api" && !apiKey) {
      setShowSettings(true)
    }

    toast({
      title: newMode === "api" ? "API Mode Activated" : "Simulation Mode Activated",
      description: newMode === "api" ? "Chatbot will use the provided API key" : "Chatbot will use simulated responses",
    })
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl">
      <Tabs defaultValue="chat" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="about">About This Service</TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Mental Health Assistant</CardTitle>
                  <CardDescription>Talk to our AI assistant about how you're feeling</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={toggleMode}>
                    {mode === "api" ? "Use Simulation" : "Try API Mode"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setShowSettings(true)} aria-label="Settings">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {mode === "api" && (
                <div className="text-xs text-muted-foreground">
                  Using API mode with {apiKey ? "provided API key" : "no API key (configure in settings)"}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="h-[400px] overflow-y-auto p-4 rounded-md bg-muted/50">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChatMessage message={message} />
                    </motion.div>
                  ))}
                </AnimatePresence>
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
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                      <span className="sr-only">Sending...</span>
                    </span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </CardFooter>
          </Card>

          {apiError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Issue</AlertTitle>
              <AlertDescription>
                {apiError}
                {mode === "api" && (
                  <Button variant="outline" size="sm" className="mt-2" onClick={toggleMode}>
                    Switch to Simulation Mode
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          )}

          {mode === "simulation" && !apiError && (
            <Alert className="mt-4">
              <Info className="h-4 w-4" />
              <AlertTitle>Simulation Mode Active</AlertTitle>
              <AlertDescription>
                The chatbot is currently using simulated responses. These are pre-written responses and not generated by
                an AI.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About the Mental Health Assistant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">How It Works</h3>
                <p className="text-muted-foreground">This chatbot can operate in two modes:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    <strong>Simulation Mode:</strong> Uses pre-written responses focused on mental health support.
                  </li>
                  <li>
                    <strong>API Mode:</strong> Connects to Google's AI services using your API key to generate
                    personalized responses.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-2">Using API Mode</h3>
                <p className="text-muted-foreground">
                  To use API mode, you'll need a valid Google AI API key (specifically for the Gemini model). You can
                  obtain this from the Google AI Studio or Google Cloud Platform.
                </p>
                <p className="text-muted-foreground mt-2">
                  Your API key is stored locally in your browser and is never shared with anyone else.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Privacy & Security</h3>
                <p className="text-muted-foreground">
                  In Simulation Mode, your messages never leave our server and are not stored.
                </p>
                <p className="text-muted-foreground mt-2">
                  In API Mode, your messages are sent to Google's AI services according to their privacy policy.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Important Note</h3>
                <p className="text-muted-foreground">
                  This chatbot is not a replacement for professional mental health care. If you're experiencing a crisis
                  or emergency, please contact a mental health professional or crisis service immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ChatbotSettings open={showSettings} onOpenChange={setShowSettings} apiKey={apiKey} setApiKey={setApiKey} />
    </div>
  )
}

