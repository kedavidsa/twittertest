//Nodejs
var sslRedirect = require('heroku-ssl-redirect');
var Twit= require('twit');
const path = require('path');
var express = require('express')
var app = express()


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// enable ssl redirect
app.use(sslRedirect(['production'], 301));





var T = new Twit({
    consumer_key:         '4JHfKYk1eOBWQOsvhjiwcgkkz',
    consumer_secret:      'pUYX7MsuKw8BZYdRe7v3Iz2DrSIGWtsvvg9oBfv5YpYKVE470h',
    access_token:         '312736808-hmcvU0L3n4Yqj71dtycy6GfnuEqoKaxNldUfmYAA',
    access_token_secret:  'k44WEIiHZ4IKHnl3ba5mPA285Pa9U3IZITcORjtDPTXF8'
});


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// respond with "hello world" when a GET request is made to the homepage
app.get('/api/search/tweets', function (req, res) {

    let q=req.query.q;
    let count=req.query.count;
    let max_id=req.query.max_id;

    var queryObject={ q: q, count: count };
    if(max_id)
    queryObject.max_id=max_id;

    T.get('search/tweets', queryObject, function(err, data, response) {
        if(err){
            res.json(err);
        }else{
            res.json(data);
        }        
    });
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
