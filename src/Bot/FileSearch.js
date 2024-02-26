"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * Utility Class for Searching Files
 */
class FileSearch {
    constructor() {
        /**
         * Path the the Directory of the Bot
         */
        this._directoryPath = process.cwd() + "\\src";
    }
    /**
    * Gets all the files with JavaScript endings in the Bot Directory
    * @returns An Array of Java Script File Paths within the Bot Directory
    */
    GetAllJSFiles() {
        return this.GetFiles(this._directoryPath, ".js");
    }
    /**
    * Gets all the Java Script Files within the provided directory and subdirectories through recursion
    * @param Path The start Path to search for files
    * @returns Array of all Java Script Files within the provided directory and subdirectories
    */
    GetFiles(Path, fileExtension) {
        let AllFiles = [];
        if (fs.existsSync(Path)) {
            let files = fs.readdirSync(Path);
            files.forEach(file => {
                let absPath = Path + "/" + file;
                if (fs.lstatSync(absPath).isDirectory())
                    AllFiles.push(...this.GetFiles(absPath, fileExtension));
                else if (path.extname(absPath) === fileExtension)
                    AllFiles.push(absPath);
            });
        }
        return AllFiles;
    }
    /**
     * Gets all the Command Instances from the Provided Directory
     * @returns Array of IT Command Objects
     */
    GetAllCommandInstances() {
        let Commands = [];
        const CommandClasses = this.GetAllCommands();
        CommandClasses.forEach(commandClass => {
            const commandInstance = new commandClass();
            if (commandInstance.CommandName !== '')
                Commands.push(commandInstance);
        });
        return Commands;
    }
    /**
    * Gets all the Command Classes from the Provided Directory
    * @returns Array of IT Command Objects
    */
    GetAllCommands() {
        let Commands = [];
        const Files = this.GetAllJSFiles();
        Files.forEach(file => {
            const module = require(file);
            try {
                const classType = module;
                try {
                    const moduleInstance = new classType();
                    if ('CommandName' in moduleInstance)
                        Commands.push(module);
                }
                catch (error) { }
            }
            catch (error) {
                console.log("Error Occurred: " + error);
            }
        });
        return Commands;
    }
}
exports.default = FileSearch;
