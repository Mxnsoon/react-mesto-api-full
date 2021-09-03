# Проектная работа react-mesto-api-full

Ссылка на сайт: https://mxnsoon.practice.nomoredomains.icu/
Ссылка на бэкенд: https://api.mxnsoon.practice.nomoredomains.icu/
Публичный IP-адрес сервера: 178.154.204.201

## Описание:
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`

## Функционал:
- Если в любом из запросов что-то идёт не так, сервер возвращает ответ с ошибкой и соответствующим ей статусом
- Все запросы и ответы записываются в файл request.log.
- Все ошибки записываются в файл error.log.
- После GET-запроса на URL /crash-test сервер самостоятельно восстанавливается и продолжает принимать другие запросы.
- Регистрация и авторизация
- На странице отрисовывается информация о пользователе и карточке.
- Модальные окна открываются при нажатии на соответствующий элемент интерфейса.
- Модальные окна закрываются при нажатии на иконку закрытия.
- Работа модальных окон настроена: есть возможность редактировать аватар и профиль, добавлять новую карточку.
- В форму редактирования профиля подставляются текущие данные.
- Реализовано добавление/удаление лайка.
- Реализовано удаление собственной карточки.
- Все локальные значения корректно обновляются.

## Пакеты, которые используются в сборке:

### Front-end:

- React, React-dom и внутренние библиотеки

### Back-end:

- [Eslint](https://github.com/eslint/eslint)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/)
- [bodyparser](https://github.com/expressjs/body-parser)
- [celebrate](https://github.com/arb/celebrate)
- [cors](https://github.com/expressjs/cors)
- [dotenv](https://github.com/motdotla/dotenv)
- [express](https://github.com/expressjs/express)
- [winston](https://github.com/winstonjs/winston)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mongoose](https://github.com/Automattic/mongoose)
- [validator](https://github.com/validatorjs/validator.js/)
  
