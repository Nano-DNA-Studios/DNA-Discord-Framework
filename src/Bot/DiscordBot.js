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
const CommandHandler_1 = __importDefault(require("./CommandHandler"));
const CommandRegisterer_1 = __importDefault(require("./CommandRegisterer"));
const BotData_1 = __importDefault(require("./BotData"));
const discord_js_1 = require("discord.js");
const FileSearch_1 = __importDefault(require("../FileSearch"));
const fs_1 = __importDefault(require("fs"));
/**
 * Represents an instance of a Discord Bot, has default functionality for a Discord Bot but can be extended and add custom functionality with minimal effort
 */
class DiscordBot {
    constructor(dataManager) {
        this.DataManager = BotData_1.default.Instance(dataManager);
        this.BotInstance = new discord_js_1.Client({
            intents: [
                discord_js_1.IntentsBitField.Flags.Guilds,
                discord_js_1.IntentsBitField.Flags.GuildMembers,
                discord_js_1.IntentsBitField.Flags.GuildMessages,
                discord_js_1.IntentsBitField.Flags.MessageContent,
            ],
        });
        this.BotInstance.on("ready", (c) => {
            console.log(`Bot is ready ${c.user.tag} on ${this.DataManager.GUILD_NAME}`);
        });
        this.BotInstance.on("interactionCreate", (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand())
                return;
            console.log(interaction.commandName);
            new CommandHandler_1.default().HandleCommand(interaction, this.BotInstance, this.DataManager);
        }));
    }
    RegisterCommands() {
        let registerer = new CommandRegisterer_1.default(this.DataManager);
        let fileSearch = new FileSearch_1.default();
        let commands = fileSearch.GetAllCommandInstances();
        registerer.AddCommands(commands);
        registerer.RegisterCommands();
    }
    GetGuildID(guildName) {
        return __awaiter(this, void 0, void 0, function* () {
            let guildID = "";
            const guilds = yield this.BotInstance.guilds.fetch();
            for (const guild of guilds.values()) {
                if (guild.name === guildName) {
                    guildID = guild.id;
                    break;
                }
            }
            return guildID;
        });
    }
    StartBot() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.DataManager.SaveFileExists()) {
                //Create new
                fs_1.default.mkdirSync(this.DataManager.DATA_SAVE_PATH, { recursive: true });
                fs_1.default.writeFileSync(this.DataManager.LOG_FILE_PATH, '');
                yield this.DataManager.RegisterBotToken();
                yield this.Login();
                const guilds = (yield this.BotInstance.guilds.fetch()).map(guild => guild.name);
                yield this.DataManager.RegisterGuildName(guilds);
            }
            else {
                yield this.DataManager.LoadData();
                yield this.Login();
            }
            let guildID = yield this.GetGuildID(this.DataManager.GUILD_NAME);
            yield this.DataManager.SetGuildID(guildID);
            yield this.DataManager.SetClientID(this.BotInstance.user.id);
            yield this.RegisterCommands();
        });
    }
    Login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.BotInstance.login(this.DataManager.DISCORD_BOT_TOKEN);
            }
            catch (e) {
                throw new Error("Invalid Bot Token, Please check the Bot Token and try again");
            }
        });
    }
}
exports.default = DiscordBot;
