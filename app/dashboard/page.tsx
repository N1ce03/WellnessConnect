"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/firebase/auth-context"
import { Button } from "@/components/ui/button"
import { MessageCircle, Shield, Bookmark } from "lucide-react"
import SavedResources from "@/components/dashboard/saved-resources"
import UserConfessions from "@/components/dashboard/user-confessions"
import ChatHistory from "@/components/dashboard/chat-history"
import { MotionDiv } from "@/components/motion-components"

export default function DashboardPage() {
  const { user, signIn } = useAuth()
  const [activeTab, setActiveTab] = useState("resources")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (!user) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={signIn} className="w-full">
              Sign In Anonymously
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground">Manage your saved resources, confessions, and chat history.</p>
        </div>

        <MotionDiv
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionDiv variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5 text-primary" />
                  Saved Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Access your bookmarked articles and resources.</p>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Your Confessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">View and manage your anonymous confessions.</p>
              </CardContent>
            </Card>
          </MotionDiv>

          <MotionDiv variants={itemVariants}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Chat History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Review your conversations with the AI assistant.</p>
              </CardContent>
            </Card>
          </MotionDiv>
        </MotionDiv>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="resources">Saved Resources</TabsTrigger>
            <TabsTrigger value="confessions">Your Confessions</TabsTrigger>
            <TabsTrigger value="chat">Chat History</TabsTrigger>
          </TabsList>

          <TabsContent value="resources">
            <SavedResources />
          </TabsContent>

          <TabsContent value="confessions">
            <UserConfessions />
          </TabsContent>

          <TabsContent value="chat">
            <ChatHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

