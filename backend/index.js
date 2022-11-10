//docker start mysql-container
//docker exec -it mysql-container bash
//mysql --user=root --password
const express = require('express');
const userRoutes = require('./routes/user' );
const { createModelsMiddleware  } = require('./middleware/model-middleware' );
const app = express();
const port = 3000;
app.use(createModelsMiddleware );
app.get('/health', (request, response, next) => {
   const responseBody = { status: 'up', port };
   response.json(responseBody);
   // next() is how we tell express to continue through the middleware chain
   next();
});
app.use('/users', userRoutes);
app.listen(port, () => {
   console.log(`This app is listening on port  ${port}`);
});