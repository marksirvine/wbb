"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var textReader_1 = __importDefault(require("../server/textReader"));
// Create a new express app instance
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/name-count/:name', function (req, res) {
    var textReader = new textReader_1.default('res/first-names.txt', 'res/oliver-twist.txt');
    // textReader.output('res/output.txt')
    var name = req.params.name;
    var number = textReader.getNumApperances(name);
    var text = '{ "' + name + '" : ' + number + '}';
    var returnJSON = JSON.parse(text);
    res.send(returnJSON);
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
