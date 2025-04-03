import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Heart, MessageCircle, Shield } from "lucide-react"
import HeroSection from "@/components/home/hero-section"
import FeatureCard from "@/components/home/feature-card"
import TestimonialSection from "@/components/home/testimonial-section"

export default function Home() {
  const features = [
    {
      icon: <MessageCircle className="h-10 w-10 text-primary" />,
      title: "AI Chatbot",
      description: "Talk to our mental health assistant anytime, anywhere. Get support when you need it most.",
      link: "/services/chatbot",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Anonymous Confessions",
      description: "Share your thoughts and feelings in a safe, anonymous environment.",
      link: "/services/confessions",
    },
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "Anonymous Chat",
      description: "Connect with others anonymously and share experiences in real-time.",
      link: "/services/chat",
    },
  ]

  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSection />

      {/* Features Section */}
      <section className="container px-4 py-12 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            WellnessConnect offers a variety of services designed to support your mental health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-muted py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At WellnessConnect, we believe that mental health support should be accessible to everyone. Our platform
                provides a safe space for individuals to seek help, share experiences, and connect with others on their
                mental health journey.
              </p>
              <Link href="/about">
                <Button>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-2xl font-semibold mb-2">Mental Health Matters</h3>
                  <p className="text-muted-foreground">Your wellbeing is our priority. Join our community today.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />

      {/* CTA Section */}
      <section className="container px-4 mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-muted-foreground mb-8">
            Join WellnessConnect today and take the first step towards better mental health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg">Explore Our Services</Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

