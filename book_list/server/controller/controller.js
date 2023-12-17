var BookDb = require("../model/model");

// create and save new book
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // new book
  const newBook = new BookDb({
    book: req.body.book,
    author: req.body.author,
    genre: req.body.genre,
    year: new Date(req.body.year),
    isbn: req.body.isbn,
  });
  // save book in the database
  newBook
    .save()
    .then((data) => {
      //res.send(data)
      res.redirect("/add-book");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

// retrieve and return all books/ retrieve and return a single book
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    BookDb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found book with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving book with id " + id });
      });
  } else {
    BookDb.find()
      .then((book) => {
        res.send(book);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retrieving book information",
        });
      });
  }
};

// Update a new identified book by book id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  BookDb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update book with ${id}. Maybe book not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update book information" });
    });
};

// Delete a book with specified book id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BookDb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "book was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete book with id=" + id,
      });
    });
};
