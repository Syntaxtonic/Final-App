const db = require("../models")
const books = db.books

exports.create = (req, res) => {
  if(!req.body.title){
      res.status(400).send({message: "Content of the product cannot be empty"});
      return;
  }

  console.log(req.body.title)
  // Create
  const book = new book({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
  });

  console.log(books)

  book.save(books).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the product"
        });
  });
};
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    books.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing products"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    books.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Product with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Products with id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  books.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not created!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the Product with id=" + id
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  books.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not created!`
        });
      } else {
        res.send({
          message: "Product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    books.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} Product were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Product."
        });
      });
};

