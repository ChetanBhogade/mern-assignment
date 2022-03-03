const User = require("./userModel");

exports.fetchAllUsers = (req, res) => {
  User.find().exec((error, users) => {
    if (error || !users) {
      return res.status(400).json({
        error: "No Users in the DB",
      });
    }
    res.json({
      result: users,
    });
  });
};

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }
    req.user = user;
    next();
  });
};

exports.fetchSingleUser = (req, res) => {
  const user = req.user;
  return res.json({
    result: "User Found",
    data: user,
  });
};

exports.addUser = (req, res) => {
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Not able to save user in DB",
      });
    }
    res.json(user);
  });
};

exports.updateUser = (req, res) => {
  const user = req.user;
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;

  user.save((error, updatedUser) => {
    if (error || !updatedUser) {
      return res.status(400).json({
        error: "Failed to update the user",
      });
    }
    res.json({
      message: "User data updated successfully",
      data: updatedUser,
    });
  });
};

exports.removeUser = (req, res) => {
  const user = req.user;
  user.remove((error, removedUser) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete the user",
      })
    }
    return res.json({
      message: "Deleted Successfully", 
      removedUser
    })
  })
}