const express = require('express');
const path = require('path');
const port = 8000;
let alert=require('alert');
const db = require('./config/mongoose');


const Contact = require('./models/contact');


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

// //middleware-1
// app.use(function(req,res,next){
//     req.myName="Saru"
//    // console.log("Middleware 1 Called")
//     next();
// })
// //middleware-2
// app.use(function(req,res,next){
//     console.log(req.myName)
//    // console.log("Middleware 2 Called")
//     next();
// })

app.use(express.static(__dirname + '/assets'));


//List to store the contacts
var contactList = [];

//Get method to display contacts from DB
app.get('/', function (req, res) {
    Contact.find({
    }).then(contacts => {
        return res.render('home', {
            title: "Contact List",
            contact_List: contacts
        });
    }).catch(err => {
        console.log(err);
    })
});

//Practise method; No Relation to DB
app.get('/practise', function (req, res) {
    return res.render('practise', {
        title: "Playground"
    })
})

//Post method to add a contact in DB
app.post('/create-contact', function (req, res) {

    // contactList.push(req.body)
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then(user => {
        console.log(user);
        alert('Created Successfully');
        return res.redirect('back');
    }).catch(err => {
        console.log(err);
    })
})


//Delete method to delete from DB
app.get('/delete-contact/', function (req, res) {
    //Get the id from query in the url
    let id=req.query.id;
    console.log(id);

    //Find the contact in the DB using Id and delete it
    Contact.findByIdAndDelete(id).then(success => {
        console.log("Deleted Contact",success)
        return res.redirect('back');
    }).catch(err => {
        console.log(err);
    });
    
})


app.listen(port, function (err) {
    if (err) {
        console.log("Error in running server", err);
    }
    console.log("Express running on", port);
})







