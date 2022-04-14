const { request, response } = require('express');
const RegModel =require('../Model/Tags.Model');


exports.index=(req,res)=>{
    console.log("Hello");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}