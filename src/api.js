const express = require('express');
require('express-async-errors');
const { errorMiddleware } = require('./middlewares');
const routes = require('./routes');

// ...

const app = express();

app.use(express.json());

app.use('/login', routes.loginRoute);
app.use('/user', routes.userRoute);
app.use('/categories', routes.categoriesRoute);
app.use('/post', routes.postRoute);

app.use(errorMiddleware);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
