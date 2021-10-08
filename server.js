const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://aleksandra:4815162342Aug@cluster0.z9sqb.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(db)
  .then((res) => console.log('Connected to database'))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${PORT}...`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.use(postRoutes);
app.use(contactRoutes);

app.use((req, res) => {
  const title = 'Error Page';
  res
  .status(404)
  .render(createPath('error'), { title });
});