"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefaultCommandHandler_1 = __importDefault(require("../Defaults/DefaultCommandHandler"));
const BotResponse_1 = __importDefault(require("../Response/BotResponse"));
const CommandLogger_1 = __importDefault(require("../Logging/CommandLogger"));
/**
 * Represents a Command for a Discord Bot
 */
class Command {
    constructor() {
        this.CommandHandler = DefaultCommandHandler_1.default.Instance();
        this.EphemeralResponse = new BotResponse_1.default();
        this.Response = new BotResponse_1.default();
        this.Logger = new CommandLogger_1.default();
    }
    AddToResponseMessage(content) {
        this.EphemeralResponse.content += content + "\n";
    }
    AddToLogMessage(content) {
        this.Response.content += content + "\n";
    }
    AddToAllResponseMessages(content) {
        this.AddToResponseMessage(content);
        this.AddToLogMessage(content);
    }
    InitializeCommandLogger(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.AddToAllResponseMessages(`Running ${interaction.commandName} :arrows_clockwise:`);
            yield this.Logger.InitializeResponse(interaction, client, this.IsEphemeralResponse, this.Response);
        });
    }
    LogAndRespond() {
        this.Logger.LogAndRespond(this.Response, this.EphemeralResponse);
    }
}
exports.default = Command;
