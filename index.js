"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BotDataManager_1 = __importDefault(require("./src/Bot/BotDataManager"));
const DiscordBot_1 = __importDefault(require("./src/Bot/DiscordBot"));
let Bot = new DiscordBot_1.default(BotDataManager_1.default);
Bot.StartBot();
