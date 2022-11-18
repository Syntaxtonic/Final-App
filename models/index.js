const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.models");
db.role = require("./role.models");
db.products = require("./Book.Models") (mongoose);
db.posts = require ("./posts.models")(mongoose);
db.bookings = require("./Booking.models")(mongoose)
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;