const db = require("../models")
const Post = db.posts


exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({message: "Content of the product cannot be empty"});
        return;
    }
  
    console.log(req.body.title)
    // Create
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      username: req.username,
      reviews: req.body.reviews,
    });
  
    console.log(post)
  
    post.save(post).then(data => {
          console.log(data)
          res.send(data)
      }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the product"
          });
    });
  };


// exports.create = (req, res) => {
//   if(!req.body.title){
//       res.status(400).send({message: "Content of the post cannot be empty"});
//       return;
//   }

//   console.log(req.body.title)
//   // Create
//   const posts = new Post({
//     title: req.body.title,
//     description: req.body.description,
//     category: req.body.category,
//     image: req.body.image,
//   });

//   console.log(posts)

//   posts.save(posts).then(data => {
//         console.log(data)
//         res.send(data)
//     }).catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the posts"
//         });
//   });
// };
exports.findAll = (req, res) => {
    const title = req.query.title;

    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"} } : {};

    posts.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriveing posts"
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Posts.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Didn't find Post with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Posts with id=" + id });
      });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  posts.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Post with id=${id}. Perhaps Post was not created!`
        });
      } else res.send({ message: "Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the Post with id=" + id
      });
    });
};

exports.deleteOne = (req, res) => {
  const id = req.params.id;

  posts.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Posts with id=${id}. Perhaps Posts was not created!`
        });
      } else {
        res.send({
          message: "Posts was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Posts with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    posts.deleteMany({})
      .then(data => {
        res.send({
          message:` ${data.deletedCount} Posts were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all posts."
        });
      });
};

