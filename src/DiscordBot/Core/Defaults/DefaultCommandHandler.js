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
const CommandFactory_1 = __importDefault(require("../Commands/CommandFactory"));
const BotCommandLog_1 = __importDefault(require("../Logging/BotCommandLog"));
/**
 * Default Command Handler used for empty and regular Discord Bot Commands
 */
class DefaultCommandHandler {
    HandleCommand(interaction, client, dataManager) {
        return __awaiter(this, void 0, void 0, function* () {
            let Factory = yield new CommandFactory_1.default(interaction.commandName);
            let command = yield Factory.CreateCommand();
            if (command) {
                try {
                    yield command.RunCommand(client, interaction, dataManager);
                }
                catch (error) {
                }
                const log = new BotCommandLog_1.default(interaction);
                log.AddLogMessage(command.Response);
                dataManager.AddCommandLog(log);
            }
        });
    }
    /**
     * Gets an Instance of the Default Command Handler
     * @returns Returns an Instance of the Default Command Handler
     */
    static Instance() {
        return new DefaultCommandHandler();
    }
}
exports.default = DefaultCommandHandler;
