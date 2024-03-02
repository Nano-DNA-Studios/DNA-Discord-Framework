"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotDataManager_1 = __importDefault(require("./src/Bot/BotDataManager"));
const DiscordBot_1 = __importDefault(require("./src/Bot/DiscordBot"));
let Bot = new DiscordBot_1.default(BotDataManager_1.default);
Bot.StartBot();
//Exports
/*
export {default as BotDataManager} from "./src/Bot/BotDataManager";
export {default as Command} from "./src/Bot/Command";
export {default as CommandHandler} from "./src/Bot/CommandHandler";
export {default as BotCommandLog} from "./src/Bot/BotCommandLog";
export {default as BotData} from "./src/Bot/BotData";
export {default as CommandFactory} from "./src/Bot/CommandFactory";
export {default as CommandLogger} from "./src/Bot/CommandLogger";
export {default as OptionTypes} from "./src/Bot/OptionTypes";
export {default as CommandRegisterer} from "./src/Bot/CommandRegisterer";
export {default as DefaultCommandHandler} from "./src/Bot/DefaultCommandHandler";
export {default as DiscordBot} from "./src/Bot/DiscordBot";
export {default as EmptyCustomCommandHandler} from "./src/Bot/EmptyCustomCommandHandler";
export {default as FileSearch} from "./src/FileSearch";
export {default as IBotDataManager}from "./src/Bot/IBotDataManager";
export {default as ICommand} from "./src/Bot/ICommand";
export {default as ICommandHandler} from "./src/Bot/ICommandHandler";
export {default as ICommandOption} from "./src/Bot/ICommandOption";
export {default as ICommandOptionChoice} from "./src/Bot/ICommandOptionChoice";
export {default as IDiscordBot} from "./src/Bot/IDiscordBot";
export {default as IDiscordCommand} from "./src/Bot/IDiscordCommand";
export {default as ILogMessage} from "./src/Bot/ILogMessage";
export {default as BotCommandsEnum} from "./src/BotCommands/BotCommandsEnum";
export {default as GetLogs} from "./src/BotCommands/GetLogs";
export {default as SetLogChannel} from "./src/BotCommands/SetLogChannel";
*/
