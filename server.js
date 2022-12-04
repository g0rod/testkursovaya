const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const uslugi = require('./models/uslugi.js');
const Call = require('./models/callme.js');

const app = express();
app.set('view engine', 'ejs'); //подключаем шаблонизатор

const PORT = 3000;

const db = 'mongodb+srv://gorod:testforkursovaya@cluster0.fo5jjnw.mongodb.net/node-callback?retryWrites=true&w=majority';

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(function(req, res, next){
  console.log(req.method); //метод запроса
  console.log(req.url); //url-адрес
  console.log(req.headers); //заголовки
  next();
});

app.use(express.static('public'));

//Обработка запроса на передачу браузеру значка сайта (favicon)
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Определение папки для статических ресурсов сайта

app.use(express.static('styles'));


app.get('/', (req, res) => {
    const title = 'Главная';
  res.render(createPath('index'), {title});
});

  app.get('/prices', (req, res) => {
    const title = 'Услуги и цены';
 //   const uslugi = [
  //    { usluga: 'моча', price: '1000' },
  //   { usluga: 'Twitter', price: 'http://github.com/YauhenKavalchuk' },
   //   { usluga: 'GitHub', price: 'http://twitter.com/YauhenKavalchuk' },
  //  ];
  //  res.render(createPath('prices'), { uslugi, title });
 uslugi
  .find()
  .then((uslugi) => res.render(createPath('prices'), { uslugi, title }))
  .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
  });

  app.get('/reception', (req, res) => {
    const title = 'Запись';

    uslugi
  .find()
  .then((uslugi) => res.render(createPath('reception'), { uslugi, title }))
  .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
  });

   

  app.get('/call', (req, res) => {
  const title = 'Звонок';
  res.render(createPath('call'), {title});
  const { call_name, call_phone } = req.body;
  const call = new Call({ call_name, call_phone });
  call
    .save()
    .then((result) => res.send(result))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    })
});
 



//app.get('/rec', (req, res) => {
//res.redirect('/reception');
//});

app.use((req, res) => {
    const title = 'Error';
  res
    .status(404)
    .render(createPath('error'), {title});
});