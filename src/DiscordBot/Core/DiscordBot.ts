import CommandHandler from "./Commands/CommandHandler";
import CommandRegisterer from "./Commands/CommandRegisterer";
import BotData from "./Data/BotData";
import { Client, IntentsBitField } from "discord.js";
import FileSearch from "../../FileSearch";
import BotDataManager from "./Data/BotDataManager";
import IDiscordBot from "./Interfaces/IDiscordBot";
import readlineSync from 'readline-sync';

/**
 * Represents an instance of a Discord Bot, has default functionality for a Discord Bot but can be extended and add custom functionality with minimal effort
 */
class DiscordBot<T extends BotDataManager> implements IDiscordBot {

    /* <inheritdoc> */
    public DataManager: BotDataManager;

    /* <inheritdoc> */
    public BotInstance: Client;

    /* <inheritdoc> */
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

    /* <inheritdoc> */
    public RegisterCommands(): void {
        let registerer = new CommandRegisterer(this.DataManager);
        let fileSearch = new FileSearch();
        let commands = fileSearch.GetAllCommandInstances();
        registerer.AddCommands(commands);
        registerer.RegisterCommands();
    }

    /* <inheritdoc> */
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

    /* <inheritdoc> */
    public async StartBot(): Promise<void> {
        if (!this.DataManager.SaveFileExists()) {
            await this.InitializeBot();
        } else {
            await this.DataManager.LoadData();
            await this.Login();
        }

        let guildID = await this.GetGuildID(this.DataManager.GUILD_NAME);
        await this.DataManager.SetGuildID(guildID);
        await this.DataManager.SetClientID(this.BotInstance.user!.id);
        await this.RegisterCommands();
    }

    /* <inheritdoc> */
    public async InitializeBot(): Promise<void> {
        this.DataManager.InitializeData();
        this.RegisterBotToken();
        await this.DataManager.LoadData();
        await this.Login();
        const guilds: string[] = (await this.BotInstance.guilds.fetch()).map(guild => guild.name);
        this.RegisterGuildName(guilds);
    }

    /* <inheritdoc> */
    public async Login(): Promise<void> {
        try {
            const token = await this.DataManager.DISCORD_BOT_TOKEN;
            await this.BotInstance.login(token);
        }
        catch (e) {
            throw new Error("Invalid Bot Token, Please check the Bot Token and try again");
        }
    }

    /* <inheritdoc> */
    public RegisterBotToken(): void {
        // Prompt for bot token synchronously
        this.DataManager.DISCORD_BOT_TOKEN = readlineSync.question('Enter the Discord Bot Token: ').replace(/\s/g, '');

        this.DataManager.SaveData();
    }

    /* <inheritdoc> */
    public RegisterGuildName(options: string[]): void {

        if (options.length > 1) {
            console.log('\nSelect the Guild Name from the following options:');
            console.log("\n" + options.join('\n') + "\n");

            this.DataManager.GUILD_NAME = readlineSync.question('Enter the Guild Name: ').replace(/\s/g, '');
        } else {
            this.DataManager.GUILD_NAME = options[0];
        }

        this.DataManager.SaveData();
    }
}

export default DiscordBot;