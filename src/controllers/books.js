//----------BOOKS CONTROLLER----------//
// This file contains the controller for books in the application. It defines the logic for handling requests related to books, such as retrieving all books or a specific book by ID. The controller interacts with the books model to perform these operations and sends appropriate responses back to the client.

//----------IMPORTS----------//
import {
  getAllBooks as getAllBooksFromDb,
  getBookById as getBookByIdFromDb,
  createBook as createBookFromDb,
  updateBook as updateBookFromDb,
  deleteBook as deleteBookFromDb,
  authorExists,
} from '../models/books.js';

//----------METHODS----------//
// Method to handle the request to retrieve all books
const getAllBooks = async (req, res) => {
  try {
    const books = await getAllBooksFromDb();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve books.' });
  }
};

// Method to handle the request to retrieve a single book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookByIdFromDb(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve book.' });
  }
};

// Method to handle the request to create a new book
const createBook = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body;

    // Validation 1: Check if all required fields are present
    if (!id || !authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'Missing required book fields.' });
    }

    // Validation 2: Check if the book ID already exists
    const existingBook = await getBookByIdFromDb(id);
    if (existingBook) {
      return res.status(400).json({ message: 'Book id already exists.' });
    }

    // Validation 3: Check if the author exists
    const isValidAuthor = await authorExists(authorId);
    if (!isValidAuthor) {
      return res.status(400).json({ message: 'Invalid authorId. Author does not exist.' });
    }

    const createdBook = await createBookFromDb({ id, authorId, title, publicationDate });
    return res.status(201).json(createdBook);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create book.' });
  }
};

// Method to handle the request to update an existing book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId, title, publicationDate } = req.body;

    // Validation 1: Check if all required fields are present
    if (!authorId || !title || !publicationDate) {
      return res.status(400).json({ message: 'Missing required book fields.' });
    }

    // Validation 2: Check if the book ID exists in the database
    const existingBook = await getBookByIdFromDb(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Validation 3: Check if the new author exists
    const isValidAuthor = await authorExists(authorId);
    if (!isValidAuthor) {
      return res.status(400).json({ message: 'Invalid authorId. Author does not exist.' });
    }

    const updatedBook = await updateBookFromDb(id, { authorId, title, publicationDate });
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update book.' });
  }
};

// Method to handle the request to delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBook = await getBookByIdFromDb(id);
    if (!existingBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    await deleteBookFromDb(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete book.' });
  }
};

//----------EXPORTS----------//
export { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook 
};