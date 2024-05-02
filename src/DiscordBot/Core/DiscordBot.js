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
const CommandHandler_1 = __importDefault(require("./Commands/CommandHandler"));
const CommandRegisterer_1 = __importDefault(require("./Commands/CommandRegisterer"));
const BotData_1 = __importDefault(require("./Data/BotData"));
const discord_js_1 = require("discord.js");
const FileSearch_1 = __importDefault(require("../../FileSearch"));
const readline_sync_1 = __importDefault(require("readline-sync"));
/**
 * Represents an instance of a Discord Bot, has default functionality for a Discord Bot but can be extended and add custom functionality with minimal effort
 */
class DiscordBot {
    /* <inheritdoc> */
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
        this.HandleShutDown();
        this.BotInstance.on("interactionCreate", (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand())
                return;
            console.log(interaction.commandName);
            new CommandHandler_1.default().HandleCommand(interaction, this.BotInstance, this.DataManager);
        }));
    }
    /**
     * Handles the Shut Down Cases
     */
    HandleShutDown() {
        this.BotInstance.on("shardDisconnect", (c) => {
            var _a;
            console.log(`Bot is shutting down ${(_a = this.BotInstance.user) === null || _a === void 0 ? void 0 : _a.tag} on ${this.DataManager.GUILD_NAME}`);
            this.DisconnectMessage(this.BotInstance);
        });
        process.on('SIGINT', () => {
            this.BotInstance.destroy();
        });
        process.on('SIGTERM', () => {
            this.BotInstance.destroy();
        });
    }
    /**
     * Sends a Shut Down Message to the last Message Channel the Bot texted in
     * @param client The Discord Bot Client Instance
     */
    DisconnectMessage(client) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const channel = yield this.BotInstance.channels.fetch(this.DataManager.LAST_MESSAGE_CHANNEL_ID);
                if (channel instanceof discord_js_1.TextChannel)
                    channel.send(`${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} is Shutting Down`);
            }
            catch (e) {
                console.log("No Channel Found.");
            }
        });
    }
    /* <inheritdoc> */
    RegisterCommands() {
        let registerer = new CommandRegisterer_1.default(this.DataManager);
        let fileSearch = new FileSearch_1.default();
        let commands = fileSearch.GetAllCommandInstances();
        registerer.AddCommands(commands);
        registerer.RegisterCommands();
    }
    /* <inheritdoc> */
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
    /* <inheritdoc> */
    StartBot() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.DataManager.AutoLoginExists() && !this.DataManager.SaveFileExists()) {
                this.DataManager.DISCORD_BOT_TOKEN = this.DataManager.GetAutoLoginContent();
                yield this.InitializeBot();
            }
            else if (!this.DataManager.SaveFileExists()) {
                yield this.RegisterBotToken();
                yield this.InitializeBot();
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
    /* <inheritdoc> */
    InitializeBot() {
        return __awaiter(this, void 0, void 0, function* () {
            this.DataManager.InitializeData();
            yield this.Login();
            const guilds = (yield this.BotInstance.guilds.fetch()).map(guild => guild.name);
            this.RegisterGuildName(guilds);
            this.DataManager.SaveData();
        });
    }
    /* <inheritdoc> */
    Login() {
        return __awaiter(this, arguments, void 0, function* (loginCount = 0) {
            try {
                const token = yield this.DataManager.DISCORD_BOT_TOKEN;
                yield this.BotInstance.login(token);
            }
            catch (e) {
                console.log("Invalid Bot Token, Your Token might be Outdated or incorrect, Please check the Bot Token and try again");
                if (loginCount < 3) {
                    this.RegisterBotToken();
                    loginCount++;
                    yield this.Login(loginCount);
                }
                else
                    throw new Error("Too Many Incorrect Login Attempts, Shutting Down.");
            }
        });
    }
    /* <inheritdoc> */
    RegisterBotToken() {
        this.DataManager.DISCORD_BOT_TOKEN = readline_sync_1.default.question('Enter the Discord Bot Token: ').replace(/\s/g, '');
    }
    /* <inheritdoc> */
    RegisterGuildName(options) {
        if (options.length > 1) {
            console.log('\nSelect the Guild Name from the following options:');
            console.log("\n" + options.join('\n') + "\n");
            this.DataManager.GUILD_NAME = readline_sync_1.default.question('Enter the Guild Name: ').replace(/\s/g, '');
        }
        else {
            this.DataManager.GUILD_NAME = options[0];
        }
        this.DataManager.SaveData();
    }
}
exports.default = DiscordBot;
