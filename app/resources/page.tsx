import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BookOpen, ExternalLink, FileText, LinkIcon } from "lucide-react"
import Link from "next/link"
import { MotionDiv } from "@/components/motion-components"
import ResourceCard from "@/components/resources/resource-card"

export default function ResourcesPage() {
  const articles = [
    {
      title: "Understanding Anxiety: Causes and Coping Strategies",
      description: "Learn about the common causes of anxiety and effective strategies to manage symptoms.",
      category: "Mental Health",
      readTime: "8 min read",
      link: "https://sagementalwellness.com/understanding-anxiety-causes-and-coping-strategies/#:~:text=Relaxation%20techniques%20such%20as%20yoga,a%20reduction%20of%20anxiety%20levels.",
    },
    {
      title: "The Power of Mindfulness in Daily Life",
      description: "Discover how mindfulness practices can improve your mental wellbeing and reduce stress.",
      category: "Self-Care",
      readTime: "6 min read",
      link: "https://medium.com/@cfo.dbs/the-power-of-mindfulness-in-everyday-life-cfad8d0a8ecf",
    },
    {
      title: "Building Resilience Through Difficult Times",
      description: "Strategies for developing emotional resilience and bouncing back from challenges.",
      category: "Mental Health",
      readTime: "10 min read",
      link: "https://www.angelaidcares.org/blog/the-practice-of-loving-yourself?gad_source=1&gclid=CjwKCAjwwLO_BhB2EiwAx2e-30xiMN348R5d7WVWyhJ1VA2r6JV_mqTDWclEOSjjIXCEQeR15JQXiBoCtaoQAvD_BwE",
    },
    {
      title: "The Connection Between Physical and Mental Health",
      description: "How exercise, nutrition, and sleep impact your mental wellbeing.",
      category: "Self-Care",
      readTime: "7 min read",
      link: "https://www.coreenergetics.org/the-importance-of-mental-and-emotional-well-being/?gad_source=1&gclid=CjwKCAjwwLO_BhB2EiwAx2e-32RNgMgB7yLDyY9_-SrRGj0v_fsY4suKd_SASYVbCm82AiaHM4idwBoCKG0QAvD_BwE",
    },
    {
      title: "Supporting a Loved One with Depression",
      description: "Practical advice for helping someone you care about who is experiencing depression.",
      category: "Support",
      readTime: "9 min read",
      link: "https://www.mayoclinic.org/diseases-conditions/depression/in-depth/depression/art-20045943",
    },
    {
      title: "Managing Work-Related Stress",
      description: "Techniques for maintaining mental health in high-pressure work environments.",
      category: "Stress Management",
      readTime: "8 min read",
      link: "#",
    },
  ]

  const selfCare = [
    {
      title: "5-Minute Breathing Exercise",
      description: "A quick breathing technique to reduce anxiety and center yourself.",
      category: "Mindfulness",
      link: "https://www.apm.org.uk/blog/looking-after-your-mental-health-in-high-pressured-environments/#:~:text=Encouraging%20mindfulness%20practices%20and%20regular,resources%20is%20another%20crucial%20step.",
    },
    {
      title: "Creating a Self-Care Routine",
      description: "Steps to develop a personalized self-care practice that fits your lifestyle.",
      category: "Wellness",
      link: "https://mentalhealthyfit.org/out-of-the-box-self-care/?gad_source=1&gclid=CjwKCAjwwLO_BhB2EiwAx2e-34F5Fc_fDAIFSRlTv8s37w6g5XnwvY83VVT9XrZBwSowiPcYfE6PbxoCG_QQAvD_BwE",
    },
    {
      title: "Journaling for Mental Health",
      description: "How to use journaling as a tool for processing emotions and reducing stress.",
      category: "Coping Skills",
      link: "https://www.talkspace.com/blog/journaling-for-mental-health/",
    },
    {
      title: "Healthy Sleep Habits",
      description: "Improve your mental health by optimizing your sleep routine.",
      category: "Wellness",
      link: "https://www.healthline.com/health/sleep-hygiene",
    },
  ]

  const professionalHelp = [
    {
      name: "National Suicide Prevention Lifeline",
      description: "24/7, free and confidential support for people in distress.",
      contact: "1-800-273-8255",
      website: "https://suicidepreventionlifeline.org/",
    },
    {
      name: "Crisis Text Line",
      description: "Text HOME to 741741 to connect with a Crisis Counselor.",
      contact: "Text HOME to 741741",
      website: "https://www.crisistextline.org/",
    },
    {
      name: "SAMHSA's National Helpline",
      description:
        "Treatment referral and information service for individuals facing mental health or substance use disorders.",
      contact: "1-800-662-4357",
      website: "https://www.samhsa.gov/find-help/national-helpline",
    },
    {
      name: "Psychology Today Therapist Finder",
      description: "Search for therapists in your area based on specialty, insurance, and more.",
      website: "https://www.psychologytoday.com/us/therapists",
    },
  ]

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

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Mental Health Resources</h1>
        <p className="text-xl text-muted-foreground">
          Access articles, self-care tips, and professional resources to support your mental health journey.
        </p>
      </div>

      <Tabs defaultValue="articles" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="self-care">Self-Care Tips</TabsTrigger>
          <TabsTrigger value="professional">Professional Help</TabsTrigger>
        </TabsList>

        <TabsContent value="articles">
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {articles.map((article, index) => (
              <ResourceCard
                key={index}
                title={article.title}
                description={article.description}
                category={article.category}
                metadata={article.readTime}
                link={article.link}
                icon={<FileText className="h-5 w-5" />}
                variants={itemVariants}
              />
            ))}
          </MotionDiv>
        </TabsContent>

        <TabsContent value="self-care">
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {selfCare.map((tip, index) => (
              <ResourceCard
                key={index}
                title={tip.title}
                description={tip.description}
                category={tip.category}
                link={tip.link}
                icon={<BookOpen className="h-5 w-5" />}
                variants={itemVariants}
              />
            ))}
          </MotionDiv>
        </TabsContent>

        <TabsContent value="professional">
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {professionalHelp.map((resource, index) => (
              <MotionDiv key={index} variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-primary" />
                      {resource.name}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {resource.contact && (
                      <p className="text-sm mb-2">
                        <strong>Contact:</strong> {resource.contact}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                        Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </MotionDiv>
            ))}
          </MotionDiv>
        </TabsContent>
      </Tabs>
    </div>
  )
}

