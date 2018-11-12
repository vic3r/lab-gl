const planet = require('./planet');

module.exports = (app) => {
  app.use('/planet', planet);
}
