const admin = require("firebase-admin");

exports.a = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.send(`here is /api/api`);
};

exports.b = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.send(`here is /api/data`);
};

exports.signup = async (req, res) => {
  const { fname, lname, email, password } = req.body;

  console.log(req);

  const user = {
    fname,
    lname,
    email,
    password,
  };

  try {
    // admin
    //   .auth()
    //   .createUser(user)
    //   .then((userRecord) => {
    //     // res.status(200).send(userRecord);
    //   });

    await admin.firestore().collection("User").add({
      fname,
      lname,
      email,
      password,
    });

    return {
      status: "success",
      message: "success",
    };
  } catch (e) {
    console.log(e);

    return {
      status: "error",
      message: e,
    };
  }

  // res.send(`here is /api/data`);
};

exports.redirectBack = (req, res) => {
  res.redirect("back");
};
