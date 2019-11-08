const express = require('express')
const logger = require('../src/logger')
const bodyParser = express.json();
const bookmarks = require('../src/store')
const bookmarkRouter = express.Router();

bookmarkRouter
  .route('/')
  .get((req, res) =>{
    res
    .json(bookmarks)
  })
//need to finish writing endpoints for post delete and update here.REMEMBER TO VALIDATE 

module.exports = bookmarkRouter