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
const CommandFactory_1 = __importDefault(require("./CommandFactory"));
/**
 * Class Handling Command Execution, and Delegates to Custom Command Handlers (used for the Bot Data to Create the Custom Command handler for a specific Command)
 */
class CommandHandler {
    HandleCommand(interaction, client, dataManager) {
        return __awaiter(this, void 0, void 0, function* () {
            let Factory = yield new CommandFactory_1.default(interaction.commandName);
            let command = yield Factory.CreateCommand(dataManager);
            if (command)
                yield command.CommandHandler.HandleCommand(interaction, client, dataManager);
        });
    }
}
exports.default = CommandHandler;
