const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Данные введены неверно');
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id');
      }
      next(err);
    });
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.CardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Невалидный id');
    }
    next(err);
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    return res.status(200).send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Невалидный id');
    }
    next(err);
  });

module.exports = {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
