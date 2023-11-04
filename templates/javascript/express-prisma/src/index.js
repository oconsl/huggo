import express from 'express'
const app = express()
import bookRouter from './routes/book.router.js'

app.use(express.json())

app.use('/api', bookRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})