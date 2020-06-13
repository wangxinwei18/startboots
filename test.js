const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});

BlogPost.create({
    title: `The Mythbuster's Guide to Saving Money on Energy Bills`,
    body: `If you have been here a long tim, you might remember when I pie
    went on ITV Tonight to dispence a masterclass in saving money on energy bills. 
    Energy-saving is one of my favourite mony topics, because once you get past
     the boring bullet-point lists, a whole new of world of thrifty them everything
      at this time of year. They go like this:`
    }, (error, blogpost) =>{
          console.log(error, blogpost)
        })