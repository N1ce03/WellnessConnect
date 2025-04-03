import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Shield, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { MotionDiv } from "@/components/motion-components"

export default function ServicesPage() {
  const services = [
    {
      icon: <MessageCircle className="h-12 w-12 text-primary" />,
      title: "AI Chatbot",
      description:
        "Talk to our mental health assistant anytime, anywhere. Get support, resources, and guidance when you need it most.",
      features: [
        "24/7 availability",
        "Personalized responses",
        "Resource recommendations",
        "Guided exercises and techniques",
      ],
      link: "/services/chatbot",
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Anonymous Confessions",
      description:
        "Share your thoughts, feelings, and experiences in a safe, anonymous environment without fear of judgment.",
      features: [
        "Complete anonymity",
        "Community support through likes",
        "Sort by newest or most liked",
        "Moderated for safety",
      ],
      link: "/services/confessions",
    },
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: "Anonymous Chat",
      description:
        "Connect with others anonymously in real-time to share experiences, offer support, and feel less alone.",
      features: [
        "Real-time messaging",
        "Random username assignment",
        "Multiple chat rooms by topic",
        "Community guidelines for respectful interaction",
      ],
      link: "/services/chat",
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Services</h1>
        <p className="text-xl text-muted-foreground">
          WellnessConnect offers a variety of services designed to support your mental health journey.
        </p>
      </div>

      <MotionDiv
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => (
          <MotionDiv key={index} variants={itemVariants}>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={service.link}>
                    Try {service.title} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </MotionDiv>
        ))}
      </MotionDiv>

      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">How Our Services Work Together</h2>
        <p className="text-muted-foreground mb-8">
          Our services are designed to complement each other, providing comprehensive support for your mental health
          journey. Use them individually or together based on your needs.
        </p>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-medium mb-4">Your Privacy Matters</h3>
          <p className="text-muted-foreground">
            All our services prioritize your privacy and security. Your personal information is never shared, and you
            can choose to remain anonymous across all our platforms.
          </p>
        </div>
      </div>
    </div>
  )
}

