import dotenv from "dotenv";
dotenv.config();
import CommandHandler = require("./CommandHandler");
import CommandRegisterer from "./CommandRegisterer";
import BotData from "./BotData";
import { Client, IntentsBitField } from "discord.js";
import FileSearch from "./FileSearch";
import BotDataManager from "./BotDataManager";
import IDiscordBot from "./IDiscordBot";

/**
 * Represents an instance of a Discord Bot, has default functionality for a Discord Bot but can be extended and add custom functionality with minimal effort
 */
class DiscordBot<T extends BotDataManager> implements IDiscordBot{

    DataManager: BotDataManager;

    BotInstance: Client;

    constructor(dataManager: new () => T ) {
        this.DataManager = BotData.Instance(dataManager);

        this.BotInstance = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent,
            ],
        });

        this.BotInstance.on("ready", (c) => {
            console.log(`Bot is ready ${c.user.tag}`);
            
          });
          
          this.BotInstance.on("interactionCreate", async (interaction) => {
            if (!interaction.isChatInputCommand()) return;
            console.log(interaction.commandName);
            new CommandHandler().HandleCommand(interaction, this.BotInstance, this.DataManager);
          });
    }

    public RegisterCommands(): void {
        let registerer = new CommandRegisterer(this.DataManager);
        let fileSearch = new FileSearch();
        let commands = fileSearch.GetAllCommandInstances();
        registerer.AddCommands(commands);
        registerer.RegisterCommands();
    }

    public async GetGuildID(guildName: string): Promise<string> {
        let guildID = "";

        const guilds = await this.BotInstance.guilds.fetch();
        for (const guild of guilds.values()) {
            if (guild.name === guildName) {
                guildID = guild.id;
                break;
            }
        }

        return guildID;
    }

    public async StartBot(): Promise<void> {
        await this.DataManager.LoadData();
        await this.BotInstance.login(this.DataManager.DISCORD_BOT_TOKEN);
        let guildID = await this.GetGuildID(this.DataManager.GUILD_NAME);
        await this.DataManager.SetGuildID(guildID);
        await this.DataManager.SetClientID(this.BotInstance.user!.id);
        await this.RegisterCommands();
    }
}

export default DiscordBot;