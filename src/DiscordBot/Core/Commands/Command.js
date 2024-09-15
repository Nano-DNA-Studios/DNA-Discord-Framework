"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCommandHandler_1 = __importDefault(require("../Defaults/DefaultCommandHandler"));
const BotResponse_1 = __importDefault(require("../Communication/BotResponse"));
//Split this into a Configure and Execute part?
/**
 * Represents a Command for a Discord Bot
 */
class Command {
    constructor(commandData) {
        /* <inheritdoc> */
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
        /* <inheritdoc> */
        this.Response = undefined;
        /**
         * Boolean Flag to indicate when the Response Instance sent to the User has been received and the Promise has been accomplished
         */
        this._responseReceived = false;
        this.DataManager = commandData.DataManager;
        //this.SetCommandData(commandData);
    }
    SetCommandData(commandData) {
        console.log(`Setting Command Data : ${this.IsEphemeralResponse}`);
        if (commandData.CommandInteraction)
            this.Response = new BotResponse_1.default(commandData.CommandInteraction, this.IsEphemeralResponse);
    }
    AddToMessage(content, delayUpdate = false) {
        var _a;
        (_a = this.Response) === null || _a === void 0 ? void 0 : _a.AddMessage(content, delayUpdate);
    }
    AddFileToMessage(filePath, delayUpdate = false) {
        var _a;
        (_a = this.Response) === null || _a === void 0 ? void 0 : _a.AddFile(filePath, delayUpdate);
    }
    AddTextFileToMessage(content, fileName, delayUpdate = false) {
        var _a;
        (_a = this.Response) === null || _a === void 0 ? void 0 : _a.AddTextFile(content, fileName, delayUpdate);
    }
}
exports.default = Command;
