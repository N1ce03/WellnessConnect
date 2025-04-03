"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"

interface ChatbotSettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  apiKey: string
  setApiKey: (key: string) => void
}

export default function ChatbotSettings({ open, onOpenChange, apiKey, setApiKey }: ChatbotSettingsProps) {
  const [inputKey, setInputKey] = useState(apiKey)

  const handleSave = () => {
    setApiKey(inputKey)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chatbot Settings</DialogTitle>
          <DialogDescription>
            Configure your chatbot settings. Your API key is stored locally and never shared.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              You need a Google AI API key (Gemini model) to use API mode. Without a key, the chatbot will use
              simulation mode.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="api-key">Google AI API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Enter your Google AI API key"
            />
            <p className="text-xs text-muted-foreground">
              This key is stored only in your browser's local storage and is never sent to our servers directly.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

