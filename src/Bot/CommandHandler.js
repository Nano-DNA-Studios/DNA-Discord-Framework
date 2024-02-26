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
const CommandFactory_1 = __importDefault(require("./CommandFactory"));
/**
 * Class Handling Command Execution, and Delegates to Custom Command Handlers
 */
class CommandHandler {
    HandleCommand(interaction, client, BotDataManager) {
        return __awaiter(this, void 0, void 0, function* () {
            let Factory = yield new CommandFactory_1.default(interaction.commandName);
            let command = yield Factory.CreateCommand();
            if (command)
                yield command.CommandHandler.HandleCommand(interaction, client, BotDataManager);
        });
    }
}
module.exports = CommandHandler;
