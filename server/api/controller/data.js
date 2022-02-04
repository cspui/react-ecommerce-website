
exports.a = (req, res) => {
  res.send(`here is /api/api`);
};

exports.b = (req, res) => {
  res.send(`here is /api/data`);
};

exports.c = (req, res) => {
//   res.send(`here is /api/`);
  res.redirect('back');
};
