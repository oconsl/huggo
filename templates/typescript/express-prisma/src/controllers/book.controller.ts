import { Request, Response, NextFunction } from 'express';
import { 
  getAllBooksService, 
  createBookService, 
  getBookByIdService,
  updateBookService,
  deleteBookService
} from '../services/book.service.js';

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.prisma) throw new Error('Prisma client not available on request');
    const books = await getAllBooksService(req.prisma);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.prisma) throw new Error('Prisma client not available on request');
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }
    const newBook = await createBookService(req.prisma, { title, author });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.prisma) throw new Error('Prisma client not available on request');
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    const book = await getBookByIdService(req.prisma, id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.prisma) throw new Error('Prisma client not available on request');
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    const { title, author } = req.body;
    const updatedBook = await updateBookService(req.prisma, id, { title, author });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found for update' });
    }
    res.json(updatedBook); // Corrected variable name here
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.prisma) throw new Error('Prisma client not available on request');
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid book ID' });
    }
    const deletedBook = await deleteBookService(req.prisma, id);
    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found for deletion' });
    }
    res.status(204).send(); // No content
  } catch (error) {
    next(error);
  }
};
