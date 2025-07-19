// const mongoose = require('mongoose')

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI)
//     console.log('MongoDB Connected...')
//   } catch (err) {
//     console.error('Database connection error:', err.message)
//     process.exit(1)
//   }
// }

// module.exports = connectDB
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables')
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    })
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error('Database connection error:', err.message)
    console.log('Attempted connection URI:', process.env.MONGODB_URI) // Debug
    process.exit(1)
  }
}

module.exports = connectDB
