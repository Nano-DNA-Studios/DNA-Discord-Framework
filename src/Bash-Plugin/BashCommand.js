"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../DiscordBot/Core/Commands/Command"));
/**
 * Abstract Class for Bash Commands
 */
class BashCommand extends Command_1.default {
    //Variable for the Script that is made?
    //Is run locally variable
    //
    HandleCommand() {
        this.RunBashCommand();
    }
}
