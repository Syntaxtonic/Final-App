module.exports = app => {
    const products = require("../controllers/Book.controllers")

    var router = require("express").Router();

    router.post('/', products.create);
    router.get('/', products.findAll);
    router.put('/:id', products.update);
    router.get('/:id', products.findOne);
    router.delete('/', products.deleteAll);
    router.delete('/:id', products.deleteOne);

    
    app.use('/api/products', router)
}