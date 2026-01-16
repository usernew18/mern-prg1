const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// In-memory data
let books = [
  { id: 1, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 25.00, quantity: 10 },
  { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', price: 15.50, quantity: 5 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 10.00, quantity: 7 }
];

// GET all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) res.status(200).json(book);
  else res.status(404).send("Book not found");
});

// POST new book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    quantity: req.body.quantity
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PATCH
app.patch('/books', (req, res) => {
  res.send("In PATCH method");
});

// PUT
app.put('/books', (req, res) => {
  res.send("In PUT method");
});

// DELETE book
app.delete('/books/:id', (req, res) => {
  const len = books.length;
  books = books.filter(b => b.id !== parseInt(req.params.id));
  if (books.length === len)
    return res.status(404).json({ message: 'Book not found' });
  res.status(200).json({ message: 'Book deleted successfully' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
