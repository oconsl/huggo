import { PrismaClient } from '@prisma/client'
import Book from '../models/book.model.js'

const prisma = new PrismaClient()

const getBooks = async (_req, res) => {
  Book.getAll(prisma, _req, res)
}

export { getBooks }