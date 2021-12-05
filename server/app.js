const express = require('express');
const env = require('dotenv');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Authorization, Accept");
    next();
  });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


  

env.config();

var authRoute = require('./routes/auth');
var adminAuthRoute = require('./routes/admin/auth');
var categoryRoute = require('./routes/category');
var productRoute = require('./routes/product');
var cartRoute = require('./routes/cart');
var initialDataRoute = require('./routes/admin/initialData')
var rzpRoute = require('./routes/payment')

app.use('/api/auth', authRoute);
app.use('/api/admin',adminAuthRoute);
app.use('/api/category',categoryRoute );
app.use('/api/product', productRoute);
app.use('/api', cartRoute);
app.use('/api', initialDataRoute)
app.use('/api', rzpRoute)
   // Require static assets from public folder

//mongodb connection string
//mongodb+srv://rakesh:<password>@cluster0.0rsnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.0rsnr.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
     {
         useNewUrlParser: true, 
         useUnifiedTopology: true,
         useCreateIndex: true
        }
        ).then(() =>{
            console.log("database connected");
        })


 app.listen(process.env.PORT, () =>{
     console.log(`Server is running on port ${process.env.PORT}`);    
 });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'uploads')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
  
  

 module.exports = app;