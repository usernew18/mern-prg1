const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "Book One", author: "Author A", price: 200, qty: 5 },
  { id: 2, title: "Book Two", author: "Author B", price: 300, qty: 3 }
];


app.get('/books', (req, res) => {
  res.json(books);
});


app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  book ? res.json(book) : res.status(404).send("Book not found");
});

app.post('/books', (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    qty: req.body.qty
  };
  books.push(book);
  res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send("Book not found");

  book.title = req.body.title;
  book.author = req.body.author;
  book.price = req.body.price;
  book.qty = req.body.qty;

  res.json(book);
});

app.patch('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send("Book not found");

  if (req.body.price) book.price = req.body.price;
  if (req.body.qty) book.qty = req.body.qty;

  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.send("Book deleted successfully");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
