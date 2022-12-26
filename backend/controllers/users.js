const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else {
        res.send(
          {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
          },
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            name, about, avatar, email, password: hash,
          }))
          .then((newUser) => res.status(201).send(
            {
              name: newUser.name,
              about: newUser.about,
              avatar: newUser.avatar,
              _id: newUser._id,
            },
          ))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
            } else {
              next(err);
            }
          });
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, вернётся ошибка
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else {
        res.send(
          {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          },
        );
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: false, // если пользователь не найден, вернётся ошибка
    },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с несуществующим в БД id'));
      } else {
        res.send(
          {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            _id: user._id,
          },
        );
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неправильные почта или пароль'));
      } else {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              // хеши не совпали — отклоняем промис
              next(new UnauthorizedError('Неправильные почта или пароль'));
            } else {
              // аутентификация успешна
              const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
              res
                .cookie('jwt', token, {
                  // token - наш JWT токен, который мы отправляем
                  maxAge: 3600000,
                  httpOnly: true,
                  secure: true,
                  sameSite: 'None',
                })
                .send(user)
                .end();
            }
          });
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с указанным _id не найден'));
      } else {
        res.send(
          {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          },
        );
      }
    })
    .catch(next);
};
