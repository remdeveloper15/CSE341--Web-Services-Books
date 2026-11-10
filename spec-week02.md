# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes
#### GET /books
- **Status code:** `200`
- **Response:** an array of book objects
- **Errors:** `500` if unexpected server error.

#### GET /books/:id
- **Status code:** `200`
- **Response:** the matching book object
- **Errors:** `404` if not found, `500` if server error.

#### POST /books
- **Success:** `201`
- **Errors:** `400` if missing fields/duplicate id/invalid authorId, `500` for server error.

#### PUT /books/:id
- **Success:** `200`
- **Errors:** `400` if missing fields/invalid authorId, `404` if not found, `500` for server error.

#### DELETE /books/:id
- **Success:** `204`
- **Errors:** `404` if not found, `500` for server error.

---

## Feature 2: Author CRUD Operations

### Goal
Create an `authors` collection and implement full CRUD operations. Authors must be linked to books, and we must prevent the deletion of an author if they still have books referencing them.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Routes

#### GET /authors
Purpose: Return all authors.
- **Success:** Status code `200`. Response body: an array of author objects.
- **Errors:** `500` if an unexpected server or database error occurs.

#### GET /authors/:id
Purpose: Return one author by their custom id.
- **Success:** Status code `200`. Response body: the matching author object.
- **Errors:** `404` if no author exists with that id. `500` if server error.

#### POST /authors
Purpose: Create a new author.
**Request body:**
```json
{
  "id": "a4",
  "name": "Jane Austen",
  "birthYear": 1775
}

Success: Status code 201. Response body: the newly created author object.

Errors: 400 if a required field is missing, or if the id already exists. 500 if server error.

PUT /authors/:id
Purpose: Update an existing author.Request body:

JSON
{
  "name": "Jane Austen Updated",
  "birthYear": 1775
}
Success: Status code 200. Response body: the updated author object.

Errors: 400 if a required field is missing. 404 if no author exists with that id. 500 if server error.

DELETE /authors/:id
Purpose: Delete an existing author.Relationship Constraint: Before deleting, the API must check the books collection. If any book contains this author's id in its authorId field, the deletion must be rejected.

Success: Status code 204. Response body: none.

Errors:

409 (Conflict) or 400 (Bad Request) if the author still has books associated with them.

404 if no author exists with that id.

500 if an unexpected server error occurs.

Swagger Documentation
Swagger must document every author route.


---

### Paso 2: Evaluación de la Especificación (Preguntas de la tarea)

La tarea pide que hagamos 4 preguntas sobre esta Versión 1. Como IA, aquí está mi evaluación y las áreas de mejora para tu especificación:

1. **¿Hay errores o decisiones poco previsoras (short-sighted decisions)?**
   * *Sí.* En los errores, decimos que devolvemos un status code (ej. 400 o 500), pero no especificamos cómo será el cuerpo (body) de la respuesta de error. ¿Será texto plano? ¿Un objeto JSON? Lo ideal es estandarizar que todos los errores devuelvan un JSON como: `{"error": "Mensaje descriptivo"}`.
2. **¿Faltan consideraciones de seguridad?**
   * *Sí.* Nuestra API está completamente abierta. Cualquiera puede hacer un `DELETE` y borrar nuestros libros. Aunque para esta semana 2 no implementaremos autenticación (OAuth/JWT), al menos deberíamos mencionarlo en el spec como un "futuro requisito". Además, falta validación estricta de tipos de datos (asegurar que `birthYear` sea realmente un número y no un string o inyección de código).
3. **¿Hay problemas de eficiencia con el diseño actual?**
   * *Sí.* Los endpoints `GET /books` y `GET /authors` devuelven *todos* los documentos. Si nuestra base de datos crece a 10,000 libros, la API colapsará. En una API profesional, esto requiere **Paginación** (pagination). Para este ejercicio puede pasar, pero deberíamos anotarlo.
4. **¿Hay ejemplos de respuestas o comportamientos de error poco claros?**
   * El error `409 Conflict` en `DELETE /authors/:id` es conceptualmente correcto, pero debemos definir exactamente qué mensaje JSON le enviará al usuario para que sepa *por qué* falló. 

---

### Paso 3: Crear la Versión 2 de tu Spec

Basándonos en las críticas constructivas anteriores, mejoramos la especificación. **Copia este bloque final, será tu checklist para programar:**

```markdown
# Books API Week 02 Spec - Version 2 (Final)

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author, supporting all CRUD operations. All routes must be documented in Swagger.

### Data Model
Collection: `books`
- `id`: string, required, custom id (e.g., `b1`)
- `authorId`: string, required, must match an existing author's `id`
- `title`: string, required
- `publicationDate`: string, required

### Routes
*(All error responses must return a JSON object format: `{"error": "Description of the error"}`)*

#### GET /books
- **Success:** `200` - Returns JSON array of all book objects.
- **Errors:** `500` (Server error)

#### GET /books/:id
- **Success:** `200` - Returns JSON of the matching book object.
- **Errors:** `404` (Book not found), `500` (Server error)

#### POST /books
- **Request Body Example:** `{"id": "b4", "authorId": "a1", "title": "New Book", "publicationDate": "2026-01-15"}`
- **Success:** `201` - Returns the created book object.
- **Errors:** `400` (Missing fields, duplicate ID, or `authorId` does not exist), `500` (Server error)

#### PUT /books/:id
- **Request Body Example:** `{"authorId": "a2", "title": "Updated Title", "publicationDate": "2026-02-20"}`
- **Success:** `200` - Returns the updated book object.
- **Errors:** `400` (Missing fields or `authorId` does not exist), `404` (Book not found), `500` (Server error)

#### DELETE /books/:id
- **Success:** `204` - No content.
- **Errors:** `404` (Book not found), `500` (Server error)


## Feature 2: Author CRUD Operations

### Goal
Create an `authors` collection with full CRUD operations, ensuring referential integrity (cannot delete authors who have linked books).

### Data Model
Collection: `authors`
- `id`: string, required, custom id (e.g., `a1`)
- `name`: string, required
- `birthYear`: number, required

### Routes
*(All error responses must return a JSON object format: `{"error": "Description of the error"}`)*

#### GET /authors
- **Success:** `200` - Returns JSON array of all author objects.
- **Errors:** `500` (Server error)

#### GET /authors/:id
- **Success:** `200` - Returns JSON of the matching author object.
- **Errors:** `404` (Author not found), `500` (Server error)

#### POST /authors
- **Request Body Example:** `{"id": "a4", "name": "Jane Austen", "birthYear": 1775}`
- **Success:** `201` - Returns the created author object.
- **Errors:** `400` (Missing fields, invalid data types, or duplicate `id`), `500` (Server error)

#### PUT /authors/:id
- **Request Body Example:** `{"name": "Jane Austen", "birthYear": 1775}`
- **Success:** `200` - Returns the updated author object.
- **Errors:** `400` (Missing fields or invalid data types), `404` (Author not found), `500` (Server error)

#### DELETE /authors/:id
*Relationship Constraint:* The API must query the `books` collection for any book matching `authorId`. If a match is found, abort deletion.
- **Success:** `204` - No content.
- **Errors:** 
  - `409` (Conflict) - `{"error": "Cannot delete author because they are associated with existing books."}`
  - `404` (Author not found)
  - `500` (Server error)

### Future Considerations (Identified during review)
- **Security:** Endpoints currently lack authentication. Anyone can execute DELETE methods.
- **Efficiency:** GET routes return all documents. Future iterations should implement pagination (limit/skip).