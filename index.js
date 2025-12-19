import express from 'express'
import cors from 'cors'
import router from './routes/ProductRoutes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/', router)

app.use((req, res)=>{
    res.status(404).json({
        success: false,
        message : `Cannot ${req.method} ${req.originalUrl}`,
        default_url : `/products`
    })
})

app.use((err, req, res, next) => {
  const statusCode = err.status || 500
  const isDev = process.env.NODE_ENV === "development"
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: statusCode !== 500 
        ? err.message : isDev
        ? err.message
        : "Something went wrong. Please try again later. Thank You!",
  })
})

const PORT = process.env.PORT || 9000
const BASE_URL = process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:9000"


app.listen(PORT, ()=>{
    console.log(`📊 API running at ${BASE_URL}/products`)
})