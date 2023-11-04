class Book {
  static async getAll (prisma, _req, res) {
    try {
      const books = await prisma.book.findMany()
      res.json(books)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al obtener los libros' })
    } finally {
      await prisma.$disconnect()
    }
  }
}