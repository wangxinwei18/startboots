const express = require('express')
// const path = require('path')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const BlogPost = require('./models/BlogPost.js')
const fileUpload = require('express-fileupload')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const logoutController = require('./controllers/logout')

const validateMiddleware = require("./middleware/validateMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const flash = require('connect-flash');

app.use(fileUpload())
app.use(flash());

// mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://wxxwxx:abcdef1234@cluster0-21gh5.mongodb.net/my_database')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
app.use(express.static('public'))
// this is for local test 
// app.listen(4000, ()=>{
//     console.log('App listening on port 4000 ...')
// })
// this is for web test 
let port = process.env.port;
if (port == null || port == "") {
    port = 4000;
}
// this is for web test
app.listen(port, ()=>{
    console.log('App listening...')
})

app.use('/posts/store',validateMiddleware)
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
                      
app.get('/posts/new',authMiddleware, newPostController)
app.get('/',homeController)
app.get('/post/:id',getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController) 
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController) 
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));
// const validateMiddleWare = (req,res,next)=>{
//     if(req.files == null || req.body.title == null){
//         return res.redirect('/posts/new')
//     }
//     next()
// }


// app.get('/', async (req, res) => {
//     const blogposts = await BlogPost.find({})
//     res.render('index', {
//         blogposts
//     });
// })

// app.get('/about', (req, res) => {
//     res.render('about');
// })

// app.get('/contact', (req, res) => {
//     res.render('contact');
// })

// app.get('/post', (req, res) => {
//     res.render('samplePost');
// })


// app.get('/post/:id',async (req,res)=>{
//     const blogpost = await BlogPost.findById(req.params.id)
//     res.render('post',{
//         blogpost
//     });
// })

// app.get('/posts/new', (req, res) => {
//     res.render('create');
// })




// app.post('/posts/store', async (req, res) => {
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname, 'public/img', image.name),
//         async (error)=> {
//             // model creates a new doc with browser data
//             await BlogPost.create({
//                 ...req.body,
//                 image: '/img/' + image.name
//             })
//             res.redirect('/')
//         })
// })
