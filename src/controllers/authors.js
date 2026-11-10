//----------AUTHORS CONTROLLER----------//
// This file contains the controller for authors in the application. It defines the logic for handling requests related to authors, such as retrieving all authors from the database. The controller interacts with the authors model to perform these operations and sends appropriate responses back to the client.

//----------IMPORTS----------//
import { 
    getAllAuthors as getAllAuthorsFromDb,
    getAuthorById as getAuthorByIdFromDb,
    createAuthor as createAuthorFromDb,
    updateAuthor as updateAuthorFromDb,
    deleteAuthor as deleteAuthorFromDb,
    authorHasBooks,
} from '../models/authors.js';

//----------METHODS----------//
// Method to handle the request to retrieve all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await getAllAuthorsFromDb();
        return res.status(200).json(authors);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to retrieve authors', error: error.message });
    }
};

// Method to handle the request to retrieve a single author by ID
const getAuthorById = async (req, res) => {
  try {
    // req.params obtiene el ID directamente de la URL (ej. /authors/a1)
    const { id } = req.params;
    const author = await getAuthorByIdFromDb(id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to retrieve author.' });
  }
};

// Method to handle the request to create a new author
const createAuthor = async (req, res) => {
  try {
    // req.body get the data sent in the request body (ej. { "id": "a1", "name": "Author Name", "birthYear": 1970 })
    const { id, name, birthYear } = req.body;

    // Validation 1: Check if all required fields are present
    if (!id || !name || birthYear === undefined) {
      return res.status(400).json({ message: 'Missing required author fields.' });
    }

    // Validation 2: Check if the author ID already exists in the database
    const existingAuthor = await getAuthorByIdFromDb(id);
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author id already exists.' });
    }

    const createdAuthor = await createAuthorFromDb({ id, name, birthYear });

    // 201 Created is the appropriate status code for a successful creation of a resource"
    return res.status(201).json(createdAuthor); 
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create author.' });
  }
};

// Method to handle the request to update an existing author
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, birthYear } = req.body;

    if (!name || birthYear === undefined) {
      return res.status(400).json({ message: 'Missing required author fields.' });
    }

    const existingAuthor = await getAuthorByIdFromDb(id);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    const updatedAuthor = await updateAuthorFromDb(id, { name, birthYear });
    return res.status(200).json(updatedAuthor);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update author.' });
  }
};

// Method to handle the request to delete an author
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const existingAuthor = await getAuthorByIdFromDb(id);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found.' });
    }

    // Validation CRUCIAL of our Spec: Does it have associated books?
    if (await authorHasBooks(id)) {
      return res.status(409).json({ message: 'Author cannot be deleted because they still have books.' });
    }

    await deleteAuthorFromDb(id);
    // 204 signifies "Operation successful, but no content to return in the body"
    return res.status(204).send(); 
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete author.' });
  }
};

//----------EXPORTS----------//
export { 
    getAllAuthors, 
    getAuthorById, 
    createAuthor, 
    updateAuthor, 
    deleteAuthor 
};