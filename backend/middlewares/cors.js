const allowedCors = [
  'https://pr15.nomoredomains.rocks',
  'http://pr15.nomoredomains.rocks',
  'https://api.pr15.nomoredomains.rocks/users/me',
  'https://api.pr15.nomoredomains.rocks/cards',
  'https://api.pr15.nomoredomains.rocks/signup',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://51.250.104.105',
  'http://51.250.104.105',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
if (method === 'OPTIONS') {
  // разрешаем кросс-доменные запросы любых типов (по умолчанию)
  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
// завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
