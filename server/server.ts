import express = require('express');
import TextReader from '../server/textReader'

// Create a new express instance
const app: express.Application = express();

// GET Request returning name and number of appearences 
app.get('/name-count/:name', function (req, res) {
    let textReader = new TextReader('res/first-names.txt', 'res/oliver-twist.txt')  
    var name: string = req.params.name
    var number: number = textReader.getNumApperances(name)
    var text = '{ "'+name+'" : '+number+'}';
    var returnJSON = JSON.parse(text);
    res.send(returnJSON);

});

// GET request that outputs part1 to a text file
app.get('/output', function (req, res) {
    let textReader = new TextReader('res/first-names.txt', 'res/oliver-twist.txt')  
    textReader.output('res/output.txt')
    res.send('Output to res/output.txt');

});

    

app.listen(3000, function () {
    console.log('Listening on port 3000');
});