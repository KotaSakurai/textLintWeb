var express = require('express');
var router = express.Router();
var TextLintEngine = require('textlint').TextLintEngine; // textlint require
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TextLint on Web' });
});
 
router.post('/result', function(req, res, next) {
  const engine = new TextLintEngine({
    configFile: ".textlintrc"
  });
 
  engine.executeOnText(req.body.orgtext).then(results => {
    console.log(results[0].messages);
    if (engine.isErrorResults(results)) {
      const output = engine.formatResults(results);
    }
    res.render('result', { results: results[0].messages });
  });
});
 
module.exports = router;
