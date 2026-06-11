import mongoose from 'mongoose'
import process from 'process'
import dns from 'node:dns/promises'

dns.setServers(['1.1.1.1', '1.0.0.1'])

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB