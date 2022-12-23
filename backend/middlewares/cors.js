const allowedCors = [
  'http://mesto-mz.nomoredomains.club',
  'https://mesto-mz.nomoredomains.club',
  'localhost:3000',
];

module.exports.corsHandler = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
};
