var express = require('express');
var router = express.Router();
var readline = require('linebyline');

/* GET home page. */
router.get('/', async function  (req, res, next) {
  const rl = readline('./gallery.txt');
  const gallery = [];
  rl.on('line', function(line, lineCount, byteCount) {
    // do something with the line of text
    const [name, url] = line.split(",");
    gallery.push({name,url});
  })
  .on('error', function(e) {
    res.render('index',{title: 'Gallery', gallery: [], hero:{}});
    // something went wrong
  }).on('end', function(line, lineCount, byteCount){
    res.render('index', { title: 'Gallery', gallery, hero: gallery[0]}); 
  });
  
});
router.post('/image', async function  (req, res, next) {
  const rl = readline('./gallery.txt');
  const gallery = [];
  rl.on('line', function(line, lineCount, byteCount) {
    // do something with the line of text
    const [name, url] = line.split(",");
    gallery.push({name,url});
  })
  .on('error', function(e) {
    res.render('index',{title: 'Gallery', gallery: [], hero:{}});
    // something went wrong
  }).on('end', function(line, lineCount, byteCount){
    const name = req.body['selectedName'];
    const hero = gallery.find((g) => g.name === name)
    res.render('index', { title: 'Gallery', gallery, hero}); 
  });
  
});

module.exports = router;