import CommandHandler from "./CommandHandler";
import CommandRegisterer from "./CommandRegisterer";
import BotData from "./BotData";
import { Client, IntentsBitField } from "discord.js";
import FileSearch from "../FileSearch";
import BotDataManager from "./BotDataManager";
import IDiscordBot from "./IDiscordBot";
import fs from 'fs';

/**
 * Represents an instance of a Discord Bot, has default functionality for a Discord Bot but can be extended and add custom functionality with minimal effort
 */
class DiscordBot<T extends BotDataManager> implements IDiscordBot {

    DataManager: BotDataManager;

    BotInstance: Client;

    constructor(dataManager: new () => T) {
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
            console.log(`Bot is ready ${c.user.tag} on ${this.DataManager.GUILD_NAME}`);
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

        if (!this.DataManager.SaveFileExists()) {
            //Create new

            fs.mkdirSync(this.DataManager.DATA_SAVE_PATH, { recursive: true });
            fs.writeFileSync(this.DataManager.LOG_FILE_PATH, '');

            await this.DataManager.RegisterBotToken();

            await this.Login();

            const guilds: string[] = (await this.BotInstance.guilds.fetch()).map(guild => guild.name);

            await this.DataManager.RegisterGuildName(guilds);

        } else {
            await this.DataManager.LoadData();
            await this.Login();
        }

        let guildID = await this.GetGuildID(this.DataManager.GUILD_NAME);
        await this.DataManager.SetGuildID(guildID);
        await this.DataManager.SetClientID(this.BotInstance.user!.id);
        await this.RegisterCommands();
    }

    public async Login(): Promise<void> {
        try {
            await this.BotInstance.login(this.DataManager.DISCORD_BOT_TOKEN);
        }
        catch (e) {
            throw new Error("Invalid Bot Token, Please check the Bot Token and try again");
        }
    }
}

export default DiscordBot;