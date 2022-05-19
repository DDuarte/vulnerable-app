var router = require("express").Router();
var path = require("path");
var mongoose = require("mongoose");
var User = mongoose.model("User");

const rootDir = path.resolve(__dirname, "..");

router.use("/api", require("./api"));

// static files
router.get(/\/(public)/, (req, res) => {
  res.sendFile(path.join(rootDir, req.originalUrl));
});

router.get("/", function (req, res) {
  var search = req.query.search || "N/A";

  var obj = {};
  if (req.query.search)
    obj["username"] = { $regex: req.query.search, $options: "i" };

  User.find(obj).exec(function (err, users) {
    return res.render("users", {
      users: users,
      title: "Users",
      header: "Some users",
      search: search,
    });
  });
});

module.exports = router;
