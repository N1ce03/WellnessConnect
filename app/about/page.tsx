"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { MotionDiv } from "@/components/motion-components"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Clinical Psychologist",
      bio: "Dr. Johnson specializes in cognitive behavioral therapy and has over 15 years of experience in mental health counseling.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Michael Chen",
      role: "Mental Health Advocate",
      bio: "Michael is passionate about reducing stigma around mental health issues and promoting open conversations.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Aisha Patel",
      role: "Wellness Coach",
      bio: "Aisha helps individuals develop personalized self-care routines and build resilience through mindfulness practices.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-6 text-center">About WellnessConnect</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead text-xl text-muted-foreground text-center mb-8">
            WellnessConnect is a platform dedicated to supporting mental health and wellbeing through technology,
            community, and resources.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Story</h2>
          <p>
            WellnessConnect was founded in 2023 with a simple mission: to make mental health support accessible to
            everyone. We recognized that many individuals face barriers to traditional mental health services, including
            cost, stigma, and availability. Our platform aims to bridge these gaps by providing free, anonymous, and
            accessible mental health resources and support.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Approach</h2>
          <p>
            We believe in a holistic approach to mental health that combines technology, community support, and
            evidence-based resources. Our platform offers three core services:
          </p>

          <ul className="space-y-2 mt-4">
            <li>
              <strong>AI Chatbot:</strong> Our mental health assistant provides immediate support and resources based on
              your needs.
            </li>
            <li>
              <strong>Anonymous Confessions:</strong> A safe space to share your thoughts and feelings without judgment
              or identification.
            </li>
            <li>
              <strong>Anonymous Chat:</strong> Connect with others who may be experiencing similar challenges in a
              supportive environment.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-12 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe mental health support should be available to everyone, regardless of their background or
                  circumstances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-2">Privacy</h3>
                <p className="text-muted-foreground">
                  We prioritize user privacy and provide anonymous options for those who prefer to maintain
                  confidentiality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a supportive community where individuals can connect, share, and grow together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Our Team</h2>
      <MotionDiv
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teamMembers.map((member, index) => (
          <MotionDiv key={index} variants={itemVariants} className="flex flex-col items-center">
            <div className="rounded-full overflow-hidden mb-4 w-32 h-32">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            <p className="text-primary mb-2">{member.role}</p>
            <p className="text-muted-foreground text-center">{member.bio}</p>
          </MotionDiv>
        ))}
      </MotionDiv>
    </div>
  )
}

