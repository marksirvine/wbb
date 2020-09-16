
// Class for reading a name file and text file and counting number of appearences of the names
class TextReader{
    private fs = require('fs');
    private readline = require('readline');

    private dict : { [id: string] : number; } = {};
    private nameList: string[] = [];
    private wordList: string[] = [];
    private printArray: any[][] = [];

    constructor(namesDir:string, textDir: string) {
        this.readNames(namesDir)
        this.readTextFile(textDir)
        this.count()
        this.sort()
    }


    public getNumApperances(name: string){
        return this.dict[name];
    }

    // Outputs result to file
    public output(dirName:string) {

        // Iterate through every line to print
        for (let i : number = 0; i < this.printArray.length; i++){

            // Capitalise first letter
            const firstLetter = this.printArray[i][0].charAt(0).toUpperCase()
            const name = firstLetter + this.printArray[i][0].slice(1)


            // Build line to write to file
            const line = name + ": "+ this.printArray[i][1] + "\n"

            // Output
            this.fs.appendFileSync(dirName, line, function (err: Error) {
                if (err) {
                    console.log("Append Failed")
                } else {
                // done
                }
          })
        }
    }

    // Sorts the dictionary by creating an array then ordering that
    private sort(){

        const tempDict = this.dict

        // Create items array
        const items = Object.keys(this.dict).map(function( key) {
            return [key, tempDict[key]];
        });

        // Sort the array based on the second element
        items.sort(function(first: any, second:any) {
            return second[1] - first[1];
        });

        // Save
        this.printArray = items
    }

    // Searches the wordList and counts every name found, result stored in dict
    private count(){
        // Iterate through each word
        for (let i : number = 0; i < this.wordList.length; i++){
            const word = this.wordList[i]
            // When a name is found increment its dictionary value by one
            if (this.nameList.includes(word)){
                if (word in this.dict){
                    this.dict[word] = this.dict[word] + 1
                } else {
                    this.dict[word] = 1
                }
            }
        }
    }

    // Reads all the words from file and saves to wordList
    private readTextFile(dirName: string) {

        // Reads text file
        let data = this.fs.readFileSync(dirName, {encoding:'utf8', flag:'r'});

        // Removes special characters, newlines and linebreaks
        data = data.replace(/[^a-zA-Z\s\n\r]/g," ")
        data = data.replace(/(\r\n|\n|\r)/gm, " ")
        // Splits into individual words
        const splitData = data.split(/[ ]+/)

        // Saves
        this.wordList = splitData

    }

    // Reads the names from file and saves to nameList
    private readNames(dirName: string) {

        // Reads text file
        let data = this.fs.readFileSync(dirName, {encoding:'utf8', flag:'r'});

        // Lowercases text
        data = data
        // Splits into individual words
        const splitData = data.split("\r")

        // Saves
        this.nameList = splitData
      }



}

export default TextReader;

