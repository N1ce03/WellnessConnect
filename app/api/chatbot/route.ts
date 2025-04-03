import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message, apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Use the API key directly in the URL as a query parameter
    // This is the standard way to use API keys with many Google services
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a mental health assistant. Respond with empathy and care to the following message: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API error:", errorData)

      // Check for specific error types
      if (response.status === 404) {
        return NextResponse.json(
          { error: "The AI model could not be found. Please check your API key and try again." },
          { status: 404 },
        )
      } else if (response.status === 400) {
        return NextResponse.json({ error: "Invalid request to AI service" }, { status: 400 })
      } else if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: "Invalid API key or unauthorized access. Make sure you're using a valid Google AI API key." },
          { status: 401 },
        )
      } else {
        return NextResponse.json({ error: "Failed to get response from AI service" }, { status: response.status })
      }
    }

    const data = await response.json()

    // Extract the response text from the API response
    let responseText = ""
    try {
      responseText = data.candidates[0].content.parts[0].text || "I apologize, but I couldn't generate a response."
    } catch (e) {
      console.error("Error parsing API response:", e)
      responseText = "I apologize, but I couldn't understand the response from the AI service."
    }

    return NextResponse.json({ response: responseText })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

