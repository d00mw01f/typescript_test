#!/usr/bin/env node

import fs = require("fs");
import readline = require("readline");
import yargs = require("yargs");
import parser = require("./parser/parser");

yargs.boolean("force").alias("force", "f");
const argv: yargs.Arguments  = yargs.argv;
const args: string[] = argv._;

class App {
    public static main(): void {
        if (args.length < 1) {
            console.error("Usage: typescript_test [OPTION]... <filename>");
            console.error("Options:");
            console.error("\t-f --force\tForce overwrite output file");
            return;
        }
        const inputFileName: string = args[0];
        if (!fs.existsSync(inputFileName)) {
            console.error("File " + inputFileName + " doesn't exists");
            return;
        }
        try {
            const inputStream: fs.ReadStream = fs.createReadStream(inputFileName);
            const rl: readline.ReadLine = readline.createInterface({input: inputStream});
            const outputFileName: string = inputFileName + ".out";
            if (!argv.force && fs.existsSync(outputFileName)) {
                console.error("File " + outputFileName + " already exists");
                return;
            }
            const outputStream: fs.WriteStream = fs.createWriteStream(outputFileName);
            rl.on("line", (line) => {
                outputStream.write(parser.flipLine(line) + "\n");
            });
        } catch (e) {
            console.error("Something wen't wrong while reading file");
            console.debug(e);
            return;
        }
        return;
    }
}

App.main();
