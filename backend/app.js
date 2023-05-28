require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const errorCelebrate = require('celebrate').errors;
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const { ERROR_INTERNAL_SERVER } = require('./utils/constants');
const { PORT, MONGODB } = require('./config');
const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');

const app = express();
mongoose.connect(MONGODB);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Ещё чуть-чуть и сервер упадёт');
  }, 0);
});

app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(requestLogger); // подключаем логгер запросов
app.use('/', router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errorCelebrate());
app.use(handlerErrors);

app.use((err, req, res, next) => {
  const { statusCode = ERROR_INTERNAL_SERVER, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_INTERNAL_SERVER ? 'Ошибка на сервере' : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
