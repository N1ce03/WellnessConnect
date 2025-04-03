import { NextResponse } from "next/server"

// Enhanced list of mental health responses for fallback
const mentalHealthResponses = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    responses: [
      "Hello! I'm here to support you. How are you feeling today?",
      "Hi there! I'm your mental health assistant. How can I help you today?",
      "Hello! Thank you for reaching out. How are you doing right now?",
    ],
  },
  {
    keywords: ["anxious", "anxiety", "worried", "stress", "stressed", "panic"],
    responses: [
      "I hear that you're feeling anxious. Deep breathing can help in moments like these. Would you like to try a simple breathing exercise?",
      "Anxiety can be really challenging. Remember that your feelings are valid, and there are techniques that might help manage these feelings.",
      "When you're feeling anxious, it can help to ground yourself by noticing five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste.",
    ],
  },
  {
    keywords: ["sad", "depressed", "unhappy", "down", "blue", "depression"],
    responses: [
      "I'm sorry you're feeling sad. Your feelings are valid, and it's okay to not be okay sometimes.",
      "Depression can make everything feel more difficult. Have you been able to talk to anyone else about how you're feeling?",
      "When you're feeling down, sometimes small acts of self-care can help. Is there something small you could do for yourself today?",
    ],
  },
  {
    keywords: ["sleep", "tired", "insomnia", "exhausted", "fatigue", "rest"],
    responses: [
      "Sleep difficulties can have a significant impact on mental health. Have you noticed any patterns with your sleep issues?",
      "Creating a consistent bedtime routine can sometimes help with sleep. This might include things like reducing screen time before bed or practicing relaxation techniques.",
      "I understand how frustrating sleep problems can be. Have you spoken with a healthcare provider about this?",
    ],
  },
  {
    keywords: ["alone", "lonely", "isolated", "no one", "nobody", "by myself"],
    responses: [
      "Feeling alone can be really difficult. Remember that many people experience loneliness, and it doesn't mean there's something wrong with you.",
      "I'm sorry you're feeling lonely. Are there any small ways you could connect with others, even briefly?",
      "Loneliness is a common human experience, though that doesn't make it any easier. Your feelings are valid and important.",
    ],
  },
  {
    keywords: ["angry", "anger", "mad", "frustrated", "irritated", "rage"],
    responses: [
      "Anger is a natural emotion that everyone experiences. Finding healthy ways to express it is important.",
      "When you're feeling angry, taking a short break or a few deep breaths might help create some space between the feeling and your reaction.",
      "It sounds like you're feeling frustrated. Would it help to talk more about what's causing these feelings?",
    ],
  },
  {
    keywords: ["help", "support", "resources", "therapy", "therapist", "counseling"],
    responses: [
      "Seeking help is a sign of strength. There are many resources available, from therapy to support groups to crisis lines.",
      "Professional support can be really valuable for mental health. Would you like to know more about how to find mental health resources?",
      "There are different types of mental health support available. Therapy, medication, support groups, and self-help resources can all be helpful in different ways.",
    ],
  },
  {
    keywords: ["thank", "thanks", "appreciate", "grateful"],
    responses: [
      "You're welcome. I'm here to support you.",
      "I'm glad I could help in some way. Remember to be kind to yourself.",
      "You're welcome. Remember that seeking support is a sign of strength.",
    ],
  },
]

// Default responses when no keywords match
const defaultResponses = [
  "I understand that you might be going through a difficult time. How can I support you today?",
  "Thank you for sharing that with me. It takes courage to express your feelings.",
  "I'm here to listen without judgment. Please feel free to share whatever is on your mind.",
  "Sometimes taking small steps can help when feeling overwhelmed. What's one small thing you could do for yourself today?",
  "It's important to remember that seeking help is a sign of strength, not weakness.",
  "Your feelings are valid, and it's okay to not be okay sometimes.",
  "Would it help to explore some coping strategies that might work for your situation?",
  "I'm sorry you're going through this. You're not alone, even though it might feel that way sometimes.",
  "Many people experience similar feelings. Would it help to know about some resources that others have found helpful?",
  "How have you been taking care of yourself lately? Self-care is important for mental wellbeing.",
]

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Convert message to lowercase for matching
    const lowerMessage = message.toLowerCase()

    // Find matching response category
    let matchedResponses = defaultResponses
    let highestMatchCount = 0

    for (const category of mentalHealthResponses) {
      const matchCount = category.keywords.filter((keyword) => lowerMessage.includes(keyword)).length

      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount
        matchedResponses = category.responses
      }
    }

    // Get a random response from the matched category
    const responseIndex = Math.floor(Math.random() * matchedResponses.length)
    const responseText = matchedResponses[responseIndex]

    // Add a small delay to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({ response: responseText })
  } catch (error) {
    console.error("Fallback server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

