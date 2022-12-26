require('dotenv').config();
console.log(process.env);
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errHandler } = require('./middlewares/err-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsHandler } = require('./middlewares/cors-handler');

const { PORT = 3000 } = process.env;
const app = express();
app.use((req, res, next) => corsHandler(req, res, next));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => errHandler(err, req, res, next));

app.listen(PORT, () => {
  console.log('Всё окей');
});
