const doExec = require('node-spawn-util');
module.exports = function(path,sound,json,callback){
  doExec('python',[__dirname+'/beats.py',path,sound,json],function(err,stdout,stderr){
    if (err) {
      callback({err:err,stdout:stdout,stderr:stderr});
      return;
    }
    callback(null);
  });
};
