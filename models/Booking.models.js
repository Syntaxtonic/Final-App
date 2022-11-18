module.exports = mongoose => {
    var bookings = mongoose.Schema({
        userId: String,
        Books: Array
    }, {timestamps: true});
    bookings.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const booking = mongoose.model("bookings", bookings)
    return booking;
}