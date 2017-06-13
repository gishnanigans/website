

function maplink (){
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(file => {
      if (files[file].path) {
        files[file].url = files[file].path.replace(/\.md$/, '.html'); // '/'
      }
    });
  };
}
