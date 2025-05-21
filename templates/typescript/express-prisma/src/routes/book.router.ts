import { Router } from 'express';
import { getAllBooks, createBook, getBookById, updateBook, deleteBook } from '../controllers/book.controller.js';

const router = Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;
