'use strict';

var express = require('express')
    , http = require('http')
    , path = require('path')
    , _ = require('underscore')
    , Faker = require('Faker');

var app = express();
app.use(express.static(path.join(__dirname, 'app')));
app.use(express.bodyParser());
app.set('port', process.env.PORT || 8000);

// API
app.get('/api/kitties', function(req, res) {
    var kitties = _.clone(kittyData);

    if(req.query.sort == 'random') fisherYates(kitties);
    if(req.query.pageSize)         kitties = kitties.slice(0, 2);

    res.json(kitties);
});

app.post('/api/battle', function(req, res) {

    var winner = _.findWhere(kittyData, { 'id': req.body.winner })
        , loser = _.findWhere(kittyData, { 'id': req.body.loser });

    ++winner.upvotes;
    ++loser.downvotes;

    res.send(200);
});

// Generate kitty data
var kittyPics = ['gifs/166.gif', 'gifs/167.gif', 'gifs/168.gif', 'gifs/131.gif', 'gifs/146.gif', 'gifs/153.gif', 'gifs/160.gif', 'gifs/162.gif', 'gifs/164.gif', 'gifs/kitty.gif'];
var id = 0;
var kittyData = _.map(kittyPics, function(kittyPic) {
    var kitty = {
        id: ++id,
        filename: kittyPic,
        name: Faker.Name.firstName(),
        upvotes: Faker.random.number(10),
        downvotes: Faker.random.number(10),
        catchphrase: Faker.Company.catchPhrase(),
        comments: []
    };

    for(var i = 0; i < Faker.random.number(10); i++) {
        kitty.comments.push(Faker.Lorem.sentences(Faker.random.number(5) || 1));
    }

    return kitty;
});

function fisherYates ( myArray ) {
    var i = myArray.length, j, temp;
    if ( i === 0 ) return false;
    while ( --i ) {
        j = Math.floor( Math.random() * ( i + 1 ) );
        temp = myArray[i];
        myArray[i] = myArray[j];
        myArray[j] = temp;
    }
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});