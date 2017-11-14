var debug = require('debug')('web-express-start');
var app = require('../app');


app.set('port', process.env.PORT || 3009);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});