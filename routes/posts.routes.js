module.exports = app => {
    const posts = require("../controllers/Posts.Controllers")
    const { authJwt } = require("../middleware")

    var router = require("express").Router();

    router.post('/', [ authJwt.verifyToken ], posts.create);
    router.get('/', posts.findAll);
    router.put('/:id', posts.update);
    router.get('/:id', posts.findOne);
    router.delete('/', posts.deleteAll);
    router.delete('/:id', posts.deleteOne);

    
    app.use('/api/posts', router)
}