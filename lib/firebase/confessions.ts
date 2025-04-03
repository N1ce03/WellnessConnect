import { getDatabase, ref, push, set, get, update } from "firebase/database"

// Add a new confession
export const addConfession = async (content: string) => {
  const db = getDatabase()
  const confessionsRef = ref(db, "confessions")

  const newConfessionRef = push(confessionsRef)

  await set(newConfessionRef, {
    content,
    timestamp: Date.now(),
    likes: 0,
    likedBy: [],
  })

  return newConfessionRef.key
}

// Get all confessions
export const getConfessions = async () => {
  const db = getDatabase()
  const confessionsRef = ref(db, "confessions")

  const snapshot = await get(confessionsRef)

  if (snapshot.exists()) {
    const confessions = []
    snapshot.forEach((childSnapshot) => {
      confessions.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      })
    })
    return confessions
  }

  return []
}

// Like or unlike a confession
export const likeConfession = async (confessionId: string, userId: string) => {
  const db = getDatabase()
  const confessionRef = ref(db, `confessions/${confessionId}`)

  const snapshot = await get(confessionRef)

  if (snapshot.exists()) {
    const confession = snapshot.val()
    const likedBy = confession.likedBy || []
    const alreadyLiked = likedBy.includes(userId)

    if (alreadyLiked) {
      // Unlike
      const updatedLikedBy = likedBy.filter((id: string) => id !== userId)
      await update(confessionRef, {
        likes: confession.likes - 1,
        likedBy: updatedLikedBy,
      })
    } else {
      // Like
      await update(confessionRef, {
        likes: confession.likes + 1,
        likedBy: [...likedBy, userId],
      })
    }
  }
}

