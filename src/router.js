//----------IMPORTS----------//
import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';

const router = express.Router();

//----------SWAGGER DOCUMENTATION----------//
/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *      200:
 *        description: A list of books
 *      500:
 *        description: Internal server error
 */

//----------ROUTES----------//
router.get('/books', getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Retrieve a book by ID
 *     tags: [Books]
 *     parameters: 
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the book to retrieve
 *        schema:
 *          type: string
 *     responses:
 *      200:
 *        description: A book
 *      404:
 *        description: Book not found
 *      500:
 *        description: Internal server error
 */

router.get('/books/:id', getBookByIdHandler);

//----------EXPORTS----------//
export default router;