const express = require('express');
const app = express();
const apiRoute = require('./routes/api');
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));


app.use('/api', apiRoute);

//app.use(notFound);
//app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
