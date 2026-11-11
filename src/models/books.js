//----------BOOKS MODEL----------//
// This file contains the model for books in the application. It defines the structure of the book data and any associated methods or validations. This file is the only one allowed to access the database directly for book-related operations. All other files should interact with the books model through the provided methods.

//----------IMPORTS----------//
import { getDb } from '../db/connect.js';

//----------METHODS----------//
// Method to retrieve all books from the database
const getAllBooks = async () => {
  const db = getDb();
  const collection = db.collection('books');
  const books = await collection.find({}).toArray();

  return books;
};

// Method to retrieve a single book by ID from the database
const getBookById = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const book = await collection.findOne({ id });

  return book;
};

//Method to create a new book in the database
const createBook = async (book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.insertOne(book);

  return book;
};

// Method to update an existing book in the database
const updateBook = async (id, book) => {
  const db = getDb();
  const collection = db.collection('books');
  await collection.updateOne({ id }, { $set: book });

  return { id, ...book };
};

// Method to delete a book from the database
const deleteBook = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const result = await collection.deleteOne({ id });

  return result;
};

// Method to check if an author exists in the database
const authorExists = async (authorId) => {
  const db = getDb();
  const collection = db.collection('authors');
  const author = await collection.findOne({ id: authorId });
  
  return author !== null;
};


export { 
  getAllBooks, 
  getBookById, 
  createBook, 
  updateBook, 
  deleteBook, 
  authorExists 
};