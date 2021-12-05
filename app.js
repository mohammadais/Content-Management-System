import express, { static } from 'express';
const app = express();
import { join } from 'path';
import exphbs from 'express-handlebars';
import { set, Promise, connect } from 'mongoose';
import { urlencoded, json } from 'body-parser';
import methodOverride from 'method-override';
import upload from 'express-fileupload';
import session from 'express-session';
import flash from 'connect-flash';
import { mongoDbUrl } from './config/config';
import { initialize, session as _session } from 'passport';

//Load Routes
import home from './routes/home/index';
import admin from './routes/admin/index';
import posts from './routes/admin/posts';
import categories from './routes/admin/categories';
import comments from './routes/admin/comments';
import profile from './routes/admin/profile';

set('useCreateIndex', true);
set('useFindAndModify', false);

Promise = global.Promise;

connect(mongoDbUrl)
  .then((db) => {
    console.log('MONGO CONNECTED');
  })
  .catch((error) => console.log('not connected'));

app.use(static(join(__dirname, 'public')));

import { select, generateTime, paginate } from './helpers/handlebars-helpers';

import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
const insecureHandlebars = allowInsecurePrototypeAccess(Handlebars);

app.engine(
  'handlebars',
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { select: select, generateTime: generateTime, paginate: paginate }
  })
);
app.set('view engine', 'handlebars');

//to upload files
app.use(upload());

//Body parser
app.use(urlencoded({ extended: false }));
app.use(json());

//session
app.use(
  session({
    secret: 'adil',
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

app.use(initialize());
app.use(_session());

// local variables using middleware
app.use((req, res, next) => {
  res.locals.user = req.user || null;

  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
});

//method-overrides
app.use(methodOverride('_method'));

//use Routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);
app.use('/admin/comments', comments);
app.use('/admin/profile', profile);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
