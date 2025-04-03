import { getDatabase, ref, push, set, get, query, orderByChild, limitToLast, onValue } from "firebase/database"

interface MessageData {
  content: string
  username: string
  userId: string
  roomId: string
}

// Send a message
export const sendMessage = async (messageData: MessageData) => {
  const db = getDatabase()
  const messagesRef = ref(db, `messages/${messageData.roomId}`)

  const newMessageRef = push(messagesRef)

  await set(newMessageRef, {
    content: messageData.content,
    username: messageData.username,
    userId: messageData.userId,
    timestamp: Date.now(),
    roomId: messageData.roomId,
  })

  return newMessageRef.key
}

// Get messages for a specific room
export const getMessages = async (roomId: string) => {
  const db = getDatabase()
  const messagesRef = ref(db, `messages/${roomId}`)

  // Get the last 50 messages
  const messagesQuery = query(messagesRef, orderByChild("timestamp"), limitToLast(50))

  const snapshot = await get(messagesQuery)

  if (snapshot.exists()) {
    const messages = []
    snapshot.forEach((childSnapshot) => {
      messages.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      })
    })
    return messages
  }

  return []
}

// Subscribe to messages for a specific room
export const subscribeToMessages = (roomId: string, callback: (messages: any[]) => void) => {
  const db = getDatabase()
  const messagesRef = ref(db, `messages/${roomId}`)

  // Get the last 50 messages
  const messagesQuery = query(messagesRef, orderByChild("timestamp"), limitToLast(50))

  const unsubscribe = onValue(messagesQuery, (snapshot) => {
    if (snapshot.exists()) {
      const messages = []
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        })
      })
      callback(messages)
    } else {
      callback([])
    }
  })

  return unsubscribe
}

