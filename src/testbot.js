"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BashScriptRunner_1 = __importDefault(require("./Bash-Plugin/BashScriptRunner"));
const BotDataManager = require("./DiscordBot/Core/Data/BotDataManager");
const DiscordBot = require("./DiscordBot/Core/DiscordBot");
const Bot = new DiscordBot.default(BotDataManager.default);
Bot.StartBot();
let runner = new BashScriptRunner_1.default();
