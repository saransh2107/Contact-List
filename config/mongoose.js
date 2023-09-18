//required the library
const mongoose=require('mongoose');

//connect to database
let password="Gink2109#";
let url="mongodb+srv://saranshbatham:admin@atlascluster.7rb2rc9.mongodb.net/nodeJs?retryWrites=true&w=majority";
mongoose.connect(url);

//acquire the connection to check if it is successfull or not
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,"Error connecting to DB"));

//up and runnning
db.once('open',function(){
    console.log("Successfully connected to DB")
})

//mongodb+srv://saranshbatham:Gink2109#@atlascluster.7rb2rc9.mongodb.net/nodeJs?retryWrites=true&w=majority