'use strict';

var express = require('express')
    , http = require('http')
    , path = require('path')
    , _ = require('underscore')
    , Faker = require('Faker');

var app = express();
app.use(express.static(path.join(__dirname, 'app')));
app.set('port', process.env.PORT || 8000);

// API
app.get('/api/kitties', function(req, res) {
    res.json(kittyData);
});

// Generate kitty data
var kittyPics = ['gifs/166.gif', 'gifs/167.gif', 'gifs/168.gif', 'gifs/131.gif', 'gifs/146.gif', 'gifs/153.gif', 'gifs/160.gif', 'gifs/162.gif', 'gifs/164.gif', 'gifs/kitty.gif'];
var kittyData = _.map(kittyPics, function(kittyPic) {
    var kitty = {
        filename: kittyPic,
        name: Faker.Name.firstName(),
        upvotes: Faker.random.number(50),
        downvotes: Faker.random.number(50),
        comments: []
    };

    for(var i = 0; i < Faker.random.number(10); i++) {
        kitty.comments.push(Faker.Lorem.sentences(Faker.random.number(5) || 1));
    }

    return kitty;
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});