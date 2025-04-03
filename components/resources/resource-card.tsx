"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface ResourceCardProps {
  title: string
  description: string
  category: string
  metadata?: string
  link: string
  icon: React.ReactNode
  variants?: any
}

export default function ResourceCard({
  title,
  description,
  category,
  metadata,
  link,
  icon,
  variants,
}: ResourceCardProps) {
  return (
    <motion.div variants={variants}>
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              {icon}
              <Badge variant="secondary">{category}</Badge>
            </div>
            {metadata && <span className="text-xs text-muted-foreground">{metadata}</span>}
          </div>
          <CardTitle className="text-lg mt-2">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={link}>
              Read More <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

