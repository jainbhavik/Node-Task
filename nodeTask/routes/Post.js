var express = require('express');
var router = express.Router();

// sorting 
router.get('/sort', function(req, res, next) {

 db.Post.findAll({ limit: 10, order: [['updatedAt', 'DESC']]
}).then(post => {

  if(post) {
    
       res.status(200).send({ post: post, success: true, message: 'list of posts in sorted order'})
     
   } 
   else {
       res.status(400).send({ success: false, error: true })
     }  
}).catch(err => {
  res.status(500).send('Error -> ' + err);
})
});

//filtering based on tittle

router.get('/filter', function(req, res, next) {

  db.Post.findAll({ 
    where: {
      tittle: {
        [Op.substring]: req.body.tittle}
    }
 }).then(post => {
 
   if(post) {
     
        res.status(200).send({ post: post, success: true, message: 'list of posts in sorted order'})
      
    } 
    else {
        res.status(400).send({ success: false, error: true })
      }  
 }).catch(err => {
   res.status(500).send('Error -> ' + err);
 })
 }); 

module.exports = router;
