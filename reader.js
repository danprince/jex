var fs = require('fs');

module.exports = {
  readFile: readFile
};

function readFile(file, done, error) {
  var stream, contents;

  stream = fs.createReadStream(file);
  contents = '';

  stream.on('data', function(buffer) {
    contents += buffer.toString();
  });

  stream.on('end', function() {
    done(contents);
  }); 

  if(typeof error !== 'undefined') {
    stream.on('error', error);
  }
}

