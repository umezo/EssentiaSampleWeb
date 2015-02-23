var HandleBars = require('handlebars');
var fs = require('fs');

var express = require('express');
var app = express();
app.engine('html', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    try {
      var html = HandleBars.compile(str)(options);
      fn(null, html);
    } catch(e) {
      fn(e);
    }
  });
});

app.set('views', __dirname + '/template');

// make it the default so we dont need .md
app.set('view engine', 'html');




var SC = require('node-soundcloud');
SC.init(require(__dirname+'/conf/soundcloud.json'));

app.get('/beat/detect', function (req, res) {
  console.log('beat');
  SC.get('/tracks/' + req.id , function(err,track){
    SC.get(track.stream_url,function(err,stream){
      console.log(err);
      console.log(stream);
    });
  });
});


app.get('/tracks', function (req, res) {
  SC.get('/tracks', function(err, tracks) {
    if ( err ) {
      throw err;
    } else {
      console.log('track retrieved:', tracks);
    }
    res.render('tracks.html',{tracks:tracks});
  });
});

app.listen(8080);

