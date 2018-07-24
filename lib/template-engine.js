const HandleBars = require('handlebars');
const fs = require('fs');

module.exports = function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    try {
      const html = HandleBars.compile(str)(options);
      fn(null, html);
    } catch(e) {
      fn(e);
    }
  });
};
