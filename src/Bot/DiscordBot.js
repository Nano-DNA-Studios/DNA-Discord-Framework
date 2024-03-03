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
const readline_1 = __importDefault(require("readline"));
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
        this.BotInstance.on("interactionCreate", (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isChatInputCommand())
                return;
            console.log(interaction.commandName);
            new CommandHandler_1.default().HandleCommand(interaction, this.BotInstance, this.DataManager);
        }));
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
            if (!this.DataManager.SaveFileExists()) {
                this.InitializeBot();
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
            yield this.RegisterBotToken();
            yield this.Login();
            const guilds = (yield this.BotInstance.guilds.fetch()).map(guild => guild.name);
            yield this.RegisterGuildName(guilds);
        });
    }
    /* <inheritdoc> */
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
    /* <inheritdoc> */
    RegisterBotToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const setupReader = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            //Setup Question format
            const prompt = (query) => new Promise((resolve) => setupReader.question(query, resolve));
            // Prompt for bot token and guild ID asynchronously
            this.DataManager.DISCORD_BOT_TOKEN = yield prompt('Enter the Discord Bot Token: ');
            console.log(`Bot Token: ${this.DataManager.DISCORD_BOT_TOKEN}`);
            const rl = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question('Enter the Discord Bot Token: ', (answer) => {
                console.log(`Received token: ${answer}`);
                rl.close();
            });
            // Close the readline interface after collecting all necessary inputs
            setupReader.close();
        });
    }
    /* <inheritdoc> */
    RegisterGuildName(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const setupReader = readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            if (options.length > 1) {
                console.log('\nSelect the Guild Name from the following options:');
                console.log("\n" + options.join('\n') + "\n");
                //Setup Question format
                const prompt = (query) => new Promise((resolve) => setupReader.question(query, resolve));
                // Prompt for bot token and guild ID asynchronously
                this.DataManager.GUILD_NAME = yield prompt('Enter the Guild Name: ');
            }
            else
                this.DataManager.GUILD_NAME = options[0];
            // Close the readline interface after collecting all necessary inputs
            setupReader.close();
        });
    }
}
exports.default = DiscordBot;
