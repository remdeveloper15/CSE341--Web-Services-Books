//----------MODEL AUTHORS----------//
// This file contains the model for authors in the application. It defines the structure of the author data and any associated methods or validations. This file is the only one allowed to access the database directly for author-related operations. All other files should interact with the authors model through the provided methods.  

//----------IMPORTS----------//
import { getDb } from '../db/connect.js';

//----------METHODS----------//
// Method to retrieve all authors from the database
const getAllAuthors = async () => {
    const db = getDb();
    const authors = await db.collection('authors').find().toArray();
    
    return authors;
};

// Method to retrieve a single author by ID from the database
const getAuthorById = async (id) => {
  const db = getDb();
  const collection = db.collection('authors');
  const author = await collection.findOne({ id });

  return author;
};

// Method to create a new author in the database
const createAuthor = async (author) => {
  const db = getDb();
  const collection = db.collection('authors');
  await collection.insertOne(author);

  return author;
};

// Method to update an existing author in the database
const updateAuthor = async (id, author) => {
  const db = getDb();
  const collection = db.collection('authors');
  await collection.updateOne({ id }, { $set: author });

  return { id, ...author };
};

// Method to delete an author from the database
const deleteAuthor = async (id) => {
  const db = getDb();
  const collection = db.collection('authors');
  const result = await collection.deleteOne({ id });

  return result;
};

// Method to check if an author has any associated books in the database
const authorHasBooks = async (id) => {
  const db = getDb();
  const collection = db.collection('books');
  const count = await collection.countDocuments({ authorId: id });

  return count > 0;
};
//----------EXPORTS----------//
export { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor, authorHasBooks };