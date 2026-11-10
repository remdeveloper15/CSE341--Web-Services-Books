//----------ROUTER----------//
//This file defines the routes for the application and connects them to their respective controllers. It also includes Swagger documentation for the API endpoints.

//----------IMPORTS----------//
import express from 'express';
import { getBooksHandler, getBookByIdHandler } from './controllers/books.js';
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from './controllers/authors.js';

//----------ROUTER SETUP----------//
// Create a new router instance
const router = express.Router();

//Swagger documentation for retrieving all books
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
// Route to retrieve all books
router.get('/books', getBooksHandler);

//Swagger documentation for retrieving one book by ID
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

// Route to retrieve a book by ID
router.get('/books/:id', getBookByIdHandler);

//Swagger documentation for retrieving all authors
/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Unable to retrieve authors
 */

// Route to retrieve all authors
router.get('/authors', getAllAuthors);

//Swagger documentation for retrieving one author by ID
/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       200:
 *         description: A single author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to retrieve author
 */

// Route to retrieve an author by ID
router.get('/authors/:id', getAuthorById);

//Swagger documentation for creating a new author
/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create an author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             id: a4
 *             name: Example Author
 *             birthYear: 1980
 *     responses:
 *       201:
 *         description: Author created
 *       400:
 *         description: Missing required author fields or author ID already exists
 *       500:
 *         description: Unable to create author
 */

// Route to create a new author
router.post('/authors', createAuthor);

//Swagger documentation for updating an existing author
/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *               birthYear:
 *                 type: number
 *           example:
 *             name: Updated Author
 *             birthYear: 1981
 *     responses:
 *       200:
 *         description: Author updated
 *       400:
 *         description: Missing required author fields
 *       404:
 *         description: Author not found
 *       500:
 *         description: Unable to update author
 */

// Route to update an existing author
router.put('/authors/:id', updateAuthor);

//Swagger documentation for deleting an author
/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       204:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 *       409:
 *         description: Author cannot be deleted because they still have books
 *       500:
 *         description: Unable to delete author
 */

// Route to delete an author
router.delete('/authors/:id', deleteAuthor);

//----------EXPORTS----------//
export default router;