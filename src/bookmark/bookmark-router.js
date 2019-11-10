const express = require('express')
const logger = require('../logger')
const bodyParser = express.json();
const bookmarks = require('../store')
const bookmarkRouter = express.Router();
const uuid = require('uuid/v4')

bookmarkRouter
  .route('/bookmarks')
  .get((req, res) =>{
    res
    .json(bookmarks)
    console.log('We HERE!')
  })
  .post(bodyParser, (req, res)=>{

    const {title, url, rating, desc } = req.body;

    if(!title){
      logger.error(`Title is required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    if(!url){
      logger.error(`URL is required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    if(!rating || rating > 5 || rating < 0 ){
      logger.error(`Rating between 0 and 5 is required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    if(!desc){
      logger.error(`Description is required`);
      return res
        .status(400)
        .send('Invalid data');
    }

    const id = uuid();

    const bookmark = {
      id, 
      title,
      url,
      rating,
      desc
    }

    bookmarks.push(bookmark)

    logger.info(`Card with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);

  })
  
//need to finish writing endpoints for post delete and update here.REMEMBER TO VALIDATE 
bookmarkRouter
  .route('/bookmarks/:id')
  .get((req, res) =>{
    //need to pull the id out of the request

    const { id } = req.params;

    const bookmark = bookmarks.find(b => b.id == id)

    if (!bookmark){
      logger.error(`Bookmark with id ${id} not found.`)
      return res
        .status(404)
        .send(`Card Not Found`)
    }

    res.json(bookmark)

  })
  .delete((req, res) => {
    
    const { id } = req.params;

    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

    if(bookmarkIndex === -1){

      logger.error(`Card with id ${id} not found`);

      return res
        .status(404)
        .send(`Bookmark Not found`)
    }

    bookmarks.splice(bookmarkIndex, 1)

    logger.info(`Bookmark with id ${id} deleted`)

    res
      .status(204)
      .end()
  })
module.exports = bookmarkRouter