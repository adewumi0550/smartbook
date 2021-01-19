const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})
require('./config/passport')(passport)
connectDB()
const app = express();

if (process.env.NODE_ENV==='development') {
    app.use(morgan('dev'))
}

//Handle Bars 
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
   

//passport Middleware
app.use(passport.initialize())
app.use(passport.session())
//Statics Folder
app.use(express.static(path.join(__dirname, 'public')))
//Routes  
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`))