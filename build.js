
'use strict';

const
    Metalsmith  = require('metalsmith'),
    handlebars  = require('handlebars'),
    drafts      = require('metalsmith-drafts'), // branch to archives page
    collections = require('metalsmith-collections'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
    nested      = require('metalsmith-nested'),
    permalinks  = require('metalsmith-permalinks'),
    // helpers     = require('metalsmith-register-helpers'),
    less        = require('metalsmith-less');


function maplink (){
  return function(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(file => {
      if (files[file].path) {
        files[file].url = files[file].path.replace(/\.md$/, '/'); // .html
      }
    });
  };
}

function loadYaml (datapath) {
  const
    yaml = require('js-yaml'),
    path  = require('path'),
    fs    = require('fs');
  
  return function (files, metal, done) {
    // let metadata = metal.metadata();
    // console.log('METADATA', metadata)
    Object.keys(files).forEach(file => {
      let
        datafile,
        source,
        data;
      
      if (files[file].data) {
        datafile = files[file].data;
        datapath = `${datapath}/${datafile}`;
      }
      else {
        return;
      }
      
      if (!fs.existsSync(datapath)) {
        throw new Error(`globaldata error: could not find data file (${datapath}) at location (${path.resolve(datapath)}`);
      }
      
      source = fs.readFileSync(datapath);
      
      try {
        data = yaml.safeLoad(source, 'utf8');
      } catch (e) {
        return done(new Error('globaldata error: malformed data in "' + datafile + '"'));
      }
      
      files[file].data = data;
    });
    
    done();
  };
}


handlebars.registerHelper('ifequals', function(val1, val2, options) {
  // console.log(val1, val2)
  var equals = false;
  if (val1 === val2) {
    equals = true;
  }
  else if (val1 instanceof Array && val1.indexOf(val2) > -1) {
    equals = true;
  }
  else if (val2 instanceof Array && val2.indexOf(val1) > -1) {
    equals = true;
  }
  if(equals) {
    return options.fn(this);
  }
  return options.inverse(this);
});


function expose() {
  return function (files, metal, done) {
    setImmediate(done);
    
    Object.keys(files).forEach(file => {
      if (! /md/.test(file)) return
      // console.log(file, files[file])
      // console.log('path', files[file].path, files[file].url)
      // console.log(files[file].path, files[file].collection.toString())
      // console.log(file, files[file].contents.toString())
    });
    
    // console.log('ITEMS',files['items.md'], files['items.md'].contents.toString());
    // console.log('TEAM',files['team.md']);
  };
}


Metalsmith(__dirname)
  .source('source')
  .destination('publish')
  
  .metadata({
    site: 'Gishnanigangs Splendiferous',
    base: 'http://localhost:8887/gishnanigans/publish/'
    // base: 'http://localhost:3000'
  })
  
  .use(less())
  
  // .use(helpers({
  //   directory: 'assets/helpers'
  // }))
  
  .use(loadYaml('data'))
  
  .use(collections({
    home: {
      pattern: 'home/*.md'
    },
    help: {
      pattern: 'help/*.md',
      sortBy: 'weight',
      reverse: false
    },
    team: {
      pattern: 'team/*.md',
      sortBy: 'member',
      reverse: false
    }
  }))
  
  .use(maplink())
  
  .use(markdown())
  
  .use(nested({
    directory: 'assets/nested',
    generated: 'assets/layouts'
  }))
  
  .use(layouts({
    engine: 'handlebars',
    directory: 'assets/layouts',
    partials: 'assets/partials'
  }))
  
  .use(permalinks({
    relative: false
  }))
  
  .build(function(err) {
    if (err) throw err;
  });
