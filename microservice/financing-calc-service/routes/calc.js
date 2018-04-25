var express = require('express');
var router = express.Router();

var interest = 17;
var duration = 35;
var debt = 325000;
var an = 1200*12;

/* get annuity. */
router.get('/an/:debt/:interest/:duration', function(req, res, next) {
  interest = req.params.interest;
  duration = req.params.duration;
  debt = req.params.debt;
  console.log("interest " + interest);
  console.log("duration" + duration);
  console.log("debt " + debt);
  interest = JSON.parse(interest) * 0.01;
  console.log("interest " + interest);
  var t = Math.pow(interest + 1, duration);
  console.log("t "+ t );
  console.log("###");
  an = interest * debt * t / (t-1);
  res.send('{"an" : "'+ an/12 + '"}' );
});

/* get total amount to borrow. */
router.get('/debt/:an/:interest/:duration', function(req, res, next) {
  an = req.params.an;

  interest = req.params.interest;
  duration = req.params.duration;
  console.log("an " + an);
  console.log("interest " + interest);
  console.log("duration " + duration);
  an = JSON.parse(an) * 12;

  console.log("an " + an);

  interest = JSON.parse(interest) * 0.01;;
  console.log("interest " + interest);
  var t = Math.pow(interest + 1, duration);
  console.log("t "+ t );
  debt = an / (interest *  t / (t-1));
  console.log("###");
  res.send('{"debt" : "'+ debt+ '"}');
});

module.exports = router;
