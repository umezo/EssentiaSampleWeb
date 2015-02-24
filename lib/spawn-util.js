var spawn = require('child_process').spawn;
module.exports = function (command, args, callback, env){
  args = args || []; 

  var proc = spawn(command, args, {env: env});
  var procStdout = ''; 
  var procStderr = ''; 
  proc.stdout.on('data',function(data){
    procStdout += data;
  }); 

  proc.stderr.on('data',function(data){
    procStderr += data;
  }); 

  proc.on('close', function(code){
    if (code !== 0) {
      callback(new Error('Error on ' + command +':'+ args.toString()),
               procStdout,
               procStderr);
    } else {
      callback(null, procStdout, procStderr);
    }   
  }); 
};
