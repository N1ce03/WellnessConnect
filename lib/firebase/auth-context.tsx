"use client"

import { useFirebase } from "./firebase-provider"

export const useAuth = () => {
  return useFirebase()
}

