"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCommandHandler_1 = __importDefault(require("../Defaults/DefaultCommandHandler"));
const BotResponse_1 = __importDefault(require("../Communication/BotResponse"));
const DefaultBotCommunication_1 = __importDefault(require("../Communication/DefaultBotCommunication"));
//Split this into a Configure and Execute part?
/**
 * Represents a Command for a Discord Bot
 */
class Command {
    constructor(dataManager) {
        /* <inheritdoc> */
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
        /* <inheritdoc> */
        this.Response = new DefaultBotCommunication_1.default();
        this.DataManager = dataManager;
    }
    /* <inheritdoc> */
    SetCommandData(commandData) {
        if (commandData.CommandInteraction)
            this.Response = new BotResponse_1.default(commandData.CommandInteraction, this.IsEphemeralResponse);
    }
    /* <inheritdoc> */
    AddToMessage(content, delayUpdate = false) {
        this.Response.AddMessage(content, delayUpdate);
    }
    /* <inheritdoc> */
    AddFileToMessage(filePath, delayUpdate = false) {
        this.Response.AddFile(filePath, delayUpdate);
    }
    /* <inheritdoc> */
    AddTextFileToMessage(content, fileName, delayUpdate = false) {
        this.Response.AddTextFile(content, fileName, delayUpdate);
    }
}
exports.default = Command;
