
const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance');
const port = 80;

//mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    desc: String,
    age: Number,
  });

var contact = mongoose.model('contact', contactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var mydata=new contact(req.body)
    mydata.save().then(()=>{
        res.send("Item saved to database")
    }).catch(()=>{
        res.statusCode(404).send("Couldn't save")
    })
    // res.status(200).render('contact.pug', params);
})



app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
