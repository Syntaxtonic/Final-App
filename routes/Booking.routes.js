const { authJwt } = require("../middleware"); 
const controller = require("../controllers/Booking.Controllers");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // app.get("/api/test/all", controller.allAccess);
    app.post("/api/booking", [authJwt.verifyToken], controller.create);
};