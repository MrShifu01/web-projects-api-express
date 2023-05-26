import router from './router.js'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 8000

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})