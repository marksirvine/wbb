"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Class for reading a name file and text file and counting number of appearences of the names
var TextReader = /** @class */ (function () {
    function TextReader(namesDir, textDir) {
        this.fs = require('fs');
        this.readline = require('readline');
        this.dict = {};
        this.nameList = [];
        this.wordList = [];
        this.printArray = [];
        this.readNames(namesDir);
        this.readTextFile(textDir);
        this.count();
        this.sort();
    }
    TextReader.prototype.getNumApperances = function (name) {
        return this.dict[name];
    };
    // Outputs result to file
    TextReader.prototype.output = function (dirName) {
        // Iterate through every line to print
        for (var i = 0; i < this.printArray.length; i++) {
            // Capitalise first letter
            var firstLetter = this.printArray[i][0].charAt(0).toUpperCase();
            var name_1 = firstLetter + this.printArray[i][0].slice(1);
            // Build line to write to file
            var line = name_1 + ": " + this.printArray[i][1] + "\n";
            // Output
            this.fs.appendFileSync(dirName, line, function (err) {
                if (err) {
                    console.log("Append Failed");
                }
                else {
                    // done
                }
            });
        }
    };
    // Sorts the dictionary by creating an array then ordering that
    TextReader.prototype.sort = function () {
        var tempDict = this.dict;
        // Create items array
        var items = Object.keys(this.dict).map(function (key) {
            return [key, tempDict[key]];
        });
        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[1] - first[1];
        });
        // Save
        this.printArray = items;
    };
    // Searches the wordList and counts every name found, result stored in dict
    TextReader.prototype.count = function () {
        // Iterate through each word
        for (var i = 0; i < this.wordList.length; i++) {
            var word = this.wordList[i];
            // When a name is found increment its dictionary value by one
            if (this.nameList.includes(word)) {
                if (word in this.dict) {
                    this.dict[word] = this.dict[word] + 1;
                }
                else {
                    this.dict[word] = 1;
                }
            }
        }
    };
    // Reads all the words from file and saves to wordList
    TextReader.prototype.readTextFile = function (dirName) {
        // Reads text file
        var data = this.fs.readFileSync(dirName, { encoding: 'utf8', flag: 'r' });
        // Removes special characters, newlines and linebreaks
        data = data.replace(/[^a-zA-Z\s\n\r]/g, " ");
        data = data.replace(/(\r\n|\n|\r)/gm, " ");
        // Splits into individual words
        var splitData = data.split(/[ ]+/);
        // Saves
        this.wordList = splitData;
    };
    // Reads the names from file and saves to nameList
    TextReader.prototype.readNames = function (dirName) {
        // Reads text file
        var data = this.fs.readFileSync(dirName, { encoding: 'utf8', flag: 'r' });
        // Lowercases text
        data = data;
        // Splits into individual words
        var splitData = data.split("\r");
        // Saves
        this.nameList = splitData;
    };
    return TextReader;
}());
exports.default = TextReader;
