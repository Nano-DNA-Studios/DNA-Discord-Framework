"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCommandHandler_1 = __importDefault(require("./DefaultCommandHandler"));
/**
 * Represents a Command for a Discord Bot
 */
class Command {
    constructor() {
        this.CommandName = '';
        this.CommandDescription = '';
        this.CommandFunction = () => { };
        this.ReplyMessage = '';
        this.LogMessage = '';
        this.ErrorMessage = '';
        this.SuccessMessage = '';
        this.FailMessages = [];
        this.Options = [];
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
    }
    /**
     * Runs the Discord Command
     * @param BotDataManager Instance of the BotDataManager
     * @param interaction Instance of the ChatInputCommandInteraction
     */
    RunCommand(dataManager, interaction, client) {
        this.CommandFunction(interaction, dataManager);
    }
    /**
     * Gets an Empty Command that can be used as a default
     * @returns Returns an Empty Command
     */
    static GetEmptyCommand() {
        let UndefinedBashScript = {
            CommandName: "undefined",
            CommandDescription: "",
            CommandFunction: () => { },
            ReplyMessage: " ",
            LogMessage: " ",
            ErrorMessage: " ",
            SuccessMessage: " ",
            FailMessages: [''],
            Options: [],
            CommandHandler: new DefaultCommandHandler_1.default(),
            RunCommand: () => { }
        };
        return new this();
    }
}
exports.default = Command;
