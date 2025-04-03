"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, ExternalLink, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

type SavedResource = {
  id: string
  title: string
  description: string
  link: string
  savedAt: Date
}

export default function SavedResources() {
  // In a real app, this would come from a database
  const [resources, setResources] = useState<SavedResource[]>([
    {
      id: "1",
      title: "Understanding Anxiety: Causes and Coping Strategies",
      description: "Learn about the common causes of anxiety and effective strategies to manage symptoms.",
      link: "#",
      savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    },
    {
      id: "2",
      title: "The Power of Mindfulness in Daily Life",
      description: "Discover how mindfulness practices can improve your mental wellbeing and reduce stress.",
      link: "#",
      savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    },
    {
      id: "3",
      title: "Building Resilience Through Difficult Times",
      description: "Strategies for developing emotional resilience and bouncing back from challenges.",
      link: "#",
      savedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    },
  ])

  const { toast } = useToast()

  const removeResource = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
    toast({
      title: "Resource removed",
      description: "The resource has been removed from your saved items.",
    })
  }

  return (
    <div>
      {resources.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No saved resources</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't saved any resources yet. Browse our resources section to find helpful articles.
            </p>
            <Button>Browse Resources</Button>
          </CardContent>
        </Card>
      ) : (
        <AnimatePresence>
          <div className="space-y-4">
            {resources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription>Saved on {resource.savedAt.toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{resource.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        Read Article <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeResource(resource.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

