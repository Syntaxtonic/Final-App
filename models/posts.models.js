module.exports = mongoose => {
    var posts = mongoose.Schema({
        username: String,
        title: String,
        description: String,
        reviews: String,
    }, {timestamps: true});
    posts.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Post = mongoose.model("Post", posts)
    return Post;
    // const post = mongoose.models ("posts", posts)
    // return post;
}