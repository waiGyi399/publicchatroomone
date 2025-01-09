import express from 'express';

//=>Express server setup

const exapp = express();

exapp.use(express.static('dist'));//server static files from the public folder

// start the Express server

exapp.listen(8001,()=>{
    console.log("server is working"); //https://localhost:8001
});