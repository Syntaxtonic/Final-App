module.exports = mongoose => {
    var products = mongoose.Schema({
        title: String,
        description: String,
        category: String,
        image: String,
        quantity:{
            type: Number,
            defaul: 1
        }
    }, {timestamps: true});
    products.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Product = mongoose.model("Products", products)
    return Product;
}