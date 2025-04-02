// lib/mongodb.js
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

// Updated options without deprecated parameters
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local')
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect().catch(err => {
      console.error('Failed to connect to MongoDB:', err)
      throw err
    })
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect().catch(err => {
    console.error('Failed to connect to MongoDB:', err)
    throw err
  })
}

export default clientPromise