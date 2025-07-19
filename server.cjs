// const express = require('express')
// const cors = require('cors')
// const mongoose = require('mongoose')
// const connectDB = require('./config/db.cjs')
// const apiRouter = require('./routes/api.cjs')
// const app = express()
// require('dotenv').config()
// // Middleware
// app.use(
//   cors({
//     origin: [
//       'https://git-folio-frontend-7l7h.vercel.app/', // Your frontend URL
//       'http://localhost:3000', // For local testing
//     ],
//     credentials: true,
//   })
// )
// app.use(express.json())

// // Database connection
// connectDB() // Using the imported connectDB function

// // Routes
// app.use('/api', apiRouter)

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res
//     .status(200)
//     .json({ status: 'OK', dbState: mongoose.connection.readyState })
// })

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).json({
//     error: 'Something went wrong!',
//     message: err.message,
//   })
// })

// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err)
//   // Optionally exit the process
//   // process.exit(1)
// })

// module.exports = app
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/db.cjs')
const apiRouter = require('./routes/api.cjs')

const app = express()

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
].filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
connectDB()

// Routes
app.use('/api', apiRouter)

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    dbState: mongoose.connection.readyState,
    version: process.env.npm_package_version,
  })
})

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message }),
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
