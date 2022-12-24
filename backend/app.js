const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const { errors } = require('celebrate');
const { errHandler } = require('./middlewares/err-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов
mongoose.connect('mongodb://localhost:27017/mestodb');

const allowedCors = [
  'http://mesto-mz.nomoredomains.club',
  'https://mesto-mz.nomoredomains.club',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end(); // завершаем обработку запроса и возвращаем результат клиенту
  }
  next();
});

// const corsOptions = {
//   origin: allowedCors,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 204,
//   credentials: true,
// };

// app.use(cors(corsOptions));

app.use('/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => errHandler(err, req, res, next));

app.listen(PORT, () => {
  console.log('Всё ок');
});

// // app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// app.use((req, res, next) => {
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     console.log(origin);
//     console.log(req.headers);
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   next();
// });
