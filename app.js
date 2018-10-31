const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
var   exphbs  = require('express-handlebars');
const bodyparser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
//invoking express
const app = express(); 
//load routes
const ideas = require('./routes/ideas')
const users = require('./routes/users')
const port = process.env.PORT | 3010;
//passport config

require('./config/passport')(passport);



//Map global promise - get rid of warning

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/Hackernews',{
    useNewUrlParser: true
})
.then(() => console.log('mongoDB connected...'))
.catch(err => console.log(err));

mongoose.Promise = global.Promise;

//load idea model

require("./models/Idea");
const Idea = mongoose.model('ideas')

//handlebar middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

//Method override middleware
app.use(methodOverride('_method'))

//express-session connect-flash middsleware

app.use(session({
    secret:'keyboard cat',
    resave:true,
    saveUninitialized:true

}))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

//global variables
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next()
})

//how middleware works
app.use((req,res,next)=>{
   // console.log(Date.now())
     req.name="DOM LOADED"
     console.log(req.name)
    next() 
})
//index route 
app.get('/',(req,res)=> {
   // res.send(req.name)
   // console.log(req.name)
   const title = "welcome to Hacker news"
   res.render('index',{title: title})
})

//about route
app.get('/About',(req,res)=>{
    res.render('about')
})

app.use('/ideas',ideas)
app.use('/users',users)




 
app.listen(port,()=>{
    console.log(`port started on ${port}`)
})
