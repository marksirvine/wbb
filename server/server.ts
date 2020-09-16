import express = require('express');
import TextReader from '../server/textReader'
// Create a new express app instance
const app: express.Application = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/name-count/:name', function (req, res) {
    
    
    let textReader = new TextReader('res/first-names.txt', 'res/oliver-twist.txt')
    // textReader.output('res/output.txt')
    
    var name: string = req.params.name
    var number: number = textReader.getNumApperances(name)
    var text = '{ "'+name+'" : '+number+'}';
    var returnJSON = JSON.parse(text);
    res.send(returnJSON);

});
app.listen(3000, function () {
console.log('App is listening on port 3000!');
});