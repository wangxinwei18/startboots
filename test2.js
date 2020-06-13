const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

BlogPost.find({
    title: `The Mythbuster's Guide to Saving Money on Energy Bills`
    }, (error, blogpost) =>{
          console.log(error, blogpost)
        })