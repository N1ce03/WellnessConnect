"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MotionDiv } from "@/components/motion-components"

export default function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "WellnessConnect has been a lifeline for me. The anonymous confession feature allowed me to share my struggles without fear of judgment.",
      author: "Anonymous User",
    },
    {
      quote:
        "The resources provided here helped me understand my anxiety better and develop coping strategies that actually work.",
      author: "Anonymous User",
    },
    {
      quote:
        "Being able to chat with others who understand what I'm going through has made me feel less alone in my mental health journey.",
      author: "Anonymous User",
    },
  ]

  return (
    <section className="bg-muted py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read about how WellnessConnect has helped others on their mental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4 text-4xl text-primary">"</div>
                  <blockquote className="mb-4 text-muted-foreground">{testimonial.quote}</blockquote>
                  <footer className="text-sm font-medium">— {testimonial.author}</footer>
                </CardContent>
              </Card>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}

