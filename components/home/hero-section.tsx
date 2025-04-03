"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MotionDiv } from "@/components/motion-components"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0" />

      <div className="container relative z-10 px-4 py-20 md:py-32 mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Your Mental Health Matters</h1>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              WellnessConnect provides a safe space for mental health support, resources, and anonymous connections.
              Start your wellness journey today.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg">
              <Link href="/services">Explore Our Services</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/resources">Browse Resources</Link>
            </Button>
          </MotionDiv>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}

