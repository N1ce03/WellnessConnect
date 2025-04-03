"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously, onAuthStateChanged, type User, signOut as firebaseSignOut } from "firebase/auth"
import { getDatabase } from "firebase/database"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
let app: any
let auth: any
let database: any

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  database = getDatabase(app)
} catch (error) {
  console.error("Firebase initialization error:", error)
}

// Generate a random username
const generateRandomUsername = () => {
  const adjectives = ["Happy", "Brave", "Calm", "Kind", "Wise", "Gentle", "Peaceful"]
  const nouns = ["Soul", "Mind", "Heart", "Spirit", "Journey", "Path", "Traveler"]
  const number = Math.floor(Math.random() * 1000)

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  return `${randomAdjective}${randomNoun}${number}`
}

// Create context
interface FirebaseContextType {
  user: User | null
  username: string | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  username: null,
  signIn: async () => {},
  signOut: async () => {},
})

export const useFirebase = () => useContext(FirebaseContext)

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)

      if (user) {
        // Check if username exists in localStorage
        const storedUsername = localStorage.getItem(`username_${user.uid}`)
        if (storedUsername) {
          setUsername(storedUsername)
        } else {
          // Generate and store a new username
          const newUsername = generateRandomUsername()
          localStorage.setItem(`username_${user.uid}`, newUsername)
          setUsername(newUsername)
        }
      } else {
        setUsername(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    if (!auth) return

    try {
      await signInAnonymously(auth)
    } catch (error) {
      console.error("Error signing in:", error)
    }
  }

  const signOut = async () => {
    if (!auth) return

    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <FirebaseContext.Provider value={{ user, username, signIn, signOut }}>
      {!loading && children}
    </FirebaseContext.Provider>
  )
}

