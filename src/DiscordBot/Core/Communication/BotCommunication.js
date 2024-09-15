"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
class BotCommunication {
    constructor() {
        /**
         * The Date the Response was created
         */
        this.CreatedDate = new Date();
        /**
         * The Message Content of the Response
         */
        this.content = "";
        /**
         * Boolean Flag to determine if the Message is Ephemeral
         */
        this.ephemeral = false;
        /**
         * The Files associated with the Response
         */
        this.files = [];
        /**
         * Boolean Flag to determine if the Message has been received/initialized and can be updated
         */
        this._MessageInitialized = false;
    }
    //Add a get link function
    /**
     * Adds Content to the Message as a new Line
     * @param content The String Content to add to the Message
     */
    AddMessage(content, delayUpdate = false) {
        this.content += content + "\n";
        if (!delayUpdate)
            this.Update();
    }
    /**
     * Adds a File to the Message
     * @param filePath The File Path to the File to add to the Message
     */
    AddFile(filePath, delayUpdate = false) {
        var _a, _b;
        if (!fs_1.default.existsSync(filePath)) {
            console.log("File does not exist");
            return;
        }
        if (!((_a = this.files) === null || _a === void 0 ? void 0 : _a.some(file => file === filePath)))
            (_b = this.files) === null || _b === void 0 ? void 0 : _b.push(filePath);
        if (!delayUpdate)
            this.Update();
    }
    /**
     * Adds a Message as a Text File to the Messages
     * @param content The Content of the Text File
     * @param fileName The File Name of the Text File to be uploaded
     */
    AddTextFile(content, fileName, delayUpdate = false) {
        var _a;
        const buffer = Buffer.from(content, 'utf-8');
        const file = new discord_js_1.AttachmentBuilder(buffer, { name: `${fileName}.txt` });
        (_a = this.files) === null || _a === void 0 ? void 0 : _a.push(file);
        if (!delayUpdate)
            this.Update();
    }
    /**
     * Updates the Communication Instance with the new Message Content and Files
     */
    Update() {
        let updated = false;
        this.UpdateCommunication().then(() => {
            updated = true;
        });
        const UpdateLoop = (count = 0) => {
            if (updated)
                return;
            if (count > 1000)
                return console.log("Failed to Update Communication Instance");
            setTimeout(() => {
                UpdateLoop(count + 1);
            }, 100);
        };
        UpdateLoop();
    }
}
/**
    * The Maximum Number of Minutes that the Response is valid for
    */
BotCommunication.MAX_RESPONSE_MINS = 15;
exports.default = BotCommunication;
