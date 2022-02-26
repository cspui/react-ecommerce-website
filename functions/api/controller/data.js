const admin = require("firebase-admin");

exports.a = (req, res) => {
  res.send(`here is /api/api`);
};

exports.b = (req, res) => {
  res.send(`here is /api/data`);
};

exports.signup = async (req, res) => {
  const { uid, fname, lname, email } = req.body;

  console.log('signup', req.body);

  try {
    await admin.firestore().collection("User").doc(uid).set({
      fname,
      lname,
      email,
    });

    res.send({
      status: "success",
      message: "success",
    });
  } catch (e) {
    console.log(e);

    res.send({
      status: "error",
      message: e,
    });
  }

  // res.send(`here is /api/data`);
};

exports.redirectBack = (req, res) => {
  res.redirect("back");
};
