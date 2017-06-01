

module.exports = function (content) {
  return '<strong>' + content + '</strong>'
}


/// many, many helpers ...
// https://github.com/helpers/handlebars-helpers


/**



handlebars.registerHelper('link', function(text, url) {
  url = handlebars.escapeExpression(url);
  text = handlebars.escapeExpression(text);

  return new handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
});

handlebars.registerHelper('bold', function(options) {
  return new handlebars.SafeString(
      '<div class="mybold">'
      + options.fn(this)
      + '</div>');
});

handlebars.registerHelper('bold', function(content, options) {
  return '<strong>' + content + '</strong>';
});



handlebars.registerHelper('link', function(path) {
  var url = handlebars.escapeExpression(path);

  return new handlebars.SafeString(
    "<a href='" + url + "'>" + url + "</a>"
  );
});
But how can I add this helper and use it in my metalsmith configuration?

Here is a summarised example.
index.md:

etc etc link to the page is {{{link "docs/file.doc"}}}
I want with a simple make the following part of the html to be created:

etc etc link to the page is <a href='docs/file.doc'>docs/file.doc</a>


handlebars.registerHelper('link', function(path) {
  var url = handlebars.escapeExpression(path);

  return new handlebars.SafeString(
    "<a href='" + url + "'>" + url + "</a>"
  );
});
**/


/**
Handlebars.registerHelper('bold', function(options) {
  return new Handlebars.SafeString(
      '<div class="mybold">'
      + options.fn(this)
      + '</div>');
});
**/

