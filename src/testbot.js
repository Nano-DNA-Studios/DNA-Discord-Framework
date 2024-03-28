"use strict";
const BotDataManager = require("./DiscordBot/Core/Data/BotDataManager");
const DiscordBot = require("./DiscordBot/Core/DiscordBot");
const Bot = new DiscordBot.default(BotDataManager.default);
Bot.StartBot();
