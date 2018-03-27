#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var yargs = require("yargs");
var parser = require("./parser/parser");
yargs.boolean("force").alias("force", "f");
var argv = yargs.argv;
var args = argv._;
var App = /** @class */ (function () {
    function App() {
    }
    App.main = function () {
        if (args.length < 1) {
            console.error("Usage: typescript_test [OPTION]... filename");
            console.error("Options:");
            console.error("\t-f --force\tForce overwrite output file");
            return;
        }
        var inputFileName = args[0];
        if (!fs.existsSync(inputFileName)) {
            console.error("File " + inputFileName + " doesn't exists");
            return;
        }
        try {
            var inputStream = fs.createReadStream(inputFileName);
            var rl = readline.createInterface({ input: inputStream });
            var outputFileName = inputFileName + ".out";
            if (!argv.force && fs.existsSync(outputFileName)) {
                console.error("File " + outputFileName + " already exists");
                return;
            }
            var outputStream_1 = fs.createWriteStream(outputFileName);
            rl.on("line", function (line) {
                outputStream_1.write(parser.flipLine(line) + "\n");
            });
        }
        catch (e) {
            console.error("Something wen't wrong while reading file");
            console.debug(e);
            return;
        }
        return;
    };
    return App;
}());
App.main();
//# sourceMappingURL=app.js.map