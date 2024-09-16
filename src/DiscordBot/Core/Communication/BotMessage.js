"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotCommunication_1 = __importDefault(require("./BotCommunication"));
class BotMessage extends BotCommunication_1.default {
    constructor(channel) {
        super();
        /**
         * Boolean Flag to determine if a new Message is wanted instead of editing
         */
        this._newMessageWanted = false;
        this.MessageChannel = channel;
    }
    /**
     * Flags the Message to be a new Message instead of an Edit (Wipes files and content)
     */
    NewMessage() {
        this._newMessageWanted = true;
        this.content = "";
        this.files = [];
    }
    /* <inheritdoc> */
    UpdateCommunication() {
        if (this._newMessageWanted || this._MessageInitialized == false) {
            this._newMessageWanted = false;
            this._MessageInitialized = true;
            this.MessageChannel.send(this).then((message) => {
                this.CommunicationInstance = message;
                this._MessageReceived = true;
            });
            return;
        }
        this.UpdateMessageLoop();
    }
}
exports.default = BotMessage;
