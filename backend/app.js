const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { errHandler } = require('./middlewares/err-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов
mongoose.connect('mongodb://localhost:27017/mestodb');

const corsOptions = {
  origin: ['http://mesto-mz.nomoredomains.club', 'http://mesto-mz.nomoredomains.club', 'localhost:3000'],
};
app.use(cors(corsOptions));

app.use('/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => errHandler(err, req, res, next));

app.listen(PORT, () => {
  console.log('Всё ок');
});
